/* oxlint-disable max-lines -- Browserごとのroot container正規化とBookmark Tree変換を同じdomain fileに保つため。 */

import { type FolderPath, joinFolderPath, rootFolderPath } from "./folder-path";

/**
 * Chrome Bookmark Tree由来のnode種別です。
 */
export type BookmarkEntryKind = "bookmark" | "folder";

/**
 * Browserが管理するtop-level bookmark folderの種別です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks#type-FolderType
 */
export type BookmarkFolderType = "bookmarks-bar" | "managed" | "mobile" | "other";

/**
 * Chrome Bookmarks APIから受け取るnodeのうち、Domain層が必要とする最小shapeです。
 */
export interface RawBookmarkTreeNode {
  /**
   * Chrome Bookmark Manager上のnode IDです。
   */
  readonly id: string;
  /**
   * 親node IDです。
   */
  readonly parentId?: string;
  /**
   * 表示名です。
   */
  readonly title: string;
  /**
   * Bookmark URLです。
   */
  readonly url?: string;
  /**
   * 子node一覧です。
   */
  readonly children?: readonly RawBookmarkTreeNode[];
  /**
   * Browserが付与するtop-level folder種別です。
   * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks#type-FolderType
   */
  readonly folderType?: BookmarkFolderType;
}

/**
 * URLを持つBookmark nodeです。
 */
type RawBookmarkNode = RawBookmarkTreeNode & {
  readonly url: string;
};

/**
 * Nodeをentry一覧へ正規化する関数です。
 */
type NodeNormalizer = (node: RawBookmarkTreeNode, path: string) => readonly BookmarkEntry[];

/**
 * 疑似CLIで扱うBookmarkまたはfolderの正規化済みentryです。
 */
export interface BookmarkEntry {
  /**
   * Chrome Bookmark Manager上のnode IDです。
   */
  readonly id: string;
  /**
   * 親node IDです。
   */
  readonly parentId: string;
  /**
   * 表示名です。
   */
  readonly title: string;
  /**
   * Bookmarkまたはfolderを表す種別です。
   */
  readonly kind: BookmarkEntryKind;
  /**
   * Bookmark URLです。
   */
  readonly url?: string;
  /**
   * 疑似CLIで表示するfolder pathです。
   */
  readonly folderPath: FolderPath;
  /**
   * 直下の子node数です。
   */
  readonly childrenCount: number;
}

/**
 * 正規化済みBookmark Treeです。
 */
export interface BookmarkTree {
  /**
   * 疑似CLI rootへ新規作成または移動するときに使うbrowser root直下container IDです。
   */
  readonly rootBookmarkParentId?: string;
  /**
   * Bookmarkとfolderを巡回順に並べた一覧です。
   */
  readonly entries: readonly BookmarkEntry[];
  /**
   * Folderだけを巡回順に並べた一覧です。
   */
  readonly folders: readonly BookmarkEntry[];
  /**
   * Bookmarkだけを巡回順に並べた一覧です。
   */
  readonly bookmarks: readonly BookmarkEntry[];
}

/**
 * 親IDがないnodeへ付与するfallback parent IDです。
 */
const missingParentId = "";

/**
 * Children未定義時に使う空配列です。
 */
const emptyChildren = [] as const satisfies readonly RawBookmarkTreeNode[];

/**
 * 先頭要素のindexです。
 */
const firstElementIndex = 0;

/**
 * Browserのbookmark bar folder typeです。
 */
const bookmarksBarFolderType = "bookmarks-bar" satisfies BookmarkFolderType;

/**
 * NodeがBookmarkかを判定します。
 * @param {RawBookmarkTreeNode} node 判定対象のnodeです。
 * @returns {boolean} Bookmark URLを持つ場合はtrueです。
 */
const isBookmarkNode = (node: RawBookmarkTreeNode): node is RawBookmarkNode =>
  typeof node.url === "string";

/**
 * Nodeのchildrenを取得します。
 * @param {RawBookmarkTreeNode} node childrenを取得するnodeです。
 * @returns {readonly RawBookmarkTreeNode[]} children一覧です。
 */
const getChildren = (node: RawBookmarkTreeNode): readonly RawBookmarkTreeNode[] =>
  node.children ?? emptyChildren;

/**
 * Nodeの親IDを取得します。
 * @param {RawBookmarkTreeNode} node 親IDを取得するnodeです。
 * @returns {string} 親IDです。
 */
const getParentId = (node: RawBookmarkTreeNode): string => node.parentId ?? missingParentId;

/**
 * Nodeがbrowser root nodeかを判定します。
 * @param {RawBookmarkTreeNode} node 判定対象nodeです。
 * @returns {boolean} Browser root nodeならtrueです。
 */
const isBrowserRootNode = (node: RawBookmarkTreeNode): boolean => typeof node.parentId !== "string";

