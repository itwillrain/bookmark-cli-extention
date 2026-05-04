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
 * Tree guideのbranch記号です。
 */
const treeBranchGuide = "├── ";

/**
 * Tree guideのlast branch記号です。
 */
const treeLastBranchGuide = "└── ";

/**
 * Tree guideの縦線継続記号です。
 */
const treeAncestorContinuationGuide = "│   ";

/**
 * Tree guideの空白記号です。
 */
const treeAncestorBlankGuide = "    ";

/**
 * Entry indexのoffsetです。
 */
const entryIndexOffset = 1;

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
  /**
   * Tree commandでtitle前に表示するguideです。
   */
  readonly guide: string;
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
 * Directory配下のtree view entry取得入力です。
 */
interface BookmarkTreeViewDirectoryInput {
  /**
   * Ancestorごとの後続entry有無です。
   */
  readonly ancestorHasNextSiblings: readonly boolean[];
  /**
   * Tree view巡回contextです。
   */
  readonly context: BookmarkTreeViewTraversalContext;
  /**
   * 表示開始depthです。
   */
  readonly depth: number;
  /**
   * 起点directory pathです。
   */
  readonly directoryPath: FolderPath;
}

/**
 * Entryがfolderかを判定します。
 * @param {BookmarkEntry} entry 判定対象のentryです。
 * @returns {boolean} folderならtrueです。
 */
const isFolderEntry = (entry: BookmarkEntry): boolean => entry.kind === "folder";

/**
 * Ancestorの継続有無をguide文字列へ変換します。
 * @param {boolean} hasNextSibling 同階層に後続entryがあるancestorならtrueです。
 * @returns {string} Ancestor guide文字列です。
 */
const formatAncestorGuide = (hasNextSibling: boolean): string => {
  if (hasNextSibling) {
    return treeAncestorContinuationGuide;
  }

  return treeAncestorBlankGuide;
};

/**
 * Tree guideを作ります。
 * @param {readonly boolean[]} ancestorHasNextSiblings ancestorごとの後続entry有無です。
 * @param {boolean} isLastSibling 同階層の最後のentryならtrueです。
 * @returns {string} Tree guide文字列です。
 */
const createTreeGuide = (
  ancestorHasNextSiblings: readonly boolean[],
  isLastSibling: boolean,
): string => {
  const ancestorGuide = ancestorHasNextSiblings.map((hasNextSibling) =>
    formatAncestorGuide(hasNextSibling),
  );

  if (isLastSibling) {
    return [...ancestorGuide, treeLastBranchGuide].join("");
  }

  return [...ancestorGuide, treeBranchGuide].join("");
};

/**
 * Tree view entryを作ります。
 * @param {BookmarkEntry} entry 表示するBookmark entryです。
 * @param {number} depth 表示上の階層です。
 * @param {string} guide tree command用のguideです。
 * @returns {BookmarkTreeViewEntry} Tree view entryです。
 */
const createTreeViewEntry = (
  entry: BookmarkEntry,
  depth: number,
  guide: string,
): BookmarkTreeViewEntry => ({
  depth,
  entry,
  guide,
});

/**
 * 子entryのdepthを計算します。
 * @param {number} depth 現在entryのdepthです。
 * @returns {number} 子entryのdepthです。
 */
const incrementTreeDepth = (depth: number): number => depth + childTreeDepthIncrement;

/**
 * Directory配下のtree view entryを取得します。
 * @param {BookmarkTreeViewDirectoryInput} input Directory配下のtree view entry取得入力です。
 * @returns {readonly BookmarkTreeViewEntry[]} Directory配下entryのflat listです。
 */
const listDirectoryTreeViewEntries = (
  input: BookmarkTreeViewDirectoryInput,
): readonly BookmarkTreeViewEntry[] => {
  if (input.depth > input.context.maxDepth) {
    return emptyTreeViewEntries;
  }

  const entries = listDirectoryEntries(input.context.bookmarkTree, input.directoryPath);

  return entries.flatMap((entry, entryIndex) => {
    const isLastSibling = entryIndex + entryIndexOffset === entries.length;
    const currentEntry = createTreeViewEntry(
      entry,
      input.depth,
      createTreeGuide(input.ancestorHasNextSiblings, isLastSibling),
    );

    if (!isFolderEntry(entry)) {
      return [currentEntry];
    }

    return [
      currentEntry,
      ...listDirectoryTreeViewEntries({
        ancestorHasNextSiblings: [...input.ancestorHasNextSiblings, !isLastSibling],
        context: input.context,
        depth: incrementTreeDepth(input.depth),
        directoryPath: entry.folderPath,
      }),
    ];
  });
};

/**
 * 指定directory配下のBookmark Treeをtree表示用flat listにします。
 * @param {BookmarkTree} bookmarkTree 対象のBookmark Treeです。
 * @param {FolderPath} directoryPath 起点directory pathです。
 * @param {number} maxDepth 表示する最大depthです。
 * @returns {readonly BookmarkTreeViewEntry[]} Tree表示用flat listです。
 * @example
 * ```ts
 * const result = listBookmarkTreeViewEntries(bookmarkTree, "/Work", 2);
 * ```
 */
export const listBookmarkTreeViewEntries = (
  bookmarkTree: BookmarkTree,
  directoryPath: FolderPath,
  maxDepth: number,
): readonly BookmarkTreeViewEntry[] => {
  if (maxDepth < minimumBookmarkTreeDepth) {
    return emptyTreeViewEntries;
  }

  return listDirectoryTreeViewEntries({
    ancestorHasNextSiblings: [],
    context: { bookmarkTree, maxDepth },
    depth: rootChildTreeDepth,
    directoryPath,
  });
};
