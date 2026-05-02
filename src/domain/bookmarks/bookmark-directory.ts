import type { BookmarkEntry, BookmarkTree } from "./bookmark-tree";
import type { FolderPath } from "./folder-path";
import { getParentFolderPath } from "./current-directory";

/**
 * Entry sort時にfolderをbookmarkより前へ置く値です。
 */
const folderSortPriority = 0;

/**
 * Entry sort時にbookmarkをfolderより後ろへ置く値です。
 */
const bookmarkSortPriority = 1;

/**
 * 同順を表すsort値です。
 */
const sameSortOrder = 0;

/**
 * 先に並べることを表すsort値です。
 */
const beforeSortOrder = -1;

/**
 * 後に並べることを表すsort値です。
 */
const afterSortOrder = 1;

/**
 * Bookmark Entryのsort優先度を取得します。
 * @param {BookmarkEntry} entry sort対象のentryです。
 * @returns {number} sort優先度です。
 */
const getEntrySortPriority = (entry: BookmarkEntry): number => {
  if (entry.kind === "folder") {
    return folderSortPriority;
  }

  return bookmarkSortPriority;
};

/**
 * Entryのtitleを比較します。
 * @param {BookmarkEntry} leftEntry 左辺のentryです。
 * @param {BookmarkEntry} rightEntry 右辺のentryです。
 * @returns {number} sort用比較結果です。
 */
const compareEntryTitle = (leftEntry: BookmarkEntry, rightEntry: BookmarkEntry): number =>
  leftEntry.title.localeCompare(rightEntry.title);

/**
 * Entry kindをfolder-firstで比較します。
 * @param {BookmarkEntry} leftEntry 左辺のentryです。
 * @param {BookmarkEntry} rightEntry 右辺のentryです。
 * @returns {number} sort用比較結果です。
 */
const compareEntryKind = (leftEntry: BookmarkEntry, rightEntry: BookmarkEntry): number => {
  const leftPriority = getEntrySortPriority(leftEntry);
  const rightPriority = getEntrySortPriority(rightEntry);

  if (leftPriority < rightPriority) {
    return beforeSortOrder;
  }

  if (leftPriority > rightPriority) {
    return afterSortOrder;
  }

  return sameSortOrder;
};

/**
 * Directory表示用にentryを比較します。
 * @param {BookmarkEntry} leftEntry 左辺のentryです。
 * @param {BookmarkEntry} rightEntry 右辺のentryです。
 * @returns {number} sort用比較結果です。
 */
const compareDirectoryEntry = (leftEntry: BookmarkEntry, rightEntry: BookmarkEntry): number => {
  const kindOrder = compareEntryKind(leftEntry, rightEntry);

  if (kindOrder !== sameSortOrder) {
    return kindOrder;
  }

  return compareEntryTitle(leftEntry, rightEntry);
};

/**
 * Entryが指定directory直下のfolderかを判定します。
 * @param {BookmarkEntry} entry 判定対象のentryです。
 * @param {FolderPath} directoryPath directory pathです。
 * @returns {boolean} 直下folderならtrueです。
 */
const isDirectFolderEntry = (entry: BookmarkEntry, directoryPath: FolderPath): boolean =>
  entry.kind === "folder" && getParentFolderPath(entry.folderPath) === directoryPath;

/**
 * Entryが指定directory直下のbookmarkかを判定します。
 * @param {BookmarkEntry} entry 判定対象のentryです。
 * @param {FolderPath} directoryPath directory pathです。
 * @returns {boolean} 直下bookmarkならtrueです。
 */
const isDirectBookmarkEntry = (entry: BookmarkEntry, directoryPath: FolderPath): boolean =>
  entry.kind === "bookmark" && entry.folderPath === directoryPath;

/**
 * Entryが指定directory直下のentryかを判定します。
 * @param {BookmarkEntry} entry 判定対象のentryです。
 * @param {FolderPath} directoryPath directory pathです。
 * @returns {boolean} 直下entryならtrueです。
 */
const isDirectDirectoryEntry = (entry: BookmarkEntry, directoryPath: FolderPath): boolean =>
  isDirectFolderEntry(entry, directoryPath) || isDirectBookmarkEntry(entry, directoryPath);

/**
 * Bookmark Tree内にfolder pathが存在するかを判定します。
 * @param {BookmarkTree} bookmarkTree 判定対象のBookmark Treeです。
 * @param {FolderPath} folderPath 判定するfolder pathです。
 * @returns {boolean} folder pathが存在すればtrueです。
 */
export const doesFolderPathExist = (
  bookmarkTree: BookmarkTree,
  folderPath: FolderPath,
): boolean => {
  if (folderPath === "/") {
    return true;
  }

  return bookmarkTree.folders.some((folder) => folder.folderPath === folderPath);
};

/**
 * 指定directory直下のentry一覧をfolder-firstで取得します。
 * @param {BookmarkTree} bookmarkTree 対象のBookmark Treeです。
 * @param {FolderPath} directoryPath directory pathです。
 * @returns {readonly BookmarkEntry[]} directory直下のentry一覧です。
 */
export const listDirectoryEntries = (
  bookmarkTree: BookmarkTree,
  directoryPath: FolderPath,
): readonly BookmarkEntry[] =>
  bookmarkTree.entries
    .filter((entry) => isDirectDirectoryEntry(entry, directoryPath))
    .toSorted((leftEntry, rightEntry) => compareDirectoryEntry(leftEntry, rightEntry));