/**
 * Nodeがbrowser root直下のcontainerかを判定します。
 * @param {RawBookmarkTreeNode} node 判定対象nodeです。
 * @param {readonly string[]} rootNodeIds Browser root node ID一覧です。
 * @returns {boolean} Browser root直下のcontainerならtrueです。
 */
const isBrowserRootChildContainer = (
  node: RawBookmarkTreeNode,
  rootNodeIds: readonly string[],
): boolean => typeof node.parentId === "string" && rootNodeIds.includes(node.parentId);

/**
 * NodeがCLI rootとして扱うbrowser root直下containerかを判定します。
 * @param {RawBookmarkTreeNode} node 判定対象nodeです。
 * @param {string | undefined} rootBookmarkParentId CLI rootとして扱うcontainer IDです。
 * @returns {boolean} CLI rootとして扱うcontainerならtrueです。
 */
const isCliRootContainer = (
  node: RawBookmarkTreeNode,
  rootBookmarkParentId: string | undefined,
): boolean => typeof rootBookmarkParentId === "string" && node.id === rootBookmarkParentId;

/**
 * NodeがBookmarks Bar containerかを判定します。
 * @param {RawBookmarkTreeNode} node 判定対象nodeです。
 * @returns {boolean} Bookmarks Bar containerならtrueです。
 */
const isBookmarksBarContainer = (node: RawBookmarkTreeNode): boolean =>
  node.folderType === bookmarksBarFolderType;

/**
 * Folder entryを作ります。
 * @param {RawBookmarkTreeNode} node folder nodeです。
 * @param {FolderPath} folderPath folder自身のpathです。
 * @returns {BookmarkEntry} 正規化済みfolder entryです。
 */
const createFolderEntry = (node: RawBookmarkTreeNode, folderPath: FolderPath): BookmarkEntry => ({
  childrenCount: getChildren(node).length,
  folderPath,
  id: node.id,
  kind: "folder",
  parentId: getParentId(node),
  title: node.title,
});

/**
 * Bookmark entryを作ります。
 * @param {RawBookmarkTreeNode} node Bookmark nodeです。
 * @param {FolderPath} folderPath Bookmarkが所属するfolder pathです。
 * @returns {BookmarkEntry} 正規化済みBookmark entryです。
 */
const createBookmarkEntry = (node: RawBookmarkNode, folderPath: FolderPath): BookmarkEntry => ({
  childrenCount: 0,
  folderPath,
  id: node.id,
  kind: "bookmark",
  parentId: getParentId(node),
  title: node.title,
  url: node.url,
});

/**
 * 子node一覧を正規化します。
 * @param {readonly RawBookmarkTreeNode[]} nodes 正規化する子node一覧です。
 * @param {FolderPath} folderPath 子nodeが属するfolder pathです。
 * @param {NodeNormalizer} normalizer node正規化関数です。
 * @returns {readonly BookmarkEntry[]} 正規化済みentry一覧です。
 */
const normalizeChildren = (
  nodes: readonly RawBookmarkTreeNode[],
  folderPath: FolderPath,
  normalizer: NodeNormalizer,
): readonly BookmarkEntry[] => nodes.flatMap((node) => normalizer(node, folderPath));

/**
 * Folder nodeを正規化します。
 * @param {RawBookmarkTreeNode} node 正規化するfolder nodeです。
 * @param {FolderPath} folderPath 親folder pathです。
 * @param {NodeNormalizer} normalizer node正規化関数です。
 * @returns {readonly BookmarkEntry[]} folderと子entryの一覧です。
 */
const normalizeFolderNode = (
  node: RawBookmarkTreeNode,
  folderPath: FolderPath,
  normalizer: NodeNormalizer,
): readonly BookmarkEntry[] => {
  const nextFolderPath = joinFolderPath(folderPath, node.title);
  const folderEntry = createFolderEntry(node, nextFolderPath);
  const childEntries = normalizeChildren(getChildren(node), nextFolderPath, normalizer);

  return [folderEntry, ...childEntries];
};

/**
 * Node正規化関数を作成します。
 * @param {readonly string[]} rootNodeIds Browser root node ID一覧です。
 * @param {string | undefined} rootBookmarkParentId CLI rootとして扱うcontainer IDです。
 * @returns {NodeNormalizer} Node正規化関数です。
 */
const createNodeNormalizer = (
  rootNodeIds: readonly string[],
  rootBookmarkParentId: string | undefined,
): NodeNormalizer => {
  /**
   * 単一nodeを正規化します。
   * @param {RawBookmarkTreeNode} node 正規化するnodeです。
   * @param {FolderPath} folderPath 現在のfolder pathです。
   * @returns {readonly BookmarkEntry[]} 正規化済みentry一覧です。
   */
  const normalizeNode = (
    node: RawBookmarkTreeNode,
    folderPath: FolderPath,
  ): readonly BookmarkEntry[] => {
    if (isBrowserRootNode(node) || isCliRootContainer(node, rootBookmarkParentId)) {
      return normalizeChildren(getChildren(node), rootFolderPath, normalizeNode);
    }

    if (isBrowserRootChildContainer(node, rootNodeIds)) {
      return normalizeFolderNode(node, rootFolderPath, normalizeNode);
    }

    if (isBookmarkNode(node)) {
      return [createBookmarkEntry(node, folderPath)];
    }

    return normalizeFolderNode(node, folderPath, normalizeNode);
  };

  return normalizeNode;
};

