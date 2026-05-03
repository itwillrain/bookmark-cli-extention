/* oxlint-disable max-lines -- Fuse検索とChrome履歴mergeのscore計算を同じ検索domainに集約するため。 */

import Fuse, { type IFuseOptions } from "fuse.js";
import type { BookmarkEntry } from "../bookmarks/bookmark-tree";
import type { BrowserHistoryEntry } from "../history/browser-history";
import type { FolderPath } from "../bookmarks/folder-path";

/**
 * URLを持つBookmark Entryです。
 */
export type SearchableBookmarkEntry = BookmarkEntry & {
  /**
   * Bookmark種別です。
   */
  readonly kind: "bookmark";
  /**
   * Bookmark URLです。
   */
  readonly url: string;
};

/**
 * Bookmark検索結果として開けるentryです。
 */
export type SearchableEntry = BrowserHistoryEntry | SearchableBookmarkEntry;

/**
 * Fuse.jsが返すBookmark検索結果です。
 */
interface BookmarkFuseResult {
  /**
   * 検索に一致したdocumentです。
   */
  readonly item: BookmarkSearchDocument;
  /**
   * Fuse.jsの一致scoreです。
   */
  readonly score?: number;
  /**
   * Fuse.jsのmatch情報です。
   */
  readonly matches?: readonly BookmarkSearchMatch[];
}

/**
 * Fuse.jsへ渡すBookmark検索documentです。
 */
export interface BookmarkSearchDocument {
  /**
   * Chrome Bookmark Manager上のnode IDです。
   */
  readonly id: string;
  /**
   * Bookmark titleです。
   */
  readonly title: string;
  /**
   * Bookmarkが所属するfolder pathです。
   */
  readonly folderPath: FolderPath;
  /**
   * Bookmark URLです。
   */
  readonly url: string;
  /**
   * 元のBookmark Entryです。
   */
  readonly entry: SearchableBookmarkEntry;
}

/**
 * Bookmark検索で一致した文字位置の範囲です。
 */
export type BookmarkSearchMatchRange = readonly [number, number];

/**
 * Bookmark検索で一致したfield情報です。
 */
export interface BookmarkSearchMatch {
  /**
   * 一致範囲の一覧です。
   */
  readonly indices: readonly BookmarkSearchMatchRange[];
  /**
   * 一致した検索keyです。
   */
  readonly key?: string;
  /**
   * 配列要素の参照indexです。
   */
  readonly refIndex?: number;
  /**
   * 一致した値です。
   */
  readonly value?: string;
}

/**
 * Bookmark検索結果です。
 */
export interface BookmarkSearchResult {
  /**
   * 検索に一致したEntryです。
   */
  readonly entry: SearchableEntry;
  /**
   * CLI表示用の一致scoreです。
   */
  readonly score: number;
  /**
   * Fuse.jsが返したmatch情報です。
   */
  readonly matches: readonly BookmarkSearchMatch[];
}

/**
 * Title検索keyです。
 */
const titleSearchKey = "title";

/**
 * Folder path検索keyです。
 */
const folderPathSearchKey = "folderPath";

/**
 * URL検索keyです。
 */
const urlSearchKey = "url";

/**
 * Title検索weightです。
 */
const titleSearchWeight = 0.55;

/**
 * Folder path検索weightです。
 */
const folderPathSearchWeight = 0.3;

/**
 * URL検索weightです。
 */
const urlSearchWeight = 0.15;

/**
 * Chrome履歴の訪問回数score上限です。
 */
const maximumHistoryVisitCountForScore = 20;

/**
 * Chrome履歴由来resultの最小scoreです。
 */
const minimumHistoryResultScore = 0.45;

/**
 * Chrome履歴由来resultの最大scoreです。
 */
const maximumHistoryResultScore = 0.95;

/**
 * Chrome履歴の訪問回数score weightです。
 */
const historyVisitCountScoreWeight = 0.35;

/**
 * Chrome履歴の最終訪問日時score weightです。
 */
const historyLastVisitTimeScoreWeight = 0.1;

/**
 * Bookmark resultへ加算するChrome履歴boost上限です。
 */
const maximumBookmarkHistoryBoost = 0.2;

/**
 * 並び替えで同順位を表す値です。
 */
const sameSortOrder = 0;

/**
 * Fuse.jsが扱う最良scoreです。
 */
const bestFuseScore = 0;

/**
 * Fuse.jsが扱う最悪scoreです。
 */
const worstFuseScore = 1;

/**
 * Fuse.jsのmatch情報がない場合に使う空配列です。
 */
const emptyMatches = [] as const satisfies readonly BookmarkSearchMatch[];

/**
 * Bookmark検索に使うFuse.js optionです。
 * @see https://www.fusejs.io/api/options.html
 */
export const bookmarkSearchFuseOptions = {
  ignoreLocation: true,
  includeMatches: true,
  includeScore: true,
  keys: [
    { name: titleSearchKey, weight: titleSearchWeight },
    { name: folderPathSearchKey, weight: folderPathSearchWeight },
    { name: urlSearchKey, weight: urlSearchWeight },
  ],
  minMatchCharLength: 2,
  threshold: 0.4,
} satisfies IFuseOptions<BookmarkSearchDocument>;

