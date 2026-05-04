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
import type { BookmarkOrganizerPort } from "../../application/bookmarks/organize-bookmark-use-case";
import { createInitialExtensionState } from "../../domain/storage/extension-state";

/** Root current directory。 */
const rootCurrentDirectory = "/";

/** Rm対象folder fixture。 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Bookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [],
  entries: [workFolderEntry],
  folders: [workFolderEntry],
} satisfies BookmarkTree;

/** Rm command入力。 */
const removeInput = "rm 1";

/** Recursive Rm command入力。 */
const recursiveRemoveInput = "rm -r 1";

/** Force recursive Rm command入力。 */
const forceRecursiveRemoveInput = "rm -rf 1";

/** Confirm入力。 */
const confirmInput = "y";

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

/** Recursive必須status text。 */
const recursiveRequiredStatusText = "rm: cannot remove 'Work': is a directory; use -r";

/** Folder削除確認status text。 */
const removeFolderConfirmationStatusText = "Remove Work? y/N";

/** Folder削除完了status text。 */
const removedFolderStatusText = "Removed Work";

/** Bookmark作成port fixture。 */
const bookmarkCreator = {
  /**
   * Bookmark作成はこのfixtureでは未使用。
   * @returns {Promise<BookmarkEntry>} 作成済みfolder fixture。
   */
  createBookmark: async (): Promise<BookmarkEntry> => {
    await Promise.resolve();

    return workFolderEntry;
  },
} satisfies BookmarkCreatorPort;

/** URL opener fixture。 */
const noopOpener = {
  /**
   * URL openを何もしない。
   * @returns {Promise<void>} 完了Promise。
   */
  openBookmarkUrl: async (): Promise<void> => {
    await Promise.resolve();
  },
} satisfies BookmarkOpenerPort;

/**
 * Bookmark Treeを返す。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
 */
const getBookmarkTree = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/** Bookmark Tree repository fixture。 */
const bookmarkRepository = {
  getBookmarkTree,
} satisfies BookmarkRepositoryPort;

/** 削除記録fixture。 */
interface RecordingOrganizer {
  /** 削除済みfolder tree ID一覧。 */
  readonly removedTreeIds: readonly string[];
  /** Bookmark整理port。 */
  readonly organizer: BookmarkOrganizerPort;
}

/**
 * 削除を記録するorganizerを作る。
 * @returns {RecordingOrganizer} 削除記録organizer。
 */
// oxlint-disable-next-line max-lines-per-function
const createRecordingOrganizer = (): RecordingOrganizer => {
  const removedTreeIds: string[] = [];

  return {
    organizer: {
      /**
       * Folder作成はこのfixtureでは未使用。
       * @returns {Promise<BookmarkEntry>} 作成済みfolder fixture。
       */
      createFolder: async (): Promise<BookmarkEntry> => {
        await Promise.resolve();

        return workFolderEntry;
      },
      /**
       * Entry移動はこのfixtureでは未使用。
       * @returns {Promise<BookmarkEntry>} 移動済みfolder fixture。
       */
      moveEntry: async (): Promise<BookmarkEntry> => {
        await Promise.resolve();

        return workFolderEntry;
      },
      /**
       * Bookmark削除はこのfixtureでは未使用。
       * @returns {Promise<void>} 完了Promise。
       */
      removeEntry: async (): Promise<void> => {
        await Promise.resolve();
      },
      /**
       * Folder tree削除IDを記録する。
       * @param {{ readonly id: string }} input 削除入力。
       * @param {string} input.id 削除対象folder ID。
       * @returns {Promise<void>} 完了Promise。
       */
      removeFolderTree: async (input: { readonly id: string }): Promise<void> => {
        removedTreeIds.push(input.id);
        await Promise.resolve();
      },
      /**
       * Entry名称変更はこのfixtureでは未使用。
       * @returns {Promise<BookmarkEntry>} 名称変更済みfolder fixture。
       */
      renameEntry: async (): Promise<BookmarkEntry> => {
        await Promise.resolve();

        return workFolderEntry;
      },
    },
    removedTreeIds,
  };
};

/**
 * Folder行を直前結果に持つcommand依存fixtureを作る。
 * @param {BookmarkOrganizerPort} organizer Bookmark整理port。
 * @returns {BookmarkCliCommandDependencies} command依存fixture。
 */
const createFolderCommandDependencies = (
  organizer: BookmarkOrganizerPort,
): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: initialExtensionState,
  lastResultEntries: [workFolderEntry],
  opener: noopOpener,
  organizer,
  repository: bookmarkRepository,
});

/**
 * Folder削除確認を持つcommand依存fixtureを作る。
 * @param {BookmarkOrganizerPort} organizer Bookmark整理port。
 * @returns {BookmarkCliCommandDependencies} command依存fixture。
 */
const createPendingFolderCommandDependencies = (
  organizer: BookmarkOrganizerPort,
): BookmarkCliCommandDependencies => ({
  ...createFolderCommandDependencies(organizer),
  pendingConfirmation: {
    entry: workFolderEntry,
    kind: "rm",
    recursive: true,
  },
});

/** Folder削除commandのguardテストスイート。 */
describe("executeBookmarkCliCommand folder rm guard", (): void => {
  /** Rm commandがfolderをrecursiveなしでは削除しないことを検証。 */
  it("rejects folder remove without recursive option", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      removeInput,
      createFolderCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedTreeIds).toStrictEqual([]);
    expect(state.pendingConfirmation).toBeUndefined();
    expect(state.statusText).toBe(recursiveRequiredStatusText);
  });
});

/** Folder削除commandの実行テストスイート。 */
describe("executeBookmarkCliCommand recursive folder rm", (): void => {
  /** Rm recursive commandがfolder削除確認待ちになることを検証。 */
  it("starts interactive confirmation for recursive folder rm command", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      recursiveRemoveInput,
      createFolderCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedTreeIds).toStrictEqual([]);
    expect(state.pendingConfirmation).toStrictEqual({
      entry: workFolderEntry,
      kind: "rm",
      recursive: true,
    });
    expect(state.statusText).toBe(removeFolderConfirmationStatusText);
  });

  /** Rm force recursive commandがfolderを確認なしで削除することを検証。 */
  it("removes folder tree immediately for force recursive rm command", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      forceRecursiveRemoveInput,
      createFolderCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedTreeIds).toStrictEqual(["10"]);
    expect(state.pendingConfirmation).toBeUndefined();
    expect(state.statusText).toBe(removedFolderStatusText);
  });
});

/** Folder削除確認入力のテストスイート。 */
describe("executeBookmarkCliCommand folder rm confirmation answer", (): void => {
  /** 確認待ちでy入力するとfolder subtreeを削除することを検証。 */
  it("removes pending folder tree for y answer", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      confirmInput,
      createPendingFolderCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedTreeIds).toStrictEqual(["10"]);
    expect(state.pendingConfirmation).toBeUndefined();
    expect(state.resultItems).toStrictEqual([]);
    expect(state.statusText).toBe(removedFolderStatusText);
  });
});