/**
 * Browser root node ID一覧を作成します。
 * @param {readonly RawBookmarkTreeNode[]} nodes 正規化するroot node一覧です。
 * @returns {readonly string[]} Browser root node ID一覧です。
 */
const createRootNodeIds = (nodes: readonly RawBookmarkTreeNode[]): readonly string[] =>
  nodes.filter((node) => isBrowserRootNode(node)).map((node) => node.id);

/**
 * Browser root直下のcontainer一覧を取得します。
 * @param {readonly RawBookmarkTreeNode[]} nodes 正規化するroot node一覧です。
 * @returns {readonly RawBookmarkTreeNode[]} Browser root直下のcontainer一覧です。
 */
const listBrowserRootChildContainers = (
  nodes: readonly RawBookmarkTreeNode[],
): readonly RawBookmarkTreeNode[] =>
  nodes.flatMap((node) => {
    if (isBrowserRootNode(node)) {
      return getChildren(node);
    }

    return emptyChildren;
  });

/**
 * 疑似CLI rootとして扱うbrowser root直下containerを取得します。
 * @param {readonly RawBookmarkTreeNode[]} nodes 正規化するroot node一覧です。
 * @returns {RawBookmarkTreeNode | undefined} CLI rootとして扱うcontainerです。
 */
const findRootBookmarkParentContainer = (
  nodes: readonly RawBookmarkTreeNode[],
): RawBookmarkTreeNode | undefined => {
  const containers = listBrowserRootChildContainers(nodes);

  return (
    containers.find((container) => isBookmarksBarContainer(container)) ??
    containers[firstElementIndex]
  );
};

/**
 * 疑似CLI rootへBookmarkを保存するときのparent IDを解決します。
 * @param {readonly RawBookmarkTreeNode[]} nodes 正規化するroot node一覧です。
 * @returns {string | undefined} root保存時に使うparent IDです。
 */
const resolveRootBookmarkParentId = (nodes: readonly RawBookmarkTreeNode[]): string | undefined =>
  findRootBookmarkParentContainer(nodes)?.id;

/**
 * Root node一覧を正規化します。
 * @param {readonly RawBookmarkTreeNode[]} nodes 正規化するroot node一覧です。
 * @param {string | undefined} rootBookmarkParentId CLI rootとして扱うcontainer IDです。
 * @returns {readonly BookmarkEntry[]} 正規化済みentry一覧です。
 */
const normalizeRootNodes = (
  nodes: readonly RawBookmarkTreeNode[],
  rootBookmarkParentId: string | undefined,
): readonly BookmarkEntry[] => {
  const normalizeNode = createNodeNormalizer(createRootNodeIds(nodes), rootBookmarkParentId);

  return nodes.flatMap((node) => normalizeNode(node, rootFolderPath));
};

/**
 * 指定kindのentryだけを抽出します。
 * @param {readonly BookmarkEntry[]} entries 抽出対象のentry一覧です。
 * @param {BookmarkEntryKind} kind 抽出するentry kindです。
 * @returns {readonly BookmarkEntry[]} 指定kindだけのentry一覧です。
 */
const filterEntriesByKind = (
  entries: readonly BookmarkEntry[],
  kind: BookmarkEntryKind,
): readonly BookmarkEntry[] => entries.filter((entry) => entry.kind === kind);

/**
 * Chrome Bookmark Treeを疑似CLI向けの平坦なBookmark Treeへ正規化します。
 * @param {readonly RawBookmarkTreeNode[]} nodes Chrome Bookmarks API由来のroot node一覧です。
 * @returns {BookmarkTree} 正規化済みBookmark Treeです。
 * @example
 * ```ts
 * const result = normalizeBookmarkTree(chromeBookmarkTreeNodes);
 * ```
 */
export const normalizeBookmarkTree = (nodes: readonly RawBookmarkTreeNode[]): BookmarkTree => {
  const rootBookmarkParentId = resolveRootBookmarkParentId(nodes);
  const entries = normalizeRootNodes(nodes, rootBookmarkParentId);
  const bookmarkTree = {
    bookmarks: filterEntriesByKind(entries, "bookmark"),
    entries,
    folders: filterEntriesByKind(entries, "folder"),
  } satisfies BookmarkTree;

  if (typeof rootBookmarkParentId !== "string") {
    return bookmarkTree;
  }

  return {
    ...bookmarkTree,
    rootBookmarkParentId,
  };
};
