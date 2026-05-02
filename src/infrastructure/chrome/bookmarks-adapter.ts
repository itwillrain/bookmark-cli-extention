import type {
  BookmarkCreatorPort,
  CreatedBookmarkInput,
} from "../../application/bookmarks/mark-bookmark-use-case";
import type {
  BookmarkOpenerPort,
  BookmarkRepositoryPort,
} from "../../application/bookmarks/bookmark-use-cases";
import {
  type BookmarkTree,
  type RawBookmarkTreeNode,
  normalizeBookmarkTree,
} from "../../domain/bookmarks/bookmark-tree";

/**
 * Chrome Bookmarks APIのうちadapterが使う最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks
 */
export interface ChromeBookmarksApi {
  /**
   * Chrome Bookmarkを作成します。
   */
  readonly create: (
    createProperties: ChromeBookmarkCreateProperties,
  ) => Promise<RawBookmarkTreeNode>;
  /**
   * Chrome Bookmark Treeを取得します。
   */
  readonly getTree: () => Promise<readonly RawBookmarkTreeNode[]>;
}

/**
 * Chrome Bookmarks APIでbookmarkを作成する入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks#method-create
 */
export interface ChromeBookmarkCreateProperties {
  /**
   * 保存先parent folder IDです。
   */
  readonly parentId?: string;
  /**
   * Bookmark titleです。
   */
  readonly title: string;
  /**
   * Bookmark URLです。
   */
  readonly url: string;
}

/**
 * Chrome Tabs APIでtabを作成する入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/tabs#method-create
 */
export interface ChromeTabCreateProperties {
  /**
   * 開くURLです。
   */
  readonly url: string;
}

/**
 * Chrome Tabs APIのうちadapterが使う最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/tabs
 */
export interface ChromeTabsApi {
  /**
   * 新しいtabを作成します。
   */
  readonly create: (createProperties: ChromeTabCreateProperties) => Promise<unknown>;
}

/**
 * Chrome Bookmarks APIをApplication層のrepository portへ変換します。
 * @param {ChromeBookmarksApi} bookmarksApi Chrome Bookmarks APIです。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得portです。
 */
export const createChromeBookmarkRepository = (
  bookmarksApi: ChromeBookmarksApi,
): BookmarkRepositoryPort => {
  /**
   * Chrome Bookmark Treeを正規化して取得します。
   * @returns {Promise<BookmarkTree>} 正規化済みBookmark Treeです。
   */
  const getBookmarkTree = async (): Promise<BookmarkTree> => {
    const nodes = await bookmarksApi.getTree();

    return normalizeBookmarkTree(nodes);
  };

  return { getBookmarkTree };
};

/**
 * Chrome Bookmarks APIをApplication層のcreator portへ変換します。
 * @param {ChromeBookmarksApi} bookmarksApi Chrome Bookmarks APIです。
 * @returns {BookmarkCreatorPort} Bookmark作成portです。
 */
export const createChromeBookmarkCreator = (
  bookmarksApi: ChromeBookmarksApi,
): BookmarkCreatorPort => {
  /**
   * Chrome Bookmarks APIでBookmarkを作成します。
   * @param {CreatedBookmarkInput} input Bookmark作成入力です。
   * @returns {Promise<BookmarkTree["bookmarks"][number]>} 作成済みBookmark entryです。
   */
  const createBookmark = async (
    input: CreatedBookmarkInput,
  ): Promise<BookmarkTree["bookmarks"][number]> => {
    const createdNode = await bookmarksApi.create(input);

    return {
      childrenCount: 0,
      folderPath: "/",
      id: createdNode.id,
      kind: "bookmark",
      parentId: createdNode.parentId ?? "",
      title: createdNode.title,
      url: createdNode.url ?? input.url,
    };
  };

  return { createBookmark };
};

/**
 * Chrome Tabs APIをApplication層のopener portへ変換します。
 * @param {ChromeTabsApi} tabsApi Chrome Tabs APIです。
 * @returns {BookmarkOpenerPort} Bookmark URLを開くportです。
 */
export const createChromeBookmarkOpener = (tabsApi: ChromeTabsApi): BookmarkOpenerPort => {
  /**
   * Chrome Tabs APIでBookmark URLを開きます。
   * @param {string} url 開くURLです。
   * @returns {Promise<void>} Tab作成完了を表すPromiseです。
   */
  const openBookmarkUrl = async (url: string): Promise<void> => {
    await tabsApi.create({ url });
  };

  return { openBookmarkUrl };
};
