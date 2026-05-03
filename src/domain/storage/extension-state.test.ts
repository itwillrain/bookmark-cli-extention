import type { BookmarkEntry, BookmarkTree } from "../bookmarks/bookmark-tree";
import {
  type CommandHistoryEntry,
  appendCommandHistory,
  createInitialExtensionState,
  createPersistedCurrentDirectory,
  maxCommandHistoryEntries,
} from "./extension-state";
import { describe, expect, it } from "vitest";
import {
  sanitizeExtensionStateForBookmarkTree,
  updateCurrentDirectory,
} from "./extension-state-cleanup";

/** Work folder entry fixture。 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Stripe bookmark entry fixture。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Bookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry],
  entries: [workFolderEntry, stripeBookmarkEntry],
  folders: [workFolderEntry],
} satisfies BookmarkTree;

/** 実行日時fixture。 */
const executedAt = "2026-05-03T00:00:00.000Z";

/** 古い実行日時fixture。 */
const previousExecutedAt = "2026-05-02T00:00:00.000Z";

/** 先頭のcommand history index。 */
const firstCommandHistoryIndex = 0;

/** 末尾のcommand history offset。 */
const lastCommandHistoryOffset = -1;

/**
 * Command history entry fixtureを作成。
 * @param {number} index command index。
 * @returns {CommandHistoryEntry} command history entry fixture。
 */
const createCommandHistoryEntry = (index: number): CommandHistoryEntry => ({
  executedAt: previousExecutedAt,
  input: `find ${String(index)}`,
});

/** 初期保存状態のテストスイート。 */
describe("createInitialExtensionState", (): void => {
  /**
   * 初期保存状態を作れることを検証。
   */
  it("creates initial state", (): void => {
    expect(createInitialExtensionState()).toStrictEqual({
      commandHistory: [],
      currentDirectory: {
        bookmarkId: "0",
        folderPath: "/",
        updatedAt: "",
      },
      schemaVersion: 1,
      settings: {
        preferNerdFont: false,
        promptStyle: "powerline",
      },
      usageByBookmarkId: {},
      virtualTagsByBookmarkId: {},
    });
  });
});

/** Command history更新のテストスイート。 */
describe("appendCommandHistory", (): void => {
  /**
   * 連続した同じ入力を履歴へ重複追加しないことを検証。
   */
  it("does not append duplicated consecutive command history", (): void => {
    const state = {
      ...createInitialExtensionState(),
      commandHistory: [{ executedAt: previousExecutedAt, input: "find stripe" }],
    };

    const nextState = appendCommandHistory(state, "find stripe", executedAt);

    expect(nextState.commandHistory).toStrictEqual(state.commandHistory);
  });

  /**
   * 入力履歴を直近100件へ丸めることを検証。
   */
  it("keeps command history within max entries", (): void => {
    const commandHistory = [...Array.from({ length: maxCommandHistoryEntries }).keys()].map(
      (index) => createCommandHistoryEntry(index),
    );
    const state = {
      ...createInitialExtensionState(),
      commandHistory,
    };

    const nextState = appendCommandHistory(state, "find latest", executedAt);

    expect(nextState.commandHistory).toHaveLength(maxCommandHistoryEntries);
    expect(nextState.commandHistory[firstCommandHistoryIndex]?.input).toBe("find 1");
    expect(nextState.commandHistory.at(lastCommandHistoryOffset)).toStrictEqual({
      executedAt,
      input: "find latest",
    });
  });
});

/** 現在ディレクトリ更新のテストスイート。 */
describe("updateCurrentDirectory", (): void => {
  /**
   * 現在ディレクトリのfolder IDとpathを保存状態へ反映できることを検証。
   */
  it("updates current directory with folder id", (): void => {
    const nextState = updateCurrentDirectory({
      bookmarkTree,
      currentDirectory: "/Work",
      state: createInitialExtensionState(),
      updatedAt: executedAt,
    });

    expect(nextState.currentDirectory).toStrictEqual({
      bookmarkId: "10",
      folderPath: "/Work",
      updatedAt: executedAt,
    });
  });
});

/** 拡張状態掃除のテストスイート。 */
describe("sanitizeExtensionStateForBookmarkTree", (): void => {
  /**
   * 削除済みBookmarkや存在しないcurrent directoryを掃除することを検証。
   */
  it("sanitizes orphaned state for current bookmark tree", (): void => {
    const state = {
      ...createInitialExtensionState(),
      currentDirectory: createPersistedCurrentDirectory("999", "/Missing", previousExecutedAt),
      usageByBookmarkId: {
        "42": { lastOpenedAt: executedAt, openCount: 1 },
        "999": { lastOpenedAt: executedAt, openCount: 2 },
      },
      virtualTagsByBookmarkId: {
        "42": ["prod"],
        "999": ["missing"],
      },
    };

    const sanitizedState = sanitizeExtensionStateForBookmarkTree({
      bookmarkTree,
      state,
      updatedAt: executedAt,
    });

    expect(sanitizedState.currentDirectory).toStrictEqual({
      bookmarkId: "0",
      folderPath: "/",
      updatedAt: executedAt,
    });
    expect(sanitizedState.virtualTagsByBookmarkId).toStrictEqual({
      "42": ["prod"],
    });
    expect(sanitizedState.usageByBookmarkId).toStrictEqual({
      "42": { lastOpenedAt: executedAt, openCount: 1 },
    });
  });
});
