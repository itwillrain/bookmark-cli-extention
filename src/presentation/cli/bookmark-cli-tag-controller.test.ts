import {
  type BookmarkCliCommandDependencies,
  type BookmarkCliCommandState,
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

/** Stripe bookmark entry fixture。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "42",
  kind: "bookmark",
  parentId: "11",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Bookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry],
  entries: [stripeBookmarkEntry],
  folders: [],
} satisfies BookmarkTree;

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

/** 初期状態fixture。 */
const initialCommandState = {
  currentDirectory: "/",
  extensionState: initialExtensionState,
  lastResultEntries: [stripeBookmarkEntry],
  resultItems: [],
  statusText: "Ready",
} satisfies BookmarkCliCommandState;

/**
 * Bookmark Tree fixtureを返す。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
 */
const getBookmarkTree = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/** Bookmark repository fixture。 */
const bookmarkRepository = { getBookmarkTree } satisfies BookmarkRepositoryPort;

/** Bookmark opener fixture。 */
const bookmarkOpener = {
  /**
   * URLを開いたことにする。
   * @returns {Promise<void>} 完了Promise。
   */
  openBookmarkUrl: async (): Promise<void> => {
    await Promise.resolve();
  },
} satisfies BookmarkOpenerPort;

/** Bookmark creator fixture。 */
const bookmarkCreator = {
  /**
   * Bookmarkを作成したことにする。
   * @returns {Promise<BookmarkEntry>} 作成済みBookmark。
   */
  createBookmark: async (): Promise<BookmarkEntry> => {
    await Promise.resolve();

    return stripeBookmarkEntry;
  },
} satisfies BookmarkCreatorPort;

/**
 * Controller dependency fixtureを作成。
 * @param {BookmarkCliCommandState} state 現在のcommand state。
 * @returns {BookmarkCliCommandDependencies} Controller dependency fixture。
 */
const createDependencies = (state: BookmarkCliCommandState): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: state.currentDirectory,
  extensionState: state.extensionState,
  lastResultEntries: state.lastResultEntries,
  opener: bookmarkOpener,
  repository: bookmarkRepository,
});

/** Tag command controllerのテストスイート。 */
describe("executeBookmarkCliCommand tag", (): void => {
  /**
   * Tag commandで拡張状態の仮想タグを更新できることを検証。
   */
  it("updates virtual tags in command state", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(
      "tag 1 prod finance",
      createDependencies(initialCommandState),
    );

    expect(state.extensionState.virtualTagsByBookmarkId).toStrictEqual({
      "42": ["prod", "finance"],
    });
    expect(state.statusText).toBe("Tagged Stripe Dashboard: prod finance");
  });
});
