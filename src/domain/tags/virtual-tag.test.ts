import {
  addVirtualTagsToBookmark,
  filterEntriesByVirtualTags,
  normalizeVirtualTag,
  normalizeVirtualTags,
  parseVirtualTagSearchQuery,
  removeVirtualTagsFromBookmark,
} from "./virtual-tag";
import { describe, expect, it } from "vitest";
import type { BookmarkEntry } from "../bookmarks/bookmark-tree";
import { createInitialExtensionState } from "../storage/extension-state";

/** Stripe bookmark entry fixture。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "42",
  kind: "bookmark",
  parentId: "11",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** GitHub bookmark entry fixture。 */
const githubBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work/GitHub",
  id: "43",
  kind: "bookmark",
  parentId: "10",
  title: "GitHub Pull Requests",
  url: "https://github.com/pulls",
} satisfies BookmarkEntry;

/** Work folder entry fixture。 */
const workFolderEntry = {
  childrenCount: 2,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Bookmark Entry fixture一覧。 */
const bookmarkEntries = [
  workFolderEntry,
  stripeBookmarkEntry,
  githubBookmarkEntry,
] satisfies readonly BookmarkEntry[];

/** 正規化前のtag入力。 */
const rawTagInput = " #Prod ";

/** 正規化済みtag名。 */
const normalizedTag = "prod";

/** Bookmark ID別仮想タグfixture。 */
const virtualTagsByBookmarkId = {
  "42": ["prod", "finance"],
  "43": ["dev"],
};

/** 先頭entry index。 */
const firstEntryIndex = 0;

/** 仮想タグ正規化のテストスイート。 */
describe("normalizeVirtualTag", (): void => {
  /**
   * 先頭#と大文字小文字を正規化できることを検証。
   */
  it("normalizes hash prefix and casing", (): void => {
    expect(normalizeVirtualTag(rawTagInput)).toBe(normalizedTag);
  });

  /**
   * 空タグを除き、重複を削除できることを検証。
   */
  it("normalizes tag list with deduplication", (): void => {
    expect(normalizeVirtualTags(["Prod", "#prod", " finance ", "#"])).toStrictEqual([
      "prod",
      "finance",
    ]);
  });
});

/** 仮想タグ保存のテストスイート。 */
describe("virtual tag state updates", (): void => {
  /**
   * Bookmark IDへ仮想タグを追加できることを検証。
   */
  it("adds virtual tags to bookmark state", (): void => {
    const nextState = addVirtualTagsToBookmark(createInitialExtensionState(), "42", [
      "Prod",
      "#finance",
      "prod",
    ]);

    expect(nextState.virtualTagsByBookmarkId).toStrictEqual({
      "42": ["prod", "finance"],
    });
  });

  /**
   * Bookmark IDから仮想タグを削除できることを検証。
   */
  it("removes virtual tags from bookmark state", (): void => {
    const state = {
      ...createInitialExtensionState(),
      virtualTagsByBookmarkId,
    };

    const nextState = removeVirtualTagsFromBookmark(state, "42", ["prod"]);

    expect(nextState.virtualTagsByBookmarkId).toStrictEqual({
      "42": ["finance"],
      "43": ["dev"],
    });
  });
});

/** 仮想タグ検索queryのテストスイート。 */
describe("parseVirtualTagSearchQuery", (): void => {
  /**
   * #tagと検索本文を分離できることを検証。
   */
  it("parses tag filters and text query", (): void => {
    expect(parseVirtualTagSearchQuery("#Prod stripe #finance")).toStrictEqual({
      tags: ["prod", "finance"],
      textQuery: "stripe",
    });
  });
});

/** 仮想タグ絞り込みのテストスイート。 */
describe("filterEntriesByVirtualTags", (): void => {
  /**
   * 指定した仮想タグを持つBookmarkだけに絞り込めることを検証。
   */
  it("filters entries by all requested virtual tags", (): void => {
    const filteredEntries = filterEntriesByVirtualTags(bookmarkEntries, virtualTagsByBookmarkId, [
      "prod",
      "finance",
    ]);

    expect(filteredEntries[firstEntryIndex]).toStrictEqual(stripeBookmarkEntry);
  });
});
