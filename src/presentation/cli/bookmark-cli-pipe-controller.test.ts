import {
  type BookmarkCliCommandDependencies,
  executeBookmarkCliCommand,
} from "./bookmark-cli-controller";
import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import type {
  BookmarkOpenerPort,
  BookmarkRepositoryPort,
} from "../../application/bookmarks/bookmark-use-cases";
import { describe, expect, it } from "vitest";
import type { BookmarkCreatorPort } from "../../application/bookmarks/mark-bookmark-use-case";
import { createInitialExtensionState } from "../../domain/storage/extension-state";

/** Work folderのentryです。 */
const workFolderEntry = {
  childrenCount: 2,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Admin folderのentryです。 */
const adminFolderEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "11",
  kind: "folder",
  parentId: "10",
  title: "Admin",
} satisfies BookmarkEntry;

/** Stripe DashboardのBookmark Entryです。 */
const stripeDashboardEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Controller testで使うBookmark Treeです。 */
const bookmarkTree = {
  bookmarks: [stripeDashboardEntry],
  entries: [workFolderEntry, adminFolderEntry, stripeDashboardEntry],
  folders: [workFolderEntry, adminFolderEntry],
} satisfies BookmarkTree;

/** Root current directoryです。 */
const rootCurrentDirectory = "/";

/** Grep pipe付きLs commandの入力です。 */
const listDirectoryGrepInput = "ls Work | grep stripe";

/** 空の直前結果一覧です。 */
const emptyLastResultEntries = [] as const satisfies readonly BookmarkEntry[];

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

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
 * URLを開かないopener fixtureを作ります。
 * @returns {BookmarkOpenerPort} Bookmark URL opener fixtureです。
 */
const createBookmarkOpener = (): BookmarkOpenerPort => ({
  /**
   * Bookmark URLを開かずに完了します。
   * @returns {Promise<void>} 完了を表すPromiseです。
   */
  openBookmarkUrl: async (): Promise<void> => {
    await Promise.resolve();
  },
});

/** Bookmark作成port fixtureです。 */
const bookmarkCreator = {
  /**
   * Bookmark作成結果を返します。
   * @returns {Promise<BookmarkEntry>} 作成済みBookmark fixtureです。
   */
  createBookmark: async (): Promise<BookmarkEntry> => {
    await Promise.resolve();

    return stripeDashboardEntry;
  },
} satisfies BookmarkCreatorPort;

/**
 * Bookmark CLI command dependencies fixtureを作ります。
 * @returns {BookmarkCliCommandDependencies} Command実行依存です。
 */
const createCommandDependencies = (): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: initialExtensionState,
  lastResultEntries: emptyLastResultEntries,
  opener: createBookmarkOpener(),
  repository: createBookmarkRepository(),
});

/**
 * Bookmark pipe CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand pipe commands", (): void => {
  /**
   * Ls commandの結果をgrepで絞り込めることを検証します。
   */
  it("filters ls result entries by grep pipe", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(
      listDirectoryGrepInput,
      createCommandDependencies(),
    );

    expect(state.statusText).toBe("1 matches");
    expect(state.lastResultEntries).toStrictEqual([stripeDashboardEntry]);
    expect(state.resultItems.map((item) => item.title)).toStrictEqual(["Stripe Dashboard"]);
  });
});
