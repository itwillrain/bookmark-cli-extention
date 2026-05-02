import type { BookmarkEntry, BookmarkTree } from "./bookmark-tree";
import type { FolderPath } from "./folder-path";
import { listDirectoryEntries } from "./bookmark-directory";

/**
 * Tree表示の初期depthです。
 */
export const defaultBookmarkTreeDepth = 2;

/**
 * Tree表示の最小depthです。
 */
const minimumBookmarkTreeDepth = 1;

/**
 * Root直下entryの表示depthです。
 */
const rootChildTreeDepth = 1;

/**
 * 子階層へ進む時に加算するdepthです。
 */
const childTreeDepthIncrement = 1;

/**
 * Tree表示対象外の空entry一覧です。
 */
const emptyTreeViewEntries = [] as const satisfies readonly BookmarkTreeViewEntry[];

/**
 * Bookmark Treeをtree表示するためのflat entryです。
 */
export interface BookmarkTreeViewEntry {
  /**
   * 表示上の階層です。
   */
  readonly depth: number;
  /**
   * 表示するBookmark entryです。
   */
  readonly entry: BookmarkEntry;
}

/**
 * Tree view巡回に必要なcontextです。
 */
interface BookmarkTreeViewTraversalContext {
  /**
   * 対象のBookmark Treeです。
   */
  readonly bookmarkTree: BookmarkTree;
  /**
   * 表示する最大depthです。
   */
  readonly maxDepth: number;
}

/**
 * Entryがfolderかを判定します。
 * @param {BookmarkEntry} entry 判定対象のentryです。
 * @returns {boolean} folderならtrueです。
 */
const isFolderEntry = (entry: BookmarkEntry): boolean => entry.kind === "folder";

/**
 * Tree view entryを作ります。
 * @param {BookmarkEntry} entry 表示するBookmark entryです。
 * @param {number} depth 表示上の階層です。
 * @returns {BookmarkTreeViewEntry} Tree view entryです。
 */
const createTreeViewEntry = (entry: BookmarkEntry, depth: number): BookmarkTreeViewEntry => ({
  depth,
  entry,
});

/**
 * 子entryのdepthを計算します。
 * @param {number} depth 現在entryのdepthです。
 * @returns {number} 子entryのdepthです。
 */
const incrementTreeDepth = (depth: number): number => depth + childTreeDepthIncrement;

/**
 * Directory配下のtree view entryを取得します。
 * @param {BookmarkTreeViewTraversalContext} context Tree view巡回contextです。
 * @param {FolderPath} directoryPath 起点directory pathです。
 * @param {number} depth 表示開始depthです。
 * @returns {readonly BookmarkTreeViewEntry[]} Directory配下entryのflat listです。
 */
const listDirectoryTreeViewEntries = (
  context: BookmarkTreeViewTraversalContext,
  directoryPath: FolderPath,
  depth: number,
): readonly BookmarkTreeViewEntry[] => {
  if (depth > context.maxDepth) {
    return emptyTreeViewEntries;
  }

  return listDirectoryEntries(context.bookmarkTree, directoryPath).flatMap((entry) => {
    const currentEntry = createTreeViewEntry(entry, depth);

    if (!isFolderEntry(entry)) {
      return [currentEntry];
    }

    return [
      currentEntry,
      ...listDirectoryTreeViewEntries(context, entry.folderPath, incrementTreeDepth(depth)),
    ];
  });
};

/**
 * 指定directory配下のBookmark Treeをtree表示用flat listにします。
 * @param {BookmarkTree} bookmarkTree 対象のBookmark Treeです。
 * @param {FolderPath} directoryPath 起点directory pathです。
 * @param {number} maxDepth 表示する最大depthです。
 * @returns {readonly BookmarkTreeViewEntry[]} Tree表示用flat listです。
 */
export const listBookmarkTreeViewEntries = (
  bookmarkTree: BookmarkTree,
  directoryPath: FolderPath,
  maxDepth: number,
): readonly BookmarkTreeViewEntry[] => {
  if (maxDepth < minimumBookmarkTreeDepth) {
    return emptyTreeViewEntries;
  }

  return listDirectoryTreeViewEntries(
    { bookmarkTree, maxDepth },
    directoryPath,
    rootChildTreeDepth,
  );
};
