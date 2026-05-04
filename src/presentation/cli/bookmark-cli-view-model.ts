import {
  type BookmarkCliResultDetailOptions,
  createEntryDetailTokens,
} from "./bookmark-cli-result-details";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import type { BookmarkSearchResult } from "../../domain/search/bookmark-search";
import type { BookmarkTreeViewEntry } from "../../domain/bookmarks/bookmark-tree-view";

export { createBookmarkCliCompletionInput } from "./bookmark-cli-completion-input";

/** Bookmark検索結果変換option。 */
export type CreateBookmarkCliResultItemsOptions = BookmarkCliResultDetailOptions;

/** Bookmark entry変換option。 */
export type CreateBookmarkCliResultItemsFromEntriesOptions = BookmarkCliResultDetailOptions;

/**
 * URLを持つBookmark entryです。
 */
type BookmarkEntryWithUrl = BookmarkCliEntry & {
  /**
   * Bookmark URLです。
   */
  readonly url: string;
};

/** Bookmark entry変換optionの初期値です。 */
const defaultEntryResultItemsOptions = {
  long: false,
} as const satisfies CreateBookmarkCliResultItemsFromEntriesOptions;

/**
 * Long表示optionに応じて詳細tokenを付与します。
 * @param {BookmarkCliResultItem} item CLI表示itemです。
 * @param {BookmarkCliEntry} entry Bookmark entryです。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {BookmarkCliResultItem} 詳細token反映後のCLI表示itemです。
 */
const applyEntryDetails = (
  item: BookmarkCliResultItem,
  entry: BookmarkCliEntry,
  options: CreateBookmarkCliResultItemsFromEntriesOptions,
): BookmarkCliResultItem => {
  if (!options.long) {
    return item;
  }

  return {
    ...item,
    details: createEntryDetailTokens(entry, options),
  };
};

/**
 * Bookmark entryをCLI表示itemへ変換します。
 * @param {BookmarkCliEntry} entry Bookmark CLI entryです。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItemFromEntry = (
  entry: BookmarkCliEntry,
  options: CreateBookmarkCliResultItemsFromEntriesOptions,
): BookmarkCliResultItem =>
  applyEntryDetails(
    {
      folderPath: entry.folderPath,
      kind: entry.kind,
      title: entry.title,
    },
    entry,
    options,
  );

/**
 * URL付きBookmark entryをCLI表示itemへ変換します。
 * @param {BookmarkEntryWithUrl} entry Bookmark entryです。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {BookmarkCliResultItem} URL付きCLI表示itemです。
 */
const createBookmarkCliResultItemWithUrl = (
  entry: BookmarkEntryWithUrl,
  options: CreateBookmarkCliResultItemsFromEntriesOptions,
): BookmarkCliResultItem => ({
  ...createBookmarkCliResultItemFromEntry(entry, options),
  url: entry.url,
});

/**
 * Bookmark entryがURLを持つかを判定します。
 * @param {BookmarkCliEntry} entry Bookmark CLI entryです。
 * @returns {boolean} URLを持つBookmark entryならtrueです。
 */
const hasBookmarkEntryUrl = (entry: BookmarkCliEntry): entry is BookmarkEntryWithUrl =>
  typeof entry.url === "string";

/**
 * Bookmark entryをURL有無に応じてCLI表示itemへ変換します。
 * @param {BookmarkCliEntry} entry Bookmark CLI entryです。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItemFromBookmarkEntry = (
  entry: BookmarkCliEntry,
  options: CreateBookmarkCliResultItemsFromEntriesOptions = defaultEntryResultItemsOptions,
): BookmarkCliResultItem => {
  if (hasBookmarkEntryUrl(entry)) {
    return createBookmarkCliResultItemWithUrl(entry, options);
  }

  return createBookmarkCliResultItemFromEntry(entry, options);
};

/**
 * Bookmark検索結果をCLI表示itemへ変換します。
 * @param {BookmarkSearchResult} result Bookmark検索結果です。
 * @param {CreateBookmarkCliResultItemsOptions} options Bookmark検索結果変換optionです。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItem = (
  result: BookmarkSearchResult,
  options: CreateBookmarkCliResultItemsOptions,
): BookmarkCliResultItem => {
  const item = createBookmarkCliResultItemFromBookmarkEntry(result.entry, options);

  if (!options.long) {
    return item;
  }

  return {
    ...item,
    score: result.score,
  };
};

/**
 * Bookmark tree view entryをCLI表示itemへ変換します。
 * @param {BookmarkTreeViewEntry} treeEntry Bookmark tree view entryです。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliTreeResultItem = (
  treeEntry: BookmarkTreeViewEntry,
): BookmarkCliResultItem => ({
  ...createBookmarkCliResultItemFromBookmarkEntry(treeEntry.entry),
  depth: treeEntry.depth,
  treePrefix: treeEntry.guide,
});

/**
 * Bookmark検索結果一覧をCLI表示item一覧へ変換します。
 * @param {readonly BookmarkSearchResult[]} results Bookmark検索結果一覧です。
 * @param {CreateBookmarkCliResultItemsOptions} options Bookmark検索結果変換optionです。
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧です。
 */
export const createBookmarkCliResultItems = (
  results: readonly BookmarkSearchResult[],
  options: CreateBookmarkCliResultItemsOptions,
): readonly BookmarkCliResultItem[] =>
  results.map((result) => createBookmarkCliResultItem(result, options));

/**
 * Bookmark CLI entry一覧をCLI表示item一覧へ変換します。
 * @param {readonly BookmarkCliEntry[]} entries Bookmark CLI entry一覧です。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧です。
 */
export const createBookmarkCliResultItemsFromEntries = (
  entries: readonly BookmarkCliEntry[],
  options: CreateBookmarkCliResultItemsFromEntriesOptions = defaultEntryResultItemsOptions,
): readonly BookmarkCliResultItem[] =>
  entries.map((entry) => createBookmarkCliResultItemFromBookmarkEntry(entry, options));

/**
 * Bookmark tree view entry一覧をCLI表示item一覧へ変換します。
 * @param {readonly BookmarkTreeViewEntry[]} treeEntries Bookmark tree view entry一覧です。
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧です。
 */
export const createBookmarkCliResultItemsFromTreeEntries = (
  treeEntries: readonly BookmarkTreeViewEntry[],
): readonly BookmarkCliResultItem[] =>
  treeEntries.map((treeEntry) => createBookmarkCliTreeResultItem(treeEntry));
