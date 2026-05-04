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

/** Long表示付きFind commandの入力です。 */
const longFindInput = "find -l stripe";

/** Root current directoryです。 */
const rootCurrentDirectory = "/";

/** 先頭result item indexです。 */
const firstResultItemIndex = 0;

/** 空の直前結果一覧です。 */
const emptyLastResultEntries = [] as const satisfies readonly BookmarkEntry[];

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
  entries: [stripeDashboardEntry],
  folders: [],
} satisfies BookmarkTree;

/** URL openを記録する配列です。 */
const openedUrls: string[] = [];

/**
 * Bookmark Tree fixtureを返します。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixtureです。
 */
const getBookmarkTreeFixture = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/**
 * 開いたURLを記録します。
 * @param {string} url 開いたURLです。
 * @returns {Promise<void>} 記録完了を表すPromiseです。
 */
const openBookmarkUrl = async (url: string): Promise<void> => {
  await Promise.resolve();
  openedUrls.push(url);
};

/**
 * Bookmark作成結果を返します。
 * @returns {Promise<BookmarkEntry>} 作成済みBookmark fixtureです。
 */
const createBookmark = async (): Promise<BookmarkEntry> => {
  await Promise.resolve();

  return stripeDashboardEntry;
};

/**
 * Bookmark repository fixtureを作ります。
 * @returns {BookmarkRepositoryPort} Bookmark repository fixtureです。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  getBookmarkTree: getBookmarkTreeFixture,
});

/**
 * Bookmark opener fixtureを作ります。
 * @returns {BookmarkOpenerPort} Bookmark opener fixtureです。
 */
const createBookmarkOpener = (): BookmarkOpenerPort => ({
  openBookmarkUrl,
});

/** Bookmark creator fixtureです。 */
const bookmarkCreator = {
  createBookmark,
} satisfies BookmarkCreatorPort;

/**
 * Bookmark CLI command dependencies fixtureを作ります。
 * @returns {BookmarkCliCommandDependencies} Command実行依存です。
 */
const createCommandDependencies = (): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: createInitialExtensionState(),
  lastResultEntries: emptyLastResultEntries,
  opener: createBookmarkOpener(),
  repository: createBookmarkRepository(),
});

/**
 * Bookmark検索系CLI controller long表示のテストスイートです。
 */
describe("executeBookmarkCliCommand search long option", (): void => {
  /**
   * Long表示付きFind commandではscoreを表示状態へ含めることを検証します。
   */
  it("returns score for long find command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(longFindInput, createCommandDependencies());

    expect(typeof state.resultItems[firstResultItemIndex]?.score).toBe("number");
  });
});
