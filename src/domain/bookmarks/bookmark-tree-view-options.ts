import type { BookmarkTree } from "./bookmark-tree";
import type { FolderPath } from "./folder-path";

/**
 * Bookmark Tree表示optionです。
 */
export interface BookmarkTreeViewOptions {
  /**
   * Directoryだけを表示するかです。
   */
  readonly directoriesOnly: boolean;
}

/**
 * Bookmark Tree表示入力です。
 */
export interface ListBookmarkTreeViewEntriesInput {
  /**
   * 対象のBookmark Treeです。
   */
  readonly bookmarkTree: BookmarkTree;
  /**
   * 起点directory pathです。
   */
  readonly directoryPath: FolderPath;
  /**
   * 表示する最大depthです。
   */
  readonly maxDepth: number;
  /**
   * Tree表示optionです。
   */
  readonly options: BookmarkTreeViewOptions;
}
