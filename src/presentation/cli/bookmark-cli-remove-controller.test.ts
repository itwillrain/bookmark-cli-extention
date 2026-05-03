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

/** Rm対象Bookmark fixture。 */
const stripeDashboardEntry = {
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
  bookmarks: [stripeDashboardEntry],
  entries: [stripeDashboardEntry],
  folders: [],
} satisfies BookmarkTree;

/** Rm command入力。 */
const removeInput = "rm 1";

/** Force Rm command入力。 */
const forceRemoveInput = "rm -f 1";

/** Confirm入力。 */
const confirmInput = "y";

/** Long confirm入力。 */
const longConfirmInput = "yes";

/** Cancel入力。 */
const cancelInput = "n";

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

/** 削除確認status text。 */
const removeConfirmationStatusText = "Remove Stripe Dashboard? y/N";

/** 削除完了status text。 */
const removedStatusText = "Removed Stripe Dashboard";

/** 削除中止status text。 */
const cancelledStatusText = "Cancelled rm Stripe Dashboard";

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
  /** 削除済みID一覧。 */
  readonly removedIds: readonly string[];
  /** Bookmark整理port。 */
  readonly organizer: BookmarkOrganizerPort;
}

/**
 * 削除を記録するorganizerを作る。
 * @returns {RecordingOrganizer} 削除記録organizer。
 */
const createRecordingOrganizer = (): RecordingOrganizer => {
  const removedIds: string[] = [];

  return {
    organizer: {
      /**
       * Folder作成はこのfixtureでは未使用。
       * @returns {Promise<BookmarkEntry>} 作成済みBookmark fixture。
       */
      createFolder: async (): Promise<BookmarkEntry> => {
        await Promise.resolve();

        return stripeDashboardEntry;
      },
      /**
       * Entry移動はこのfixtureでは未使用。
       * @returns {Promise<BookmarkEntry>} 移動済みBookmark fixture。
       */
      moveEntry: async (): Promise<BookmarkEntry> => {
        await Promise.resolve();

        return stripeDashboardEntry;
      },
      /**
       * 削除IDを記録する。
       * @param {{ readonly id: string }} input 削除入力。
       * @param {string} input.id 削除対象ID。
       * @returns {Promise<void>} 完了Promise。
       */
      removeEntry: async (input: { readonly id: string }): Promise<void> => {
        removedIds.push(input.id);
        await Promise.resolve();
      },
      /**
       * Entry名称変更はこのfixtureでは未使用。
       * @returns {Promise<BookmarkEntry>} 名称変更済みBookmark fixture。
       */
      renameEntry: async (): Promise<BookmarkEntry> => {
        await Promise.resolve();

        return stripeDashboardEntry;
      },
    },
    removedIds,
  };
};

/**
 * Command依存fixtureを作る。
 * @param {BookmarkOrganizerPort} organizer Bookmark整理port。
 * @returns {BookmarkCliCommandDependencies} command依存fixture。
 */
const createCommandDependencies = (
  organizer: BookmarkOrganizerPort,
): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: initialExtensionState,
  lastResultEntries: [stripeDashboardEntry],
  opener: noopOpener,
  organizer,
  repository: bookmarkRepository,
});

/**
 * Bookmark削除確認を持つcommand依存fixtureを作る。
 * @param {BookmarkOrganizerPort} organizer Bookmark整理port。
 * @returns {BookmarkCliCommandDependencies} command依存fixture。
 */
const createPendingCommandDependencies = (
  organizer: BookmarkOrganizerPort,
): BookmarkCliCommandDependencies => ({
  ...createCommandDependencies(organizer),
  pendingConfirmation: {
    entry: stripeDashboardEntry,
    kind: "rm",
  },
});

/** Bookmark削除commandのテストスイート。 */
describe("executeBookmarkCliCommand rm command", (): void => {
  /** Rm commandが削除せず確認待ちになることを検証。 */
  it("starts interactive confirmation for rm command", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      removeInput,
      createCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedIds).toStrictEqual([]);
    expect(state.pendingConfirmation).toStrictEqual({
      entry: stripeDashboardEntry,
      kind: "rm",
    });
    expect(state.statusText).toBe(removeConfirmationStatusText);
  });

  /** Rm force commandが確認なしで削除することを検証。 */
  it("removes bookmark immediately for force rm command", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      forceRemoveInput,
      createCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedIds).toStrictEqual(["42"]);
    expect(state.pendingConfirmation).toBeUndefined();
    expect(state.statusText).toBe(removedStatusText);
  });
});

/** Bookmark削除確認入力のテストスイート。 */
describe("executeBookmarkCliCommand rm confirmation answer", (): void => {
  /** 確認待ちでy入力すると削除することを検証。 */
  it("removes pending bookmark for y answer", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      confirmInput,
      createPendingCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedIds).toStrictEqual(["42"]);
    expect(state.pendingConfirmation).toBeUndefined();
    expect(state.statusText).toBe(removedStatusText);
  });

  /** 確認待ちでyes入力すると削除することを検証。 */
  it("removes pending bookmark for yes answer", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      longConfirmInput,
      createPendingCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedIds).toStrictEqual(["42"]);
    expect(state.pendingConfirmation).toBeUndefined();
    expect(state.statusText).toBe(removedStatusText);
  });

  /** 確認待ちでn入力すると削除しないことを検証。 */
  it("cancels pending bookmark for n answer", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();
    const state = await executeBookmarkCliCommand(
      cancelInput,
      createPendingCommandDependencies(recordingOrganizer.organizer),
    );

    expect(recordingOrganizer.removedIds).toStrictEqual([]);
    expect(state.pendingConfirmation).toBeUndefined();
    expect(state.statusText).toBe(cancelledStatusText);
  });
});
