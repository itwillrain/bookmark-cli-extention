/**
 * Chrome Bookmark Tree由来のnode種別です。
 */
export type BookmarkEntryKind = "bookmark" | "folder";

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
  readonly folderPath: string;
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
 * Chrome Bookmark Treeのroot node IDです。
 */
const chromeRootNodeId = "0";

/**
 * 疑似CLIのroot folder pathです。
 */
const rootFolderPath = "/";

/**
 * 親IDがないnodeへ付与するfallback parent IDです。
 */
const missingParentId = "";

/**
 * Children未定義時に使う空配列です。
 */
const emptyChildren = [] as const satisfies readonly RawBookmarkTreeNode[];

/**
 * NodeがBookmarkかを判定します。
 * @param {RawBookmarkTreeNode} node 判定対象のnodeです。
 * @returns {boolean} Bookmark URLを持つ場合はtrueです。
 */
const isBookmarkNode = (node: RawBookmarkTreeNode): node is RawBookmarkNode =>
  typeof node.url === "string";

/**
 * NodeがChromeのroot containerかを判定します。
 * @param {RawBookmarkTreeNode} node 判定対象のnodeです。
 * @returns {boolean} CLI上のfolderとして表示しないroot containerならtrueです。
 */
const isChromeRootContainer = (node: RawBookmarkTreeNode): boolean =>
  !("parentId" in node) || node.parentId === chromeRootNodeId;

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
 * Folder pathへtitleを追加します。
 * @param {string} parentFolderPath 親folder pathです。
 * @param {string} title 追加するfolder titleです。
 * @returns {string} 追加後のfolder pathです。
 */
const appendFolderPath = (parentFolderPath: string, title: string): string => {
  if (parentFolderPath === rootFolderPath) {
    return `${rootFolderPath}${title}`;
  }

  return `${parentFolderPath}/${title}`;
};

/**
 * Folder entryを作ります。
 * @param {RawBookmarkTreeNode} node folder nodeです。
 * @param {string} folderPath folder自身のpathです。
 * @returns {BookmarkEntry} 正規化済みfolder entryです。
 */
const createFolderEntry = (node: RawBookmarkTreeNode, folderPath: string): BookmarkEntry => ({
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
 * @param {string} folderPath Bookmarkが所属するfolder pathです。
 * @returns {BookmarkEntry} 正規化済みBookmark entryです。
 */
const createBookmarkEntry = (node: RawBookmarkNode, folderPath: string): BookmarkEntry => ({
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
 * @param {string} folderPath 子nodeが属するfolder pathです。
 * @param {NodeNormalizer} normalizer node正規化関数です。
 * @returns {readonly BookmarkEntry[]} 正規化済みentry一覧です。
 */
const normalizeChildren = (
  nodes: readonly RawBookmarkTreeNode[],
  folderPath: string,
  normalizer: NodeNormalizer,
): readonly BookmarkEntry[] => nodes.flatMap((node) => normalizer(node, folderPath));

/**
 * Folder nodeを正規化します。
 * @param {RawBookmarkTreeNode} node 正規化するfolder nodeです。
 * @param {string} folderPath 親folder pathです。
 * @param {NodeNormalizer} normalizer node正規化関数です。
 * @returns {readonly BookmarkEntry[]} folderと子entryの一覧です。
 */
const normalizeFolderNode = (
  node: RawBookmarkTreeNode,
  folderPath: string,
  normalizer: NodeNormalizer,
): readonly BookmarkEntry[] => {
  const nextFolderPath = appendFolderPath(folderPath, node.title);
  const folderEntry = createFolderEntry(node, nextFolderPath);
  const childEntries = normalizeChildren(getChildren(node), nextFolderPath, normalizer);

  return [folderEntry, ...childEntries];
};

/**
 * 単一nodeを正規化します。
 * @param {RawBookmarkTreeNode} node 正規化するnodeです。
 * @param {string} folderPath 現在のfolder pathです。
 * @returns {readonly BookmarkEntry[]} 正規化済みentry一覧です。
 */
const normalizeNode = (node: RawBookmarkTreeNode, folderPath: string): readonly BookmarkEntry[] => {
  if (isChromeRootContainer(node)) {
    return normalizeChildren(getChildren(node), rootFolderPath, normalizeNode);
  }

  if (isBookmarkNode(node)) {
    return [createBookmarkEntry(node, folderPath)];
  }

  return normalizeFolderNode(node, folderPath, normalizeNode);
};

/**
 * Root node一覧を正規化します。
 * @param {readonly RawBookmarkTreeNode[]} nodes 正規化するroot node一覧です。
 * @returns {readonly BookmarkEntry[]} 正規化済みentry一覧です。
 */
const normalizeRootNodes = (nodes: readonly RawBookmarkTreeNode[]): readonly BookmarkEntry[] =>
  nodes.flatMap((node) => normalizeNode(node, rootFolderPath));

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
 */
export const normalizeBookmarkTree = (nodes: readonly RawBookmarkTreeNode[]): BookmarkTree => {
  const entries = normalizeRootNodes(nodes);

  return {
    bookmarks: filterEntriesByKind(entries, "bookmark"),
    entries,
    folders: filterEntriesByKind(entries, "folder"),
  };
};
