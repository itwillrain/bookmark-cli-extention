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
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
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
  entries: [workFolderEntry, stripeDashboardEntry],
  folders: [workFolderEntry],
} satisfies BookmarkTree;

/** Root current directoryです。 */
const rootCurrentDirectory = "/";

/** 空の直前結果一覧です。 */
const emptyLastResultEntries = [] as const satisfies readonly BookmarkEntry[];

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

/** Alias設定済み拡張状態fixture。 */
const aliasedExtensionState = {
  ...initialExtensionState,
  settings: {
    ...initialExtensionState.settings,
    commandAliases: [{ command: "go", name: "g" }],
  },
};

/** Go command alias入力です。 */
const goAliasInput = "g stripe";

/** URL記録opener fixtureです。 */
interface RecordingBookmarkOpener {
  /** 開いたURL一覧です。 */
  readonly openedUrls: readonly string[];
  /** Bookmark URLを開くportです。 */
  readonly opener: BookmarkOpenerPort;
}

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
 * URLを記録するopener fixtureを作ります。
 * @returns {RecordingBookmarkOpener} URL記録opener fixtureです。
 */
const createRecordingBookmarkOpener = (): RecordingBookmarkOpener => {
  const openedUrls: string[] = [];

  /**
   * 開いたURLを記録します。
   * @param {string} url 開いたURLです。
   * @returns {Promise<void>} 記録完了を表すPromiseです。
   */
  const openBookmarkUrl = async (url: string): Promise<void> => {
    openedUrls.push(url);
    await Promise.resolve();
  };

  return {
    openedUrls,
    opener: { openBookmarkUrl },
  };
};

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

/**
 * Bookmark CLI command dependencies fixtureを作ります。
 * @param {BookmarkOpenerPort} opener Bookmark URLを開くportです。
 * @returns {BookmarkCliCommandDependencies} Command実行依存です。
 */
const createCommandDependencies = (opener: BookmarkOpenerPort): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: aliasedExtensionState,
  lastResultEntries: emptyLastResultEntries,
  opener,
  repository: createBookmarkRepository(),
});

/** Command alias付きCLI controllerのテストスイートです。 */
describe("executeBookmarkCliCommand command aliases", (): void => {
  /** 設定済みaliasからGo commandを実行できることを検証します。 */
  it("expands configured command aliases", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const state = await executeBookmarkCliCommand(
      goAliasInput,
      createCommandDependencies(recordingOpener.opener),
    );

    expect(recordingOpener.openedUrls).toStrictEqual(["https://dashboard.stripe.com/"]);
    expect(state.statusText).toBe("Opened Stripe Dashboard");
  });
});
