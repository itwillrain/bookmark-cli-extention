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

/**
 * Help commandの入力。
 */
const helpInput = "help";

/**
 * Topic付きhelp commandの入力。
 */
const helpGoInput = "help go";

/**
 * History topic付きhelp commandの入力。
 */
const helpHistoryInput = "help history";

/**
 * Root current directory。
 */
const rootCurrentDirectory = "/";

/**
 * 空の直前結果一覧。
 */
const emptyLastResultEntries = [] as const satisfies readonly BookmarkEntry[];

/**
 * 初期拡張状態fixture。
 */
const initialExtensionState = createInitialExtensionState();

/**
 * Help topic kind。
 */
const helpResultKind = "help";

/**
 * Help topic title。
 */
const goHelpTopicTitle = "go";

/**
 * History help topicのtitle。
 */
const historyHelpTopicTitle = "history";

/**
 * 空のBookmark Tree fixture。
 */
const emptyBookmarkTree = {
  bookmarks: [],
  entries: [],
  folders: [],
} satisfies BookmarkTree;

/**
 * Bookmark Tree fixtureを返す。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
 */
const getBookmarkTreeFixture = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return emptyBookmarkTree;
};

/**
 * Bookmark Treeを返すrepository fixtureを作る。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得port。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  getBookmarkTree: getBookmarkTreeFixture,
});

/**
 * Bookmark URLを開かないopener fixture。
 */
const bookmarkOpener = {
  /**
   * URLを開かない。
   * @returns {Promise<void>} 完了を表すPromise。
   */
  openBookmarkUrl: async (): Promise<void> => {
    await Promise.resolve();
  },
} satisfies BookmarkOpenerPort;

/**
 * Bookmark作成port fixture。
 */
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
 * @returns {BookmarkCliCommandDependencies} Command実行依存。
 */
const createCommandDependencies = (): BookmarkCliCommandDependencies => ({
  creator: bookmarkCreator,
  currentDirectory: rootCurrentDirectory,
  extensionState: initialExtensionState,
  lastResultEntries: emptyLastResultEntries,
  opener: bookmarkOpener,
  repository: createBookmarkRepository(),
});

/**
 * Bookmark help CLI controllerのテストスイート。
 */
describe("executeBookmarkCliCommand help commands", (): void => {
  /**
   * Help commandでtopic一覧を表示状態へ変換できることを検証。
   */
  it("returns help topics for help command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(helpInput, createCommandDependencies());

    expect(state.statusText).toBe("Help topics");
    expect(state.resultItems.map((item) => item.kind)).toContain(helpResultKind);
    expect(state.resultItems.map((item) => item.title)).toContain(goHelpTopicTitle);
  });

  /**
   * Topic付きHelp commandでcommand説明を表示状態へ変換できることを検証。
   */
  it("returns command help for a topic", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(helpGoInput, createCommandDependencies());

    expect(state.statusText).toBe("Help go");
    expect(state.resultItems).toStrictEqual([
      {
        description: "Bookmarkを検索して開く",
        details: ["usage: go <query>", "usage: go <result-number>", "usage: go [--debug] <query>"],
        folderPath: "/",
        kind: "help",
        title: "go",
      },
    ]);
  });
});

/**
 * Bookmark history help CLI controllerのテストスイート。
 */
describe("executeBookmarkCliCommand history help command", (): void => {
  /**
   * History topic付きHelp commandでChrome履歴説明を表示状態へ変換できることを検証。
   */
  it("returns history help for history topic", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(helpHistoryInput, createCommandDependencies());

    expect(state.statusText).toBe("Help history");
    expect(state.resultItems).toStrictEqual([
      {
        description: "Chrome履歴をfind/goの検索候補として扱う",
        details: [
          "usage: find <query> includes HIST results",
          "usage: go <query> can open a history URL",
          "usage: #tag queries search bookmarks only",
        ],
        folderPath: "/",
        kind: "help",
        title: historyHelpTopicTitle,
      },
    ]);
  });
});
