import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import type { BookmarkRepositoryPort } from "../../application/bookmarks/bookmark-use-cases";
import { executeBookmarkCliCommand } from "./bookmark-cli-controller";

/**
 * Work folderのentryです。
 */
const workFolderEntry = {
  childrenCount: 2,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/**
 * Admin folderのentryです。
 */
const adminFolderEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "11",
  kind: "folder",
  parentId: "10",
  title: "Admin",
} satisfies BookmarkEntry;

/**
 * Stripe DashboardのBookmark Entryです。
 */
const stripeDashboardEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/**
 * Controller testで使うBookmark Treeです。
 */
const bookmarkTree = {
  bookmarks: [stripeDashboardEntry],
  entries: [workFolderEntry, adminFolderEntry, stripeDashboardEntry],
  folders: [workFolderEntry, adminFolderEntry],
} satisfies BookmarkTree;

/**
 * Root current directoryです。
 */
const rootCurrentDirectory = "/";

/**
 * 空の直前結果一覧です。
 */
const emptyLastResultEntries = [] as const satisfies readonly BookmarkEntry[];

/**
 * Tree commandの入力です。
 */
const showDirectoryTreeInput = "tree Work --depth 2";

/**
 * Tree result itemのdepth期待値です。
 */
const expectedTreeResultDepth = 1;

/**
 * Bookmark Tree fixtureを返します。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixtureです。
 */
const getBookmarkTreeFixture = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/**
 * Bookmark Treeを返すrepository fixtureを作ります。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得portです。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  getBookmarkTree: getBookmarkTreeFixture,
});

/**
 * 何もしないBookmark URL openerです。
 * @returns {Promise<void>} 実行完了を表すPromiseです。
 */
const openBookmarkUrl = async (): Promise<void> => {
  await Promise.resolve();
};

/**
 * Bookmark tree CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand tree commands", (): void => {
  /**
   * Tree commandでdepth付きresult item一覧を返すことを検証します。
   */
  it("returns tree result items for tree command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(showDirectoryTreeInput, {
      currentDirectory: rootCurrentDirectory,
      lastResultEntries: emptyLastResultEntries,
      opener: { openBookmarkUrl },
      repository: createBookmarkRepository(),
    });

    expect(state.statusText).toBe("2 entries");
    expect(state.resultItems).toStrictEqual([
      {
        depth: expectedTreeResultDepth,
        folderPath: "/Work/Admin",
        kind: "folder",
        title: "Admin",
      },
      {
        depth: expectedTreeResultDepth,
        folderPath: "/Work",
        kind: "bookmark",
        title: "Stripe Dashboard",
        url: "https://dashboard.stripe.com/",
      },
    ]);
  });
});
