import {
  type BookmarkCliCommandDependencies,
  executeBookmarkCliCommand,
} from "./bookmark-cli-controller";
import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import type {
  BookmarkOpenerPort,
  BookmarkRepositoryPort,
  BrowserHistoryRepositoryPort,
} from "../../application/bookmarks/bookmark-use-cases";
import { describe, expect, it } from "vitest";
import type { BookmarkCreatorPort } from "../../application/bookmarks/mark-bookmark-use-case";
import type { BrowserHistoryEntry } from "../../domain/history/browser-history";
import { createInitialExtensionState } from "../../domain/storage/extension-state";

/** Root current directory。 */
const rootCurrentDirectory = "/";

/** 空の直前結果一覧。 */
const emptyLastResultEntries = [] as const satisfies readonly BookmarkEntry[];

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

/** Find history command入力。 */
const findHistoryInput = "find docs";

/** Go history command入力。 */
const goHistoryInput = "go docs";

/** History command入力。 */
const historyInput = "history docs";

/** Grep pipe付きHistory command入力。 */
const historyGrepInput = "history | grep github";

/** Chrome履歴Entry fixture。 */
const githubDocsHistoryEntry = {
  childrenCount: 0,
  folderPath: "/History",
  id: "history-101",
  kind: "history",
  lastVisitTime: 1_700_000_000_000,
  parentId: "history",
  title: "GitHub Docs",
  typedCount: 1,
  url: "https://docs.github.com/",
  visitCount: 12,
} satisfies BrowserHistoryEntry;

/** 空のBookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [],
  entries: [],
  folders: [],
} satisfies BookmarkTree;

/** URL記録opener fixture。 */
interface RecordingBookmarkOpener {
  /** 開いたURL一覧。 */
  readonly openedUrls: readonly string[];
  /** Bookmark URLを開くport。 */
  readonly opener: BookmarkOpenerPort;
}

/**
 * Bookmark Tree fixtureを返す。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
 */
const getBookmarkTreeFixture = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/**
 * Bookmark Treeを返すrepository fixtureを作る。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得port。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  getBookmarkTree: getBookmarkTreeFixture,
});

/**
 * Chrome履歴を返すrepository fixtureを作る。
 * @returns {BrowserHistoryRepositoryPort} Chrome履歴取得port。
 */
const createBrowserHistoryRepository = (): BrowserHistoryRepositoryPort => ({
  /**
   * Chrome履歴fixtureを返す。
   * @returns {Promise<readonly BrowserHistoryEntry[]>} Chrome履歴fixture。
   */
  searchHistory: async (): Promise<readonly BrowserHistoryEntry[]> => {
    await Promise.resolve();

    return [githubDocsHistoryEntry];
  },
});

/**
 * URLを記録するopener fixtureを作る。
 * @returns {RecordingBookmarkOpener} URL記録opener fixture。
 */
const createRecordingBookmarkOpener = (): RecordingBookmarkOpener => {
  const openedUrls: string[] = [];

  /**
   * 開いたURLを記録する。
   * @param {string} url 開いたURL。
   * @returns {Promise<void>} 記録完了を表すPromise。
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

/** Bookmark作成port fixture。 */
const bookmarkCreator = {
  /**
   * Bookmark作成結果を返す。
   * @returns {Promise<BookmarkEntry>} 作成済みBookmark fixture。
   */
  createBookmark: async (): Promise<BookmarkEntry> => {
    await Promise.resolve();

    return {
      childrenCount: 0,
      folderPath: "/",
      id: "100",
      kind: "bookmark",
      parentId: "1",
      title: "Example",
      url: "https://example.com/",
    };
  },
} satisfies BookmarkCreatorPort;

/**
 * Bookmark CLI command dependencies fixtureを作る。
 * @param {BookmarkOpenerPort} opener Bookmark URLを開くport。
 * @returns {BookmarkCliCommandDependencies} Command実行依存。
 */
const createCommandDependencies = (
  opener: BookmarkOpenerPort = createRecordingBookmarkOpener().opener,
): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: initialExtensionState,
  historyRepository: createBrowserHistoryRepository(),
  lastResultEntries: emptyLastResultEntries,
  opener,
  repository: createBookmarkRepository(),
});

/**
 * Bookmark history command CLI controllerのテストスイート。
 */
describe("executeBookmarkCliCommand history command", (): void => {
  /**
   * History commandでChrome履歴だけを表示できることを検証。
   */
  it("returns history result items for history command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(historyInput, createCommandDependencies());

    expect(state.statusText).toBe("1 history");
    expect(state.lastResultEntries).toStrictEqual([githubDocsHistoryEntry]);
    expect(state.resultItems).toStrictEqual([
      {
        folderPath: "/History",
        kind: "history",
        title: "GitHub Docs",
        url: "https://docs.github.com/",
      },
    ]);
  });
});

/**
 * Bookmark history search CLI controllerのテストスイート。
 */
describe("executeBookmarkCliCommand history search integration", (): void => {
  /**
   * Find commandでChrome履歴resultを表示できることを検証。
   */
  it("returns history result items for find command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(findHistoryInput, createCommandDependencies());

    expect(state.statusText).toBe("1 candidates");
    expect(state.lastResultEntries).toStrictEqual([githubDocsHistoryEntry]);
    expect(state.resultItems).toStrictEqual([
      {
        folderPath: "/History",
        kind: "history",
        title: "GitHub Docs",
        url: "https://docs.github.com/",
      },
    ]);
  });

  /**
   * Go commandでChrome履歴URLを開けることを検証。
   */
  it("opens history URL for go command", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const state = await executeBookmarkCliCommand(
      goHistoryInput,
      createCommandDependencies(recordingOpener.opener),
    );

    expect(recordingOpener.openedUrls).toStrictEqual(["https://docs.github.com/"]);
    expect(state.statusText).toBe("Opened GitHub Docs");
    expect(state.extensionState.usageByBookmarkId).toStrictEqual({});
  });
});

/**
 * Bookmark history pipe CLI controllerのテストスイート。
 */
describe("executeBookmarkCliCommand history pipe integration", (): void => {
  /**
   * History commandの結果をgrep pipeで絞り込めることを検証。
   */
  it("filters history result items by grep pipe", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(historyGrepInput, createCommandDependencies());

    expect(state.statusText).toBe("1 matches");
    expect(state.lastResultEntries).toStrictEqual([githubDocsHistoryEntry]);
    expect(state.resultItems.map((item) => item.title)).toStrictEqual(["GitHub Docs"]);
  });
});