/**
 * Bookmark検索対象にできるentryかを判定します。
 * @param {BookmarkEntry} entry 判定対象のentryです。
 * @returns {boolean} URLを持つBookmarkならtrueです。
 */
const isSearchableBookmarkEntry = (entry: BookmarkEntry): entry is SearchableBookmarkEntry =>
  entry.kind === "bookmark" && typeof entry.url === "string";

/**
 * Bookmark EntryをFuse.js検索documentへ変換します。
 * @param {SearchableBookmarkEntry} entry 変換するBookmark Entryです。
 * @returns {BookmarkSearchDocument} Fuse.jsへ渡す検索documentです。
 */
const createBookmarkSearchDocument = (entry: SearchableBookmarkEntry): BookmarkSearchDocument => ({
  entry,
  folderPath: entry.folderPath,
  id: entry.id,
  title: entry.title,
  url: entry.url,
});

/**
 * Bookmark Entry一覧からFuse.js検索document一覧を作ります。
 * @param {readonly BookmarkEntry[]} entries 変換するBookmark Entry一覧です。
 * @returns {readonly BookmarkSearchDocument[]} Fuse.jsへ渡す検索document一覧です。
 */
export const createBookmarkSearchDocuments = (
  entries: readonly BookmarkEntry[],
): readonly BookmarkSearchDocument[] =>
  entries
    .filter((entry): entry is SearchableBookmarkEntry => isSearchableBookmarkEntry(entry))
    .map((entry) => createBookmarkSearchDocument(entry));

/**
 * Fuse.js scoreをCLI表示用scoreへ変換します。
 * @param {number} fuseScore Fuse.jsが返したscoreです。
 * @returns {number} 1に近いほど一致度が高いCLI用scoreです。
 */
export const convertFuseScoreToCommandScore = (fuseScore: number): number =>
  worstFuseScore - fuseScore;

/**
 * Bookmark Entry一覧を完全一致相当の検索結果へ変換します。
 * @param {readonly BookmarkEntry[]} entries 検索結果として扱うBookmark Entry一覧です。
 * @returns {readonly BookmarkSearchResult[]} 検索結果一覧です。
 */
export const createBookmarkSearchResultsFromEntries = (
  entries: readonly BookmarkEntry[],
): readonly BookmarkSearchResult[] =>
  createBookmarkSearchDocuments(entries).map((document) => ({
    entry: document.entry,
    matches: emptyMatches,
    score: convertFuseScoreToCommandScore(bestFuseScore),
  }));

/**
 * Fuse.js scoreがない場合のscoreを補います。
 * @param {number | undefined} fuseScore Fuse.jsが返したscoreです。
 * @returns {number} 正規化対象のFuse.js scoreです。
 */
const normalizeFuseScore = (fuseScore: number | undefined): number => fuseScore ?? bestFuseScore;

/**
 * 数値を範囲内へ丸めます。
 * @param {number} value 丸める値です。
 * @param {number} minimum 最小値です。
 * @param {number} maximum 最大値です。
 * @returns {number} 丸めた値です。
 */
const clampNumber = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

/**
 * Chrome履歴の訪問回数をscoreへ変換します。
 * @param {number} visitCount 訪問回数です。
 * @returns {number} 0から1の訪問回数scoreです。
 */
const createHistoryVisitCountScore = (visitCount: number): number =>
  clampNumber(visitCount, bestFuseScore, maximumHistoryVisitCountForScore) /
  maximumHistoryVisitCountForScore;

/**
 * Chrome履歴の最終訪問日時をscoreへ変換します。
 * @param {number} lastVisitTime 最終訪問日時です。
 * @returns {number} 最終訪問日時scoreです。
 */
const createHistoryLastVisitTimeScore = (lastVisitTime: number): number => {
  if (lastVisitTime > bestFuseScore) {
    return worstFuseScore;
  }

  return bestFuseScore;
};

/**
 * Chrome履歴entryのscoreを作ります。
 * @param {BrowserHistoryEntry} entry Chrome履歴entryです。
 * @returns {number} Chrome履歴result scoreです。
 */
const createHistoryResultScore = (entry: BrowserHistoryEntry): number =>
  clampNumber(
    minimumHistoryResultScore +
      createHistoryVisitCountScore(entry.visitCount) * historyVisitCountScoreWeight +
      createHistoryLastVisitTimeScore(entry.lastVisitTime) * historyLastVisitTimeScoreWeight,
    bestFuseScore,
    maximumHistoryResultScore,
  );

/**
 * Chrome履歴entryからBookmark resultへのscore boostを作ります。
 * @param {BrowserHistoryEntry} entry Chrome履歴entryです。
 * @returns {number} Bookmark resultへ加算するscoreです。
 */
const createBookmarkHistoryBoost = (entry: BrowserHistoryEntry): number =>
  createHistoryVisitCountScore(entry.visitCount) * maximumBookmarkHistoryBoost;

