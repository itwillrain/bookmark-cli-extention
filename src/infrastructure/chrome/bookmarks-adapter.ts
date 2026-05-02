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
   * Chrome Bookmark Treeを取得します。
   */
  readonly getTree: () => Promise<readonly RawBookmarkTreeNode[]>;
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
