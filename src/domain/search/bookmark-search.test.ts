import {
  bookmarkSearchFuseOptions,
  convertFuseScoreToCommandScore,
  createBookmarkSearchDocuments,
  searchBookmarks,
} from "./bookmark-search";
import { describe, expect, it } from "vitest";
import type { BookmarkEntry } from "../bookmarks/bookmark-tree";

/**
 * Work folderのBookmark Entryです。
 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/**
 * Stripe DashboardのBookmark Entryです。
 */
const stripeDashboardEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "42",
  kind: "bookmark",
  parentId: "11",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/**
 * GitHub Pull RequestsのBookmark Entryです。
 */
const githubPullRequestsEntry = {
  childrenCount: 0,
  folderPath: "/Work/GitHub",
  id: "43",
  kind: "bookmark",
  parentId: "10",
  title: "GitHub Pull Requests",
  url: "https://github.com/pulls",
} satisfies BookmarkEntry;

/**
 * 検索テストで使うBookmark Entry一覧です。
 */
const bookmarkEntries = [
  workFolderEntry,
  stripeDashboardEntry,
  githubPullRequestsEntry,
] satisfies readonly BookmarkEntry[];

/**
 * Folder path検索で期待する検索結果件数です。
 */
const expectedAdminSearchResultCount = 1;

/**
 * 先頭検索結果のindexです。
 */
const firstSearchResultIndex = 0;

/**
 * 期待する検索document一覧です。
 */
const expectedSearchDocuments = [
  {
    entry: stripeDashboardEntry,
    folderPath: "/Work/Admin",
    id: "42",
    title: "Stripe Dashboard",
    url: "https://dashboard.stripe.com/",
  },
  {
    entry: githubPullRequestsEntry,
    folderPath: "/Work/GitHub",
    id: "43",
    title: "GitHub Pull Requests",
    url: "https://github.com/pulls",
  },
];

/**
 * 期待するFuse.js optionです。
 */
const expectedFuseOptions = {
  ignoreLocation: true,
  includeMatches: true,
  includeScore: true,
  keys: [
    { name: "title", weight: 0.55 },
    { name: "folderPath", weight: 0.3 },
    { name: "url", weight: 0.15 },
  ],
  minMatchCharLength: 2,
  threshold: 0.4,
};

/**
 * Fuse.jsの最良scoreです。
 */
const bestFuseScore = 0;

/**
 * Fuse.jsの中間scoreです。
 */
const middleFuseScore = 0.25;

/**
 * Fuse.jsの最悪scoreです。
 */
const worstFuseScore = 1;

/**
 * CLIで扱う最良scoreです。
 */
const bestCommandScore = 1;

/**
 * CLIで扱う中間scoreです。
 */
const middleCommandScore = 0.75;

/**
 * CLIで扱う最悪scoreです。
 */
const worstCommandScore = 0;

/**
 * Bookmark検索のテストスイートです。
 */
describe("bookmark search", (): void => {
  /**
   * Bookmark EntryからFuse.jsへ渡す検索documentを作れることを検証します。
   */
  it("creates Fuse.js documents from bookmark entries", (): void => {
    const documents = createBookmarkSearchDocuments(bookmarkEntries);

    expect(documents).toStrictEqual(expectedSearchDocuments);
  });

  /**
   * Fuse.jsの初期optionが検索仕様と一致することを検証します。
   */
  it("exposes Fuse.js options for bookmark search", (): void => {
    expect(bookmarkSearchFuseOptions).toStrictEqual(expectedFuseOptions);
  });

  /**
   * Fuse.js scoreをCLIのscoreへ変換できることを検証します。
   */
  it("converts Fuse.js score into command score", (): void => {
    expect(convertFuseScoreToCommandScore(bestFuseScore)).toBe(bestCommandScore);
    expect(convertFuseScoreToCommandScore(middleFuseScore)).toBe(middleCommandScore);
    expect(convertFuseScoreToCommandScore(worstFuseScore)).toBe(worstCommandScore);
  });

  /**
   * Folder path一致でBookmarkを検索できることを検証します。
   */
  it("searches bookmarks by folder path", (): void => {
    const results = searchBookmarks(bookmarkEntries, "Admin");

    expect(results).toHaveLength(expectedAdminSearchResultCount);
    expect(results[firstSearchResultIndex]?.entry.id).toBe("42");
  });
});
