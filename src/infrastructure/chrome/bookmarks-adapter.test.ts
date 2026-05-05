import {
  type ChromeBookmarkCreateProperties,
  type ChromeBookmarksApi,
  type ChromeTabCreateProperties,
  type ChromeTabsApi,
  createChromeBookmarkCreator,
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
        folderType: "bookmarks-bar",
        id: "1",
        parentId: "0",
        title: "Bookmarks Bar",
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
 * Chrome Bookmarks APIの記録fixtureです。
 */
interface RecordingBookmarksApi {
  /**
   * 作成されたbookmarkの入力一覧です。
   */
  readonly createdBookmarks: readonly ChromeBookmarkCreateProperties[];
  /**
   * Chrome Bookmarks API fixtureです。
   */
  readonly bookmarksApi: ChromeBookmarksApi;
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
 * 作成済みBookmark node fixtureを返します。
 * @returns {Promise<RawBookmarkTreeNode>} 作成済みBookmark node fixtureです。
 */
const createBookmarkFixture = async (): Promise<RawBookmarkTreeNode> => {
  await Promise.resolve();

  return {
    id: "100",
    parentId: "10",
    title: "Created",
    url: targetUrl,
  };
};

/**
 * Chrome Bookmark作成結果nodeを作ります。
 * @param {ChromeBookmarkCreateProperties} createProperties Bookmark作成入力です。
 * @returns {RawBookmarkTreeNode} 作成結果nodeです。
 */
const createCreatedBookmarkNode = (
  createProperties: ChromeBookmarkCreateProperties,
): RawBookmarkTreeNode => {
  const nodeBase = {
    id: "100",
    title: createProperties.title,
  };
  const node = nodeBase satisfies RawBookmarkTreeNode;

  if (typeof createProperties.url !== "string") {
    return node;
  }

  return {
    ...node,
    url: createProperties.url,
  };
};

/**
 * Chrome Bookmark nodeへparent IDを追加します。
 * @param {RawBookmarkTreeNode} node Chrome Bookmark nodeです。
 * @param {ChromeBookmarkCreateProperties} createProperties Bookmark作成入力です。
 * @returns {RawBookmarkTreeNode} parent ID付きBookmark nodeです。
 */
const addParentIdToNode = (
  node: RawBookmarkTreeNode,
  createProperties: ChromeBookmarkCreateProperties,
): RawBookmarkTreeNode => {
  if (typeof createProperties.parentId !== "string") {
    return node;
  }

  return {
    ...node,
    parentId: createProperties.parentId,
  };
};

/**
 * Chrome Bookmarks API fixtureを作ります。
 * @returns {ChromeBookmarksApi} Chrome Bookmarks API fixtureです。
 */
const createBookmarksApi = (): ChromeBookmarksApi => ({
  create: createBookmarkFixture,
  getTree: getTreeFixture,
});

/**
 * Bookmark作成入力を記録するChrome Bookmarks API fixtureを作ります。
 * @returns {RecordingBookmarksApi} Chrome Bookmarks API fixtureです。
 */
const createRecordingBookmarksApi = (): RecordingBookmarksApi => {
  const createdBookmarks: ChromeBookmarkCreateProperties[] = [];

  /**
   * Bookmark作成入力を記録します。
   * @param {ChromeBookmarkCreateProperties} createProperties Bookmark作成入力です。
   * @returns {Promise<RawBookmarkTreeNode>} 作成済みBookmark nodeです。
   */
  const create = async (
    createProperties: ChromeBookmarkCreateProperties,
  ): Promise<RawBookmarkTreeNode> => {
    createdBookmarks.push(createProperties);
    await Promise.resolve();

    return addParentIdToNode(createCreatedBookmarkNode(createProperties), createProperties);
  };

  return {
    bookmarksApi: {
      create,
      getTree: getTreeFixture,
    },
    createdBookmarks,
  };
};

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
 * Chrome Bookmark creator adapterのテストスイートです。
 */
describe("createChromeBookmarkCreator", (): void => {
  /**
   * Chrome Bookmarks APIでBookmarkを作成できることを検証します。
   */
  it("creates bookmark through Chrome Bookmarks API", async (): Promise<void> => {
    const recordingBookmarksApi = createRecordingBookmarksApi();
    const creator = createChromeBookmarkCreator(recordingBookmarksApi.bookmarksApi);

    const entry = await creator.createBookmark({
      parentId: "10",
      title: "Stripe Dashboard",
      url: targetUrl,
    });

    expect(recordingBookmarksApi.createdBookmarks).toStrictEqual([
      {
        parentId: "10",
        title: "Stripe Dashboard",
        url: targetUrl,
      },
    ]);
    expect(entry).toMatchObject({
      id: "100",
      parentId: "10",
      title: "Stripe Dashboard",
      url: targetUrl,
    });
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