/**
 * URLをkeyとして扱うために正規化します。
 * @param {string} url URLです。
 * @returns {string} 正規化済みURLです。
 */
const normalizeUrlKey = (url: string): string => url;

/**
 * Chrome履歴entryをURLごとのmapへ変換します。
 * @param {readonly BrowserHistoryEntry[]} historyEntries Chrome履歴entry一覧です。
 * @returns {ReadonlyMap<string, BrowserHistoryEntry>} URLごとのChrome履歴entry mapです。
 */
const createHistoryEntryByUrl = (
  historyEntries: readonly BrowserHistoryEntry[],
): ReadonlyMap<string, BrowserHistoryEntry> =>
  new Map(historyEntries.map((entry) => [normalizeUrlKey(entry.url), entry]));

/**
 * Bookmark検索結果をChrome履歴でscore補強します。
 * @param {BookmarkSearchResult} result Bookmark検索結果です。
 * @param {ReadonlyMap<string, BrowserHistoryEntry>} historyEntryByUrl URLごとのChrome履歴entry mapです。
 * @returns {BookmarkSearchResult} 補強後の検索結果です。
 */
const boostBookmarkSearchResult = (
  result: BookmarkSearchResult,
  historyEntryByUrl: Readonly<ReadonlyMap<string, BrowserHistoryEntry>>,
): BookmarkSearchResult => {
  const historyEntry = historyEntryByUrl.get(normalizeUrlKey(result.entry.url));

  if (typeof historyEntry !== "object") {
    return result;
  }

  return {
    ...result,
    score: clampNumber(
      result.score + createBookmarkHistoryBoost(historyEntry),
      bestFuseScore,
      worstFuseScore,
    ),
  };
};

/**
 * Chrome履歴entryを検索結果へ変換します。
 * @param {BrowserHistoryEntry} entry Chrome履歴entryです。
 * @returns {BookmarkSearchResult} Chrome履歴検索結果です。
 */
const createHistorySearchResult = (entry: BrowserHistoryEntry): BookmarkSearchResult => ({
  entry,
  matches: emptyMatches,
  score: createHistoryResultScore(entry),
});

/**
 * 検索結果のscoreとtitleを比較します。
 * @param {BookmarkSearchResult} left 左辺です。
 * @param {BookmarkSearchResult} right 右辺です。
 * @returns {number} sort比較値です。
 */
const compareSearchResults = (left: BookmarkSearchResult, right: BookmarkSearchResult): number => {
  const scoreOrder = right.score - left.score;

  if (scoreOrder !== sameSortOrder) {
    return scoreOrder;
  }

  return left.entry.title.localeCompare(right.entry.title);
};

/**
 * Bookmark Entry一覧をFuse.jsで検索します。
 * @param {readonly BookmarkEntry[]} entries 検索対象のBookmark Entry一覧です。
 * @param {string} query 検索queryです。
 * @returns {readonly BookmarkSearchResult[]} 検索結果一覧です。
 */
export const searchBookmarks = (
  entries: readonly BookmarkEntry[],
  query: string,
): readonly BookmarkSearchResult[] => {
  const documents = createBookmarkSearchDocuments(entries);
  const fuse = new Fuse(documents, bookmarkSearchFuseOptions);
  const fuseResults: readonly Readonly<BookmarkFuseResult>[] = fuse.search(query);
  const bookmarkSearchResults: BookmarkSearchResult[] = [];

  for (const result of fuseResults) {
    bookmarkSearchResults.push({
      entry: result.item.entry,
      matches: result.matches ?? emptyMatches,
      score: convertFuseScoreToCommandScore(normalizeFuseScore(result.score)),
    });
  }

  return bookmarkSearchResults;
};

/**
 * Bookmark検索結果とChrome履歴候補をmergeします。
 * @param {object} input merge入力です。
 * @param {readonly BookmarkSearchResult[]} input.bookmarkResults Bookmark検索結果一覧です。
 * @param {readonly BrowserHistoryEntry[]} input.historyEntries Chrome履歴entry一覧です。
 * @returns {readonly BookmarkSearchResult[]} merge済み検索結果一覧です。
 */
export const mergeBookmarkSearchResultsWithHistory = (input: {
  readonly bookmarkResults: readonly BookmarkSearchResult[];
  readonly historyEntries: readonly BrowserHistoryEntry[];
}): readonly BookmarkSearchResult[] => {
  const bookmarkedUrlKeys = new Set(
    input.bookmarkResults.map((result) => normalizeUrlKey(result.entry.url)),
  );
  const historyEntryByUrl = createHistoryEntryByUrl(input.historyEntries);
  const boostedBookmarkResults = input.bookmarkResults.map((result) =>
    boostBookmarkSearchResult(result, historyEntryByUrl),
  );
  const historyResults = input.historyEntries
    .filter((entry) => !bookmarkedUrlKeys.has(normalizeUrlKey(entry.url)))
    .map((entry) => createHistorySearchResult(entry));

  return [...boostedBookmarkResults, ...historyResults].toSorted(compareSearchResults);
};
