import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import {
  createInitialExtensionState,
  createPersistedCurrentDirectory,
} from "../../domain/storage/extension-state";
import { describe, expect, it } from "vitest";
import { loadExtensionState, persistCommandExecutionState } from "./extension-state-use-cases";
import type { BookmarkRepositoryPort } from "../bookmarks/bookmark-use-cases";
import type { ExtensionStateStoragePort } from "./extension-state-ports";

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

/** 書き込み回数の期待値。 */
const expectedWrittenStateCount = 1;

/**
 * 現在日時fixtureを返す。
 * @returns {string} 現在日時fixture。
 */
const now = (): string => executedAt;

/** Storage port記録fixture。 */
interface RecordingExtensionStateStorage {
  /** Extension state storage port。 */
  readonly storage: ExtensionStateStoragePort;
  /** 書き込まれた状態一覧。 */
  readonly writtenStates: readonly unknown[];
}

/**
 * Bookmark Tree repository fixtureを作成。
 * @returns {BookmarkRepositoryPort} Bookmark repository port。
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
 * Extension state storage fixtureを作成。
 * @param {ReturnType<typeof createInitialExtensionState>} state 読み込み時に返す状態。
 * @returns {RecordingExtensionStateStorage} storage fixture。
 */
const createRecordingStorage = (
  state: ReturnType<typeof createInitialExtensionState>,
): RecordingExtensionStateStorage => {
  const writtenStates: unknown[] = [];

  return {
    storage: {
      /**
       * Extension state fixtureを読み込む。
       * @returns {Promise<ReturnType<typeof createInitialExtensionState>>} Extension state fixture。
       */
      readExtensionState: async (): Promise<ReturnType<typeof createInitialExtensionState>> => {
        await Promise.resolve();

        return state;
      },
      /**
       * Extension state fixtureを書き込む。
       * @param {ReturnType<typeof createInitialExtensionState>} nextState 書き込み対象state。
       * @returns {Promise<void>} 書き込み完了Promise。
       */
      writeExtensionState: async (
        nextState: ReturnType<typeof createInitialExtensionState>,
      ): Promise<void> => {
        writtenStates.push(nextState);
        await Promise.resolve();
      },
    },
    writtenStates,
  };
};

/** Extension state読み込みuse caseのテストスイート。 */
describe("loadExtensionState", (): void => {
  /**
   * 起動時に保存状態をBookmark Treeと照合して復元できることを検証。
   */
  it("loads and sanitizes extension state", async (): Promise<void> => {
    const state = {
      ...createInitialExtensionState(),
      currentDirectory: createPersistedCurrentDirectory("999", "/Missing", previousExecutedAt),
      virtualTagsByBookmarkId: {
        "42": ["prod"],
        "999": ["missing"],
      },
    };
    const recordingStorage = createRecordingStorage(state);

    const result = await loadExtensionState({
      now,
      repository: createBookmarkRepository(),
      storage: recordingStorage.storage,
    });

    expect(result.ok).toBe(true);
    expect(result.ok && result.value.currentDirectory.folderPath).toBe("/");
    expect(result.ok && result.value.virtualTagsByBookmarkId).toStrictEqual({
      "42": ["prod"],
    });
    expect(recordingStorage.writtenStates).toHaveLength(expectedWrittenStateCount);
  });
});

/** Extension state保存use caseのテストスイート。 */
describe("persistCommandExecutionState", (): void => {
  /**
   * Command実行後に現在ディレクトリと入力履歴を保存できることを検証。
   */
  it("persists current directory and command history", async (): Promise<void> => {
    const recordingStorage = createRecordingStorage(createInitialExtensionState());

    const result = await persistCommandExecutionState({
      commandInput: "cd Work",
      currentDirectory: "/Work",
      extensionState: createInitialExtensionState(),
      now,
      repository: createBookmarkRepository(),
      storage: recordingStorage.storage,
    });

    expect(result.ok).toBe(true);
    expect(result.ok && result.value.currentDirectory).toStrictEqual({
      bookmarkId: "10",
      folderPath: "/Work",
      updatedAt: executedAt,
    });
    expect(result.ok && result.value.commandHistory).toStrictEqual([
      { executedAt, input: "cd Work" },
    ]);
    expect(recordingStorage.writtenStates).toHaveLength(expectedWrittenStateCount);
  });
});

/** Extension state settings保存保護use caseのテストスイート。 */
describe("persistCommandExecutionState latest settings", (): void => {
  /** 保存直前にstorage側で更新されたsettingsを保持できることを検証。 */
  it("keeps latest persisted settings", async (): Promise<void> => {
    const persistedState = {
      ...createInitialExtensionState(),
      settings: {
        ...createInitialExtensionState().settings,
        commandAliases: [{ command: "go", name: "g" }],
      },
    };
    const recordingStorage = createRecordingStorage(persistedState);

    const result = await persistCommandExecutionState({
      commandInput: "ls",
      currentDirectory: "/",
      extensionState: createInitialExtensionState(),
      now,
      repository: createBookmarkRepository(),
      storage: recordingStorage.storage,
    });

    expect(result.ok && result.value.settings.commandAliases).toStrictEqual([
      { command: "go", name: "g" },
    ]);
  });
});

/** Extension state command settings保存use caseのテストスイート。 */
describe("persistCommandExecutionState command settings", (): void => {
  /** Commandが更新したsettingsを保持できることを検証。 */
  it("keeps command updated settings when requested", async (): Promise<void> => {
    const commandUpdatedState = {
      ...createInitialExtensionState(),
      settings: {
        ...createInitialExtensionState().settings,
        commandAliases: [{ command: "ls -la", name: "la" }],
      },
    };
    const recordingStorage = createRecordingStorage(createInitialExtensionState());

    const result = await persistCommandExecutionState({
      commandInput: "alias la='ls -la'",
      currentDirectory: "/",
      extensionState: commandUpdatedState,
      now,
      preserveExtensionSettings: true,
      repository: createBookmarkRepository(),
      storage: recordingStorage.storage,
    });

    expect(result.ok && result.value.settings.commandAliases).toStrictEqual([
      { command: "ls -la", name: "la" },
    ]);
  });
});

/** Extension state abbr command settings保存use caseのテストスイート。 */
describe("persistCommandExecutionState abbr command settings", (): void => {
  /** Abbr commandが更新したsettingsを保持できることを検証。 */
  it("keeps abbr command updated settings when requested", async (): Promise<void> => {
    const commandUpdatedState = {
      ...createInitialExtensionState(),
      settings: {
        ...createInitialExtensionState().settings,
        commandAbbreviations: [{ command: "ls -la", name: "la" }],
      },
    };
    const recordingStorage = createRecordingStorage(createInitialExtensionState());

    const result = await persistCommandExecutionState({
      commandInput: "abbr la='ls -la'",
      currentDirectory: "/",
      extensionState: commandUpdatedState,
      now,
      preserveExtensionSettings: true,
      repository: createBookmarkRepository(),
      storage: recordingStorage.storage,
    });

    expect(result.ok && result.value.settings.commandAbbreviations).toStrictEqual([
      { command: "ls -la", name: "la" },
    ]);
  });
});
