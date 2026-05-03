import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { BookmarkOrganizationPreview } from "../../domain/bookmarks/bookmark-organization-preview";
import type { BookmarkSearchResult } from "../../domain/search/bookmark-search";
import type { BookmarkTreeViewEntry } from "../../domain/bookmarks/bookmark-tree-view";

export { createBookmarkCliCompletionInput } from "./bookmark-cli-completion-input";

/** Bookmark検索結果変換option。 */
export interface CreateBookmarkCliResultItemsOptions {
  /** Debug情報を表示するか。 */
  readonly debug: boolean;
}

/** Bookmark entry変換option。 */
export interface CreateBookmarkCliResultItemsFromEntriesOptions {
  /** 詳細情報を表示するか。 */
  readonly long: boolean;
}

/**
 * URLを持つBookmark entryです。
 */
type BookmarkEntryWithUrl = BookmarkEntry & {
  /**
   * Bookmark URLです。
   */
  readonly url: string;
};

/** Entry詳細tokenのid keyです。 */
const idDetailKey = "id";

/** Entry詳細tokenのparent keyです。 */
const parentDetailKey = "parent";

/** Entry詳細tokenのchildren keyです。 */
const childrenDetailKey = "children";

/** Entry詳細tokenの区切り文字です。 */
const detailTokenSeparator = "=";

/** Bookmark entry変換optionの初期値です。 */
const defaultEntryResultItemsOptions = {
  long: false,
} as const satisfies CreateBookmarkCliResultItemsFromEntriesOptions;

/**
 * Entry詳細tokenを作ります。
 * @param {string} key 詳細keyです。
 * @param {string | number} value 詳細値です。
 * @returns {string} 詳細tokenです。
 */
const createEntryDetailToken = (key: string, value: string | number): string =>
  `${key}${detailTokenSeparator}${String(value)}`;

/**
 * Bookmark entryの詳細token一覧を作ります。
 * @param {BookmarkEntry} entry Bookmark entryです。
 * @returns {readonly string[]} 詳細token一覧です。
 */
const createEntryDetailTokens = (entry: BookmarkEntry): readonly string[] => [
  createEntryDetailToken(idDetailKey, entry.id),
  createEntryDetailToken(parentDetailKey, entry.parentId),
  createEntryDetailToken(childrenDetailKey, entry.childrenCount),
];

/**
 * Long表示optionに応じて詳細tokenを付与します。
 * @param {BookmarkCliResultItem} item CLI表示itemです。
 * @param {BookmarkEntry} entry Bookmark entryです。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {BookmarkCliResultItem} 詳細token反映後のCLI表示itemです。
 */
const applyEntryDetails = (
  item: BookmarkCliResultItem,
  entry: BookmarkEntry,
  options: CreateBookmarkCliResultItemsFromEntriesOptions,
): BookmarkCliResultItem => {
  if (!options.long) {
    return item;
  }

  return {
    ...item,
    details: createEntryDetailTokens(entry),
  };
};

/**
 * Bookmark entryをCLI表示itemへ変換します。
 * @param {BookmarkEntry} entry Bookmark entryです。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItemFromEntry = (
  entry: BookmarkEntry,
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
 * @param {BookmarkEntry} entry Bookmark entryです。
 * @returns {boolean} URLを持つBookmark entryならtrueです。
 */
const hasBookmarkEntryUrl = (entry: BookmarkEntry): entry is BookmarkEntryWithUrl =>
  typeof entry.url === "string";

/**
 * Bookmark entryをURL有無に応じてCLI表示itemへ変換します。
 * @param {BookmarkEntry} entry Bookmark entryです。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItemFromBookmarkEntry = (
  entry: BookmarkEntry,
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
  const item = createBookmarkCliResultItemFromBookmarkEntry(result.entry);

  if (!options.debug) {
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
 * Bookmark entry一覧をCLI表示item一覧へ変換します。
 * @param {readonly BookmarkEntry[]} entries Bookmark entry一覧です。
 * @param {CreateBookmarkCliResultItemsFromEntriesOptions} options Bookmark entry変換optionです。
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧です。
 */
export const createBookmarkCliResultItemsFromEntries = (
  entries: readonly BookmarkEntry[],
  options: CreateBookmarkCliResultItemsFromEntriesOptions = defaultEntryResultItemsOptions,
): readonly BookmarkCliResultItem[] =>
  entries.map((entry) => createBookmarkCliResultItemFromBookmarkEntry(entry, options));

/**
 * Bookmark整理previewをCLI表示itemへ変換します。
 * @param {BookmarkOrganizationPreview} preview Bookmark整理previewです。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
export const createBookmarkCliResultItemFromOrganizationPreview = (
  preview: BookmarkOrganizationPreview,
): BookmarkCliResultItem => ({
  description: preview.description,
  folderPath: preview.before,
  kind: "preview",
  title: preview.title,
});

/**
 * Bookmark tree view entry一覧をCLI表示item一覧へ変換します。
 * @param {readonly BookmarkTreeViewEntry[]} treeEntries Bookmark tree view entry一覧です。
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧です。
 */
export const createBookmarkCliResultItemsFromTreeEntries = (
  treeEntries: readonly BookmarkTreeViewEntry[],
): readonly BookmarkCliResultItem[] =>
  treeEntries.map((treeEntry) => createBookmarkCliTreeResultItem(treeEntry));
