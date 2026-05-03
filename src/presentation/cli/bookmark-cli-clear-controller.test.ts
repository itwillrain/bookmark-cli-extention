import {
  type BookmarkCliCommandDependencies,
  executeBookmarkCliCommand,
} from "./bookmark-cli-controller";
import type {
  BookmarkOpenerPort,
  BookmarkRepositoryPort,
} from "../../application/bookmarks/bookmark-use-cases";
import { describe, expect, it } from "vitest";
import type { BookmarkCreatorPort } from "../../application/bookmarks/mark-bookmark-use-case";
import type { BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { createInitialExtensionState } from "../../domain/storage/extension-state";
import { currentDirectoryRoot } from "../../domain/bookmarks/current-directory";

/** Clear command入力。 */
const clearInput = "clear";

/** 空のBookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [],
  entries: [],
  folders: [],
} satisfies BookmarkTree;

/** 空の直前結果一覧です。 */
const emptyLastResultEntries = [] as const;

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

/** Bookmark作成port fixtureです。 */
const bookmarkCreator = {
  /**
   * このテストでは呼ばれないBookmark作成portです。
   * @returns {Promise<never>} 呼び出された場合は失敗します。
   */
  createBookmark: async (): Promise<never> => {
    await Promise.resolve();

    throw new Error("createBookmark should not be called");
  },
} satisfies BookmarkCreatorPort;

/** Bookmark URLを開くport fixtureです。 */
const bookmarkOpener = {
  /**
   * このテストでは呼ばれないBookmark opener portです。
   * @returns {Promise<never>} 呼び出された場合は失敗します。
   */
  openBookmarkUrl: async (): Promise<never> => {
    await Promise.resolve();

    throw new Error("openBookmarkUrl should not be called");
  },
} satisfies BookmarkOpenerPort;

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
 * Bookmark CLI command dependencies fixtureを作ります。
 * @returns {BookmarkCliCommandDependencies} Command実行依存です。
 */
const createCommandDependencies = (): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: currentDirectoryRoot,
  extensionState: initialExtensionState,
  lastResultEntries: emptyLastResultEntries,
  opener: bookmarkOpener,
  repository: createBookmarkRepository(),
});

/**
 * Bookmark clear CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand clear command", (): void => {
  /**
   * Clear commandで表示結果を空にできることを検証します。
   */
  it("returns empty display state", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(clearInput, createCommandDependencies());

    expect(state).toStrictEqual({
      currentDirectory: currentDirectoryRoot,
      extensionState: initialExtensionState,
      lastResultEntries: emptyLastResultEntries,
      resultItems: [],
      statusText: "Ready",
    });
  });
});
