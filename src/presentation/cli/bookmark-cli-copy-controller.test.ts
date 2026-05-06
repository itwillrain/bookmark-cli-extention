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
import type { ClipboardWriterPort } from "./bookmark-cli-command-state";
import { createInitialExtensionState } from "../../domain/storage/extension-state";

/** Root current directory fixtureです。 */
const rootCurrentDirectory = "/";

/** Work folder entry fixtureです。 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Stripe bookmark entry fixtureです。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Bookmark tree fixtureです。 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry],
  entries: [workFolderEntry, stripeBookmarkEntry],
  folders: [workFolderEntry],
} satisfies BookmarkTree;

/** 直前結果一覧fixtureです。 */
const lastResultEntries = [stripeBookmarkEntry, workFolderEntry] as const;

/** Copy成功status textです。 */
const copiedStatusText = "Copied";

/** Copy output成功status textです。 */
const copiedOutputStatusText = "Copied output";

/** 先頭copy textのindexです。 */
const firstCopiedTextIndex = 0;

/**
 * Clipboard書き込み記録fixtureです。
 */
interface RecordingClipboard {
  /** Clipboardへ書き込まれたtext一覧です。 */
  readonly copiedTexts: readonly string[];
  /** Clipboard writer portです。 */
  readonly clipboard: ClipboardWriterPort;
}

/**
 * Bookmark Tree fixtureを返します。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixtureです。
 */
const getBookmarkTree = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/** Bookmark repository fixtureです。 */
const repository = {
  getBookmarkTree,
} satisfies BookmarkRepositoryPort;

/** Bookmark opener fixtureです。 */
const opener = {
  /**
   * URL openをnoopにします。
   * @returns {Promise<void>} 完了Promiseです。
   */
  openBookmarkUrl: async (): Promise<void> => {
    await Promise.resolve();
  },
} satisfies BookmarkOpenerPort;

/** Bookmark creator fixtureです。 */
const creator = {
  /**
   * Bookmark作成をnoopにします。
   * @returns {Promise<BookmarkEntry>} Bookmark entry fixtureです。
   */
  createBookmark: async (): Promise<BookmarkEntry> => {
    await Promise.resolve();

    return stripeBookmarkEntry;
  },
} satisfies BookmarkCreatorPort;

/**
 * Clipboard書き込みを記録するfixtureを作ります。
 * @returns {RecordingClipboard} Clipboard記録fixtureです。
 */
const createRecordingClipboard = (): RecordingClipboard => {
  const copiedTexts: string[] = [];

  /**
   * Clipboardへ書き込むtextを記録します。
   * @param {string} text Clipboardへ書き込むtextです。
   * @returns {Promise<void>} 記録完了Promiseです。
   */
  const writeText = async (text: string): Promise<void> => {
    copiedTexts.push(text);
    await Promise.resolve();
  };

  return {
    clipboard: { writeText },
    copiedTexts,
  };
};

/**
 * Command実行依存fixtureを作ります。
 * @param {ClipboardWriterPort} clipboard Clipboard writer portです。
 * @returns {BookmarkCliCommandDependencies} command実行依存fixtureです。
 */
const createCommandDependencies = (
  clipboard: ClipboardWriterPort,
): BookmarkCliCommandDependencies => ({
  clipboard,
  creator,
  currentDirectory: rootCurrentDirectory,
  extensionState: createInitialExtensionState(),
  lastResultEntries,
  opener,
  repository,
});

/** Copy command単体のテストスイートです。 */
describe("executeBookmarkCliCommand copy target commands", (): void => {
  /** Default copyではbookmark URLをcopyすることを検証します。 */
  it("copies bookmark URL by default", async (): Promise<void> => {
    const recording = createRecordingClipboard();
    const state = await executeBookmarkCliCommand(
      "copy 1",
      createCommandDependencies(recording.clipboard),
    );

    expect(recording.copiedTexts).toStrictEqual(["https://dashboard.stripe.com/"]);
    expect(state.statusText).toBe(copiedStatusText);
  });

  /** Default copyではfolder pathへfallbackすることを検証します。 */
  it("copies folder path by default", async (): Promise<void> => {
    const recording = createRecordingClipboard();
    const state = await executeBookmarkCliCommand(
      "copy 2",
      createCommandDependencies(recording.clipboard),
    );

    expect(recording.copiedTexts).toStrictEqual(["/Work"]);
    expect(state.statusText).toBe(copiedStatusText);
  });

  /** Path optionではbookmark pathをcopyすることを検証します。 */
  it("copies bookmark path with path option", async (): Promise<void> => {
    const recording = createRecordingClipboard();
    await executeBookmarkCliCommand(
      "copy --path 1",
      createCommandDependencies(recording.clipboard),
    );

    expect(recording.copiedTexts).toStrictEqual(["/Work/Stripe Dashboard"]);
  });

  /** URL optionでURLがない場合はcopyしないことを検証します。 */
  it("does not copy missing URL", async (): Promise<void> => {
    const recording = createRecordingClipboard();
    const state = await executeBookmarkCliCommand(
      "copy --url 2",
      createCommandDependencies(recording.clipboard),
    );

    expect(recording.copiedTexts).toStrictEqual([]);
    expect(state.statusText).toBe("Copy value was not found: url");
  });
});

/** Copy pipe stageのテストスイートです。 */
describe("executeBookmarkCliCommand copy pipe commands", (): void => {
  /** Pwd pipe outputをcopyすることを検証します。 */
  it("copies pwd pipe output", async (): Promise<void> => {
    const recording = createRecordingClipboard();
    const state = await executeBookmarkCliCommand(
      "pwd | copy",
      createCommandDependencies(recording.clipboard),
    );

    expect(recording.copiedTexts).toStrictEqual([rootCurrentDirectory]);
    expect(state.statusText).toBe(copiedOutputStatusText);
  });

  /** Ls pipe outputをcopyすることを検証します。 */
  it("copies ls pipe output", async (): Promise<void> => {
    const recording = createRecordingClipboard();
    const state = await executeBookmarkCliCommand(
      "ls Work | copy",
      createCommandDependencies(recording.clipboard),
    );

    expect(recording.copiedTexts[firstCopiedTextIndex]).toContain(
      "1 | BOOKMARK | /Work | Stripe Dashboard",
    );
    expect(recording.copiedTexts[firstCopiedTextIndex]).toContain("https://dashboard.stripe.com/");
    expect(state.statusText).toBe(copiedOutputStatusText);
  });
});
