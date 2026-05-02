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

/**
 * Work folderのentryです。
 */
const workFolderEntry = {
  childrenCount: 2,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/**
 * Admin folderのentryです。
 */
const adminFolderEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "11",
  kind: "folder",
  parentId: "10",
  title: "Admin",
} satisfies BookmarkEntry;

/**
 * Stripe DashboardのBookmark Entryです。
 */
const stripeDashboardEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/**
 * Controller testで使うBookmark Treeです。
 */
const bookmarkTree = {
  bookmarks: [stripeDashboardEntry],
  entries: [workFolderEntry, adminFolderEntry, stripeDashboardEntry],
  folders: [workFolderEntry, adminFolderEntry],
} satisfies BookmarkTree;

/**
 * Root current directoryです。
 */
const rootCurrentDirectory = "/";

/**
 * 空の直前結果一覧です。
 */
const emptyLastResultEntries = [] as const satisfies readonly BookmarkEntry[];

/**
 * Find commandの入力です。
 */
const findInput = "find stripe";

/**
 * Go commandの入力です。
 */
const goInput = "go stripe";

/**
 * 未対応commandの入力です。
 */
const unknownInput = "open stripe";

/**
 * Ls commandの入力です。
 */
const listDirectoryInput = "ls Work";

/**
 * Cd commandの入力です。
 */
const changeDirectoryInput = "cd 1";

/**
 * Pwd commandの入力です。
 */
const printWorkingDirectoryInput = "pwd";

/**
 * 先頭result itemのindexです。
 */
const firstResultItemIndex = 0;

/**
 * URL記録opener fixtureです。
 */
interface RecordingBookmarkOpener {
  /**
   * 開いたURL一覧です。
   */
  readonly openedUrls: readonly string[];
  /**
   * Bookmark URLを開くportです。
   */
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

/**
 * Bookmark CLI command dependencies fixtureを作ります。
 * @param {readonly BookmarkEntry[]} lastResultEntries 直前結果一覧です。
 * @returns {BookmarkCliCommandDependencies} Command実行依存です。
 */
const createCommandDependencies = (
  lastResultEntries: readonly BookmarkEntry[] = emptyLastResultEntries,
): BookmarkCliCommandDependencies => ({
  currentDirectory: rootCurrentDirectory,
  lastResultEntries,
  opener: createRecordingBookmarkOpener().opener,
  repository: createBookmarkRepository(),
});

/**
 * Bookmark検索系CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand search commands", (): void => {
  /**
   * Find commandから表示状態を作れることを検証します。
   */
  it("returns result items for find command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(findInput, createCommandDependencies());

    expect(state.currentDirectory).toBe(rootCurrentDirectory);
    expect(state.lastResultEntries).toStrictEqual([stripeDashboardEntry]);
    expect(state.statusText).toBe("1 candidates");
    expect(state.resultItems[firstResultItemIndex]).toMatchObject({
      folderPath: "/Work",
      kind: "bookmark",
      title: "Stripe Dashboard",
      url: "https://dashboard.stripe.com/",
    });
    expect(typeof state.resultItems[firstResultItemIndex]?.score).toBe("number");
  });

  /**
   * Go commandで最上位候補を開けることを検証します。
   */
  it("opens top candidate for go command", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const state = await executeBookmarkCliCommand(goInput, {
      currentDirectory: rootCurrentDirectory,
      lastResultEntries: emptyLastResultEntries,
      opener: recordingOpener.opener,
      repository: createBookmarkRepository(),
    });

    expect(recordingOpener.openedUrls).toStrictEqual(["https://dashboard.stripe.com/"]);
    expect(state.lastResultEntries).toStrictEqual([stripeDashboardEntry]);
    expect(state.statusText).toBe("Opened Stripe Dashboard");
  });
});

/**
 * Bookmark directory系CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand directory commands", (): void => {
  /**
   * Ls commandでdirectory entry一覧を表示状態へ変換できることを検証します。
   */
  it("returns directory entries for ls command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(listDirectoryInput, createCommandDependencies());

    expect(state.statusText).toBe("2 entries");
    expect(state.lastResultEntries).toStrictEqual([adminFolderEntry, stripeDashboardEntry]);
    expect(state.resultItems.map((item) => item.title)).toStrictEqual([
      "Admin",
      "Stripe Dashboard",
    ]);
  });

  /**
   * Cd commandで現在ディレクトリを更新できることを検証します。
   */
  it("changes current directory for cd command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(
      changeDirectoryInput,
      createCommandDependencies([workFolderEntry]),
    );

    expect(state.currentDirectory).toBe("/Work");
    expect(state.resultItems).toStrictEqual([]);
    expect(state.statusText).toBe("Directory /Work");
  });

  /**
   * Pwd commandで現在ディレクトリをstatusへ反映できることを検証します。
   */
  it("returns current directory for pwd command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(
      printWorkingDirectoryInput,
      createCommandDependencies(),
    );

    expect(state.currentDirectory).toBe(rootCurrentDirectory);
    expect(state.statusText).toBe(rootCurrentDirectory);
  });
});

/**
 * Bookmark unknown CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand unknown commands", (): void => {
  /**
   * 未対応commandをstatusへ変換できることを検証します。
   */
  it("returns status for unknown command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(unknownInput, createCommandDependencies());

    expect(state).toStrictEqual({
      currentDirectory: rootCurrentDirectory,
      lastResultEntries: emptyLastResultEntries,
      resultItems: [],
      statusText: "Unknown command: open",
    });
  });
});
