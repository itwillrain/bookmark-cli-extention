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

/** Long表示付きLs commandの入力です。 */
const listDirectoryLongInput = "ls -l Work";

/** Root current directoryです。 */
const rootCurrentDirectory = "/";

/** 初期拡張状態fixtureです。 */
const initialExtensionState = createInitialExtensionState();

/** 詳細表示用の拡張状態fixtureです。 */
const extensionStateWithDetails = {
  ...initialExtensionState,
  usageByBookmarkId: {
    "42": {
      lastOpenedAt: "2026-05-03T00:00:00.000Z",
      openCount: 5,
    },
  },
  virtualTagsByBookmarkId: {
    "42": ["finance", "prod"],
  },
};

/**
 * Bookmark Treeを返すrepository fixtureを作ります。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得portです。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  /**
   * Bookmark Tree fixtureを返します。
   * @returns {Promise<BookmarkTree>} Bookmark Tree fixtureです。
   */
  getBookmarkTree: async (): Promise<BookmarkTree> => {
    await Promise.resolve();

    return bookmarkTree;
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

/** Bookmark URL opener fixtureです。 */
const bookmarkOpener = {
  /**
   * URL openを成功させます。
   * @returns {Promise<void>} 完了Promiseです。
   */
  openBookmarkUrl: async (): Promise<void> => {
    await Promise.resolve();
  },
} satisfies BookmarkOpenerPort;

/**
 * Bookmark CLI command dependencies fixtureを作ります。
 * @returns {BookmarkCliCommandDependencies} Command実行依存です。
 */
const createCommandDependencies = (): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: extensionStateWithDetails,
  lastResultEntries: [],
  opener: bookmarkOpener,
  repository: createBookmarkRepository(),
});

/**
 * Bookmark list long表示CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand list long command", (): void => {
  /**
   * Ls long表示で整理判断用の詳細tokenを表示状態へ含めることを検証します。
   */
  it("returns human details for ls long command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(
      listDirectoryLongInput,
      createCommandDependencies(),
    );

    expect(state.resultItems).toStrictEqual([
      {
        details: ["children=0", "id=11", "parent=10"],
        folderPath: "/Work/Admin",
        kind: "folder",
        title: "Admin",
      },
      {
        details: [
          "host=dashboard.stripe.com",
          "#finance",
          "#prod",
          "opened=5",
          "last=2026-05-03",
          "id=42",
          "parent=10",
        ],
        folderPath: "/Work",
        kind: "bookmark",
        title: "Stripe Dashboard",
        url: "https://dashboard.stripe.com/",
      },
    ]);
  });
});
