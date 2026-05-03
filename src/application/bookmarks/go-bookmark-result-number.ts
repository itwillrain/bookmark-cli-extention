import type {
  BookmarkSearchResult,
  SearchableBookmarkEntry,
} from "../../domain/search/bookmark-search";
import {
  isResultNumberInput,
  resolveEntryByResultNumber,
} from "../../domain/bookmarks/result-selection";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";

/** 直前結果番号指定に使う空のmatch情報です。 */
const emptyBookmarkSearchMatches: BookmarkSearchResult["matches"] = [];

/** 直前結果番号がBookmarkへ解決できない場合の戻り値です。 */
const resultNumberBookmarkMissing = false;

/**
 * 直前結果番号からBookmark検索結果を解決する入力です。
 */
export interface ResolveBookmarkSearchResultByResultNumberInput {
  /**
   * 直前結果一覧です。
   */
  readonly lastResultEntries: readonly BookmarkEntry[];
  /**
   * 検索queryです。
   */
  readonly query: string;
}

/**
 * 直前結果番号からBookmark検索結果を解決した結果です。
 */
export type BookmarkSearchResultByResultNumber =
  | BookmarkSearchResult
  | typeof resultNumberBookmarkMissing;

/**
 * EntryがURLを持つBookmarkかを判定します。
 * @param {BookmarkEntry} entry 判定対象entryです。
 * @returns {boolean} URLを持つBookmarkならtrueです。
 */
const hasBookmarkUrl = (entry: BookmarkEntry): entry is SearchableBookmarkEntry =>
  entry.kind === "bookmark" && typeof entry.url === "string";

/**
 * EntryからBookmark検索結果互換の値を作ります。
 * @param {SearchableBookmarkEntry} entry Bookmark entryです。
 * @returns {BookmarkSearchResult} Bookmark検索結果です。
 */
const createBookmarkSearchResultFromEntry = (
  entry: SearchableBookmarkEntry,
): BookmarkSearchResult => ({
  entry,
  matches: emptyBookmarkSearchMatches,
  score: 0,
});

/**
 * 直前結果番号からBookmark検索結果を解決します。
 * @param {ResolveBookmarkSearchResultByResultNumberInput} input 直前結果番号解決入力です。
 * @returns {BookmarkSearchResultByResultNumber} Bookmark検索結果。解決できない場合はfalseです。
 */
export const resolveBookmarkSearchResultByResultNumber = (
  input: ResolveBookmarkSearchResultByResultNumberInput,
): BookmarkSearchResultByResultNumber => {
  if (!isResultNumberInput(input.query)) {
    return resultNumberBookmarkMissing;
  }

  const entryResolution = resolveEntryByResultNumber(input.lastResultEntries, input.query);

  if (!entryResolution.ok || !hasBookmarkUrl(entryResolution.entry)) {
    return resultNumberBookmarkMissing;
  }

  return createBookmarkSearchResultFromEntry(entryResolution.entry);
};
