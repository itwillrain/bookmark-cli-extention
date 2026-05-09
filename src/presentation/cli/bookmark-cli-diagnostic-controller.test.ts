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

/** Root parent IDです。 */
const rootParentId = "1";

/** Stripe URLです。 */
const stripeUrl = "https://dashboard.stripe.com/";

/** GitHub URLです。 */
const githubUrl = "https://github.com/";

/** GitHub docs URLです。 */
const githubDocsUrl = "https://docs.github.com/";

/** Doctor command入力です。 */
const doctorCommandInput = "doctor";

/** Dupes title command入力です。 */
const dupesTitleCommandInput = "dupes --title";

/** Doctor pipe command入力です。 */
const doctorGrepCommandInput = "doctor | grep duplicate-url";

/** Root current directoryです。 */
const rootCurrentDirectory = "/";

/** 初期拡張状態fixtureです。 */
const initialExtensionState = createInitialExtensionState();

/** 空の直前結果一覧です。 */
const emptyLastResultEntries = [] as const satisfies readonly BookmarkEntry[];

/**
 * Bookmark entry fixtureを作ります。
 * @param {Partial<BookmarkEntry>} entry entry差分です。
 * @returns {BookmarkEntry} Bookmark entry fixtureです。
 */
const createBookmarkEntry = (entry: Partial<BookmarkEntry>): BookmarkEntry => ({
  childrenCount: 0,
  folderPath: "/Work",
  id: "missing",
  kind: "bookmark",
  parentId: rootParentId,
  title: "Missing",
  url: "https://example.com/",
  ...entry,
});

/** Stripe dashboard bookmarkです。 */
const stripeDashboardBookmark = createBookmarkEntry({
  id: "100",
  title: "Stripe Dashboard",
  url: stripeUrl,
});

/** Stripe billing bookmarkです。 */
const stripeBillingBookmark = createBookmarkEntry({
  id: "101",
  title: "Stripe Billing",
  url: stripeUrl,
});

/** 空title bookmarkです。 */
const emptyTitleBookmark = createBookmarkEntry({
  id: "102",
  title: "",
  url: "https://empty-title.example.com/",
});

/** GitHub bookmarkです。 */
const githubBookmark = createBookmarkEntry({
  id: "103",
  title: "GitHub",
  url: githubUrl,
});

/** GitHub docs bookmarkです。 */
const githubDocsBookmark = createBookmarkEntry({
  id: "104",
  title: " github ",
  url: githubDocsUrl,
});

/** Controller testで使うBookmark Treeです。 */
const bookmarkTree = {
  bookmarks: [
    stripeDashboardBookmark,
    stripeBillingBookmark,
    emptyTitleBookmark,
    githubBookmark,
    githubDocsBookmark,
  ],
  entries: [],
  folders: [],
} satisfies BookmarkTree;

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

/** Bookmark opener fixtureです。 */
const bookmarkOpener = {
  /**
   * URLを開かずに完了します。
   * @returns {Promise<void>} 完了を表すPromiseです。
   */
  openBookmarkUrl: async (): Promise<void> => {
    await Promise.resolve();
  },
} satisfies BookmarkOpenerPort;

/** Bookmark作成port fixtureです。 */
const bookmarkCreator = {
  /**
   * Bookmark作成結果を返します。
   * @returns {Promise<BookmarkEntry>} 作成済みBookmark fixtureです。
   */
  createBookmark: async (): Promise<BookmarkEntry> => {
    await Promise.resolve();

    return stripeDashboardBookmark;
  },
} satisfies BookmarkCreatorPort;

/**
 * Bookmark CLI command dependencies fixtureを作ります。
 * @returns {BookmarkCliCommandDependencies} Command実行依存です。
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
 * Doctor診断CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand doctor command", (): void => {
  /**
   * Doctor commandは整理候補を直前結果として表示できることを検証します。
   */
  it("returns doctor issues as actionable result entries", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(doctorCommandInput, createCommandDependencies());

    expect(state.statusText).toBe("3 issues");
    expect(state.lastResultEntries).toStrictEqual([
      emptyTitleBookmark,
      stripeDashboardBookmark,
      stripeBillingBookmark,
    ]);
    expect(state.resultItems).toStrictEqual([
      {
        description: "empty-title",
        details: ["count=1", "id=102"],
        folderPath: "/Work",
        kind: "bookmark",
        title: "(empty title)",
        url: "https://empty-title.example.com/",
      },
      {
        description: "duplicate-url",
        details: ["count=2", "id=100"],
        folderPath: "/Work",
        kind: "bookmark",
        title: "Stripe Dashboard",
        url: stripeUrl,
      },
      {
        description: "duplicate-url",
        details: ["count=2", "id=101"],
        folderPath: "/Work",
        kind: "bookmark",
        title: "Stripe Billing",
        url: stripeUrl,
      },
    ]);
  });
});

/**
 * Dupes診断CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand dupes command", (): void => {
  /**
   * Dupes commandはtitle重複へ絞って表示できることを検証します。
   */
  it("returns title duplicates for dupes title command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(
      dupesTitleCommandInput,
      createCommandDependencies(),
    );

    expect(state.statusText).toBe("2 issues");
    expect(state.lastResultEntries).toStrictEqual([githubBookmark, githubDocsBookmark]);
    expect(state.resultItems.map((item) => item.description)).toStrictEqual([
      "duplicate-title",
      "duplicate-title",
    ]);
  });
});

/**
 * Bookmark診断pipe CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand diagnostic pipe commands", (): void => {
  /**
   * Doctor commandの結果をgrepで絞り込めることを検証します。
   */
  it("filters doctor issues by grep pipe", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(
      doctorGrepCommandInput,
      createCommandDependencies(),
    );

    expect(state.statusText).toBe("2 matches");
    expect(state.lastResultEntries).toStrictEqual([stripeDashboardBookmark, stripeBillingBookmark]);
    expect(state.resultItems.map((item) => item.title)).toStrictEqual([
      "Stripe Dashboard",
      "Stripe Billing",
    ]);
  });
});
