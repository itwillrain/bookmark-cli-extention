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

/** Stripe DashboardのBookmark Entry。 */
const stripeDashboardEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** GitHub Pull RequestsのBookmark Entry。 */
const githubPullRequestsEntry = {
  childrenCount: 0,
  folderPath: "/Work/Dev",
  id: "43",
  kind: "bookmark",
  parentId: "11",
  title: "GitHub Pull Requests",
  url: "https://github.com/pulls",
} satisfies BookmarkEntry;

/** Controller testで使うBookmark Tree。 */
const bookmarkTree = {
  bookmarks: [stripeDashboardEntry, githubPullRequestsEntry],
  entries: [stripeDashboardEntry, githubPullRequestsEntry],
  folders: [],
} satisfies BookmarkTree;

/** Root current directory。 */
const rootCurrentDirectory = "/";

/** 実行日時fixture。 */
const executedAt = "2026-05-03T00:00:00.000Z";

/** 古い実行日時fixture。 */
const previousExecutedAt = "2026-05-02T00:00:00.000Z";

/** Go command入力。 */
const goInput = "go stripe";

/** Recent command入力。 */
const recentInput = "recent";

/** Freq command入力。 */
const frequentInput = "freq --limit 1";

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

/** 利用統計付き拡張状態fixture。 */
const extensionStateWithUsage = {
  ...initialExtensionState,
  usageByBookmarkId: {
    "42": { lastOpenedAt: previousExecutedAt, openCount: 5 },
    "43": { lastOpenedAt: executedAt, openCount: 1 },
  },
};

/** Bookmark作成port fixture。 */
const bookmarkCreator = {
  /**
   * Bookmark作成結果を返す。
   * @returns {Promise<BookmarkEntry>} 作成済みBookmark fixture。
   */
  createBookmark: async (): Promise<BookmarkEntry> => {
    await Promise.resolve();

    return stripeDashboardEntry;
  },
} satisfies BookmarkCreatorPort;

/**
 * Bookmark Treeを返すrepository fixtureを作成。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得port fixture。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  /**
   * Bookmark Tree fixtureを返す。
   * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
   */
  getBookmarkTree: async (): Promise<BookmarkTree> => {
    await Promise.resolve();

    return bookmarkTree;
  },
});

/**
 * Bookmark opener fixtureを作成。
 * @returns {BookmarkOpenerPort} Bookmark opener fixture。
 */
const createBookmarkOpener = (): BookmarkOpenerPort => ({
  /**
   * URL openを成功させる。
   * @returns {Promise<void>} 完了Promise。
   */
  openBookmarkUrl: async (): Promise<void> => {
    await Promise.resolve();
  },
});

/**
 * Bookmark CLI command dependencies fixtureを作成。
 * @returns {BookmarkCliCommandDependencies} Command実行依存。
 */
const createCommandDependencies = (): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: extensionStateWithUsage,
  lastResultEntries: [],
  /**
   * 実行日時fixtureを返す。
   * @returns {string} 実行日時fixture。
   */
  now: (): string => executedAt,
  opener: createBookmarkOpener(),
  repository: createBookmarkRepository(),
});

/**
 * Bookmark CLI go利用統計更新のテストスイート。
 */
describe("executeBookmarkCliCommand go usage", (): void => {
  /**
   * Go commandで開いたBookmarkの利用統計を更新することを検証。
   */
  it("records opened bookmark usage", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(goInput, createCommandDependencies());

    expect(state.extensionState.usageByBookmarkId["42"]).toStrictEqual({
      lastOpenedAt: executedAt,
      openCount: 6,
    });
  });
});

/**
 * Bookmark CLI usage commandのテストスイート。
 */
describe("executeBookmarkCliCommand usage commands", (): void => {
  /**
   * Recent commandで最近開いたBookmarkを表示できることを検証。
   */
  it("returns recent bookmark items", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(recentInput, createCommandDependencies());

    expect(state.statusText).toBe("2 recent");
    expect(state.resultItems.map((item) => item.title)).toStrictEqual([
      "GitHub Pull Requests",
      "Stripe Dashboard",
    ]);
  });

  /**
   * Freq commandでよく開くBookmarkをlimit件数で表示できることを検証。
   */
  it("returns frequent bookmark items with limit", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(frequentInput, createCommandDependencies());

    expect(state.statusText).toBe("1 frequent");
    expect(state.resultItems.map((item) => item.title)).toStrictEqual(["Stripe Dashboard"]);
  });
});
