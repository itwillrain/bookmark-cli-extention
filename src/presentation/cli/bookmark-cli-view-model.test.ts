import {
  createBookmarkCliCompletionInput,
  createBookmarkCliResultItems,
  createBookmarkCliResultItemsFromEntries,
  createBookmarkCliResultItemsFromTreeEntries,
} from "./bookmark-cli-view-model";
import { describe, expect, it } from "vitest";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { BookmarkSearchResult } from "../../domain/search/bookmark-search";
import type { BookmarkTreeViewEntry } from "../../domain/bookmarks/bookmark-tree-view";

/**
 * Stripe検索結果fixtureです。
 */
const stripeSearchResult = {
  entry: {
    childrenCount: 0,
    folderPath: "/Work/Admin",
    id: "42",
    kind: "bookmark",
    parentId: "10",
    title: "Stripe Dashboard",
    url: "https://dashboard.stripe.com/",
  },
  matches: [],
  score: 0.98,
} satisfies BookmarkSearchResult;

/**
 * Admin folderのentry fixtureです。
 */
const adminFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work/Admin",
  id: "11",
  kind: "folder",
  parentId: "10",
  title: "Admin",
} satisfies BookmarkEntry;

/**
 * Tree view fixtureのdepthです。
 */
const treeViewDepth = 2;

/**
 * Admin folderのtree表示entry fixtureです。
 */
const adminTreeViewEntry = {
  depth: treeViewDepth,
  entry: adminFolderEntry,
} satisfies BookmarkTreeViewEntry;

/**
 * Bookmark CLI view modelのテストスイートです。
 */
describe("createBookmarkCliResultItems", (): void => {
  /**
   * Bookmark検索結果を画面表示itemへ変換できることを検証します。
   */
  it("converts bookmark search results into CLI result items", (): void => {
    expect(createBookmarkCliResultItems([stripeSearchResult])).toStrictEqual([
      {
        folderPath: "/Work/Admin",
        kind: "bookmark",
        title: "Stripe Dashboard",
        url: "https://dashboard.stripe.com/",
      },
    ]);
  });

  /**
   * Debug option指定時だけscoreを画面表示itemへ含めることを検証します。
   */
  it("includes score when debug option is enabled", (): void => {
    expect(createBookmarkCliResultItems([stripeSearchResult], { debug: true })).toStrictEqual([
      {
        folderPath: "/Work/Admin",
        kind: "bookmark",
        score: 0.98,
        title: "Stripe Dashboard",
        url: "https://dashboard.stripe.com/",
      },
    ]);
  });
});

/**
 * Bookmark entry view modelのテストスイートです。
 */
describe("createBookmarkCliResultItemsFromEntries", (): void => {
  /**
   * Bookmark entryを画面表示itemへ変換できることを検証します。
   */
  it("converts bookmark entries into CLI result items", (): void => {
    expect(createBookmarkCliResultItemsFromEntries([adminFolderEntry])).toStrictEqual([
      {
        folderPath: "/Work/Admin",
        kind: "folder",
        title: "Admin",
      },
    ]);
  });
});

/**
 * Bookmark tree view modelのテストスイートです。
 */
describe("createBookmarkCliResultItemsFromTreeEntries", (): void => {
  /**
   * Tree view entryをdepth付き画面表示itemへ変換できることを検証します。
   */
  it("converts tree view entries into CLI result items", (): void => {
    expect(createBookmarkCliResultItemsFromTreeEntries([adminTreeViewEntry])).toStrictEqual([
      {
        depth: treeViewDepth,
        folderPath: "/Work/Admin",
        kind: "folder",
        title: "Admin",
      },
    ]);
  });
});

/**
 * Bookmark CLI補完view modelのテストスイートです。
 */
describe("createBookmarkCliCompletionInput", (): void => {
  /**
   * Folder result itemはfolder pathで補完することを検証します。
   */
  it("creates folder path completion for folder item", (): void => {
    expect(
      createBookmarkCliCompletionInput({
        folderPath: "/Work/Admin",
        kind: "folder",
        title: "Admin",
      }),
    ).toBe("/Work/Admin");
  });

  /**
   * Bookmark result itemはtitleで補完することを検証します。
   */
  it("creates title completion for bookmark item", (): void => {
    expect(
      createBookmarkCliCompletionInput({
        folderPath: "/Work/Admin",
        kind: "bookmark",
        title: "Stripe Dashboard",
        url: "https://dashboard.stripe.com/",
      }),
    ).toBe("Stripe Dashboard");
  });
});
