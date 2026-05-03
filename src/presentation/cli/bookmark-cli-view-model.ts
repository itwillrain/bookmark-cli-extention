import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { BookmarkOrganizationPreview } from "../../domain/bookmarks/bookmark-organization-preview";
import type { BookmarkSearchResult } from "../../domain/search/bookmark-search";
import type { BookmarkTreeViewEntry } from "../../domain/bookmarks/bookmark-tree-view";

/**
 * URLを持つBookmark entryです。
 */
type BookmarkEntryWithUrl = BookmarkEntry & {
  /**
   * Bookmark URLです。
   */
  readonly url: string;
};

/**
 * Bookmark entryをCLI表示itemへ変換します。
 * @param {BookmarkEntry} entry Bookmark entryです。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItemFromEntry = (entry: BookmarkEntry): BookmarkCliResultItem => ({
  folderPath: entry.folderPath,
  kind: entry.kind,
  title: entry.title,
});

/**
 * URL付きBookmark entryをCLI表示itemへ変換します。
 * @param {BookmarkEntryWithUrl} entry Bookmark entryです。
 * @returns {BookmarkCliResultItem} URL付きCLI表示itemです。
 */
const createBookmarkCliResultItemWithUrl = (
  entry: BookmarkEntryWithUrl,
): BookmarkCliResultItem => ({
  ...createBookmarkCliResultItemFromEntry(entry),
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
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItemFromBookmarkEntry = (
  entry: BookmarkEntry,
): BookmarkCliResultItem => {
  if (hasBookmarkEntryUrl(entry)) {
    return createBookmarkCliResultItemWithUrl(entry);
  }

  return createBookmarkCliResultItemFromEntry(entry);
};

/**
 * Bookmark検索結果をCLI表示itemへ変換します。
 * @param {BookmarkSearchResult} result Bookmark検索結果です。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItem = (result: BookmarkSearchResult): BookmarkCliResultItem => ({
  ...createBookmarkCliResultItemFromBookmarkEntry(result.entry),
  score: result.score,
});

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
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧です。
 */
export const createBookmarkCliResultItems = (
  results: readonly BookmarkSearchResult[],
): readonly BookmarkCliResultItem[] => results.map((result) => createBookmarkCliResultItem(result));

/**
 * Bookmark entry一覧をCLI表示item一覧へ変換します。
 * @param {readonly BookmarkEntry[]} entries Bookmark entry一覧です。
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧です。
 */
export const createBookmarkCliResultItemsFromEntries = (
  entries: readonly BookmarkEntry[],
): readonly BookmarkCliResultItem[] =>
  entries.map((entry) => createBookmarkCliResultItemFromBookmarkEntry(entry));

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
