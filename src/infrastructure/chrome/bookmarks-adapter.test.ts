import {
  type ChromeBookmarksApi,
  type ChromeTabCreateProperties,
  type ChromeTabsApi,
  createChromeBookmarkOpener,
  createChromeBookmarkRepository,
} from "./bookmarks-adapter";
import { describe, expect, it } from "vitest";
import type { RawBookmarkTreeNode } from "../../domain/bookmarks/bookmark-tree";

/**
 * Chrome Bookmarks APIのroot node fixtureです。
 */
const chromeBookmarkTreeNodes = [
  {
    children: [
      {
        children: [
          {
            id: "42",
            parentId: "10",
            title: "Stripe Dashboard",
            url: "https://dashboard.stripe.com/",
          },
        ],
        id: "10",
        parentId: "1",
        title: "Work",
      },
    ],
    id: "0",
    title: "",
  },
] satisfies readonly RawBookmarkTreeNode[];

/**
 * 期待するBookmark件数です。
 */
const expectedBookmarkCount = 1;

/**
 * 先頭Bookmarkのindexです。
 */
const firstBookmarkIndex = 0;

/**
 * 開くURLです。
 */
const targetUrl = "https://dashboard.stripe.com/";

/**
 * Chrome Tabs APIの記録fixtureです。
 */
interface RecordingTabsApi {
  /**
   * 作成されたtabの入力一覧です。
   */
  readonly createdTabs: readonly ChromeTabCreateProperties[];
  /**
   * Chrome Tabs API fixtureです。
   */
  readonly tabsApi: ChromeTabsApi;
}

/**
 * Bookmark tree node fixtureを返します。
 * @returns {Promise<readonly RawBookmarkTreeNode[]>} Bookmark tree node fixtureです。
 */
const getTreeFixture = async (): Promise<readonly RawBookmarkTreeNode[]> => {
  await Promise.resolve();

  return chromeBookmarkTreeNodes;
};

/**
 * Chrome Bookmarks API fixtureを作ります。
 * @returns {ChromeBookmarksApi} Chrome Bookmarks API fixtureです。
 */
const createBookmarksApi = (): ChromeBookmarksApi => ({
  getTree: getTreeFixture,
});

/**
 * Tab作成入力を記録するChrome Tabs API fixtureを作ります。
 * @returns {RecordingTabsApi} Chrome Tabs API fixtureです。
 */
const createRecordingTabsApi = (): RecordingTabsApi => {
  const createdTabs: ChromeTabCreateProperties[] = [];

  /**
   * Tab作成入力を記録します。
   * @param {ChromeTabCreateProperties} createProperties tab作成入力です。
   * @returns {Promise<void>} 記録完了を表すPromiseです。
   */
  const create = async (createProperties: ChromeTabCreateProperties): Promise<void> => {
    createdTabs.push(createProperties);
    await Promise.resolve();
  };

  return {
    createdTabs,
    tabsApi: { create },
  };
};

/**
 * Chrome Bookmark repository adapterのテストスイートです。
 */
describe("createChromeBookmarkRepository", (): void => {
  /**
   * Chrome Bookmarks APIから正規化済みBookmark Treeを取得できることを検証します。
   */
  it("normalizes Chrome bookmark tree nodes", async (): Promise<void> => {
    const repository = createChromeBookmarkRepository(createBookmarksApi());
    const bookmarkTree = await repository.getBookmarkTree();

    expect(bookmarkTree.bookmarks).toHaveLength(expectedBookmarkCount);
    expect(bookmarkTree.bookmarks[firstBookmarkIndex]?.folderPath).toBe("/Work");
    expect(bookmarkTree.bookmarks[firstBookmarkIndex]?.title).toBe("Stripe Dashboard");
  });
});

/**
 * Chrome Bookmark opener adapterのテストスイートです。
 */
describe("createChromeBookmarkOpener", (): void => {
  /**
   * Chrome Tabs APIでURLを開けることを検証します。
   */
  it("opens bookmark URL through Chrome Tabs API", async (): Promise<void> => {
    const recordingTabsApi = createRecordingTabsApi();
    const opener = createChromeBookmarkOpener(recordingTabsApi.tabsApi);

    await opener.openBookmarkUrl(targetUrl);

    expect(recordingTabsApi.createdTabs).toStrictEqual([{ url: targetUrl }]);
  });
});
