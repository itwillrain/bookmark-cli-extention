import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import { listFrequentBookmarks, listRecentBookmarks } from "./bookmark-usage-use-case";
import type { BookmarkRepositoryPort } from "./bookmark-use-cases";
import type { UsageByBookmarkId } from "../../domain/storage/extension-state";

/** Stripe Bookmark fixture。 */
const stripeBookmark = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** GitHub Bookmark fixture。 */
const githubBookmark = {
  childrenCount: 0,
  folderPath: "/Work/Dev",
  id: "43",
  kind: "bookmark",
  parentId: "11",
  title: "GitHub Pull Requests",
  url: "https://github.com/pulls",
} satisfies BookmarkEntry;

/** Bookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [stripeBookmark, githubBookmark],
  entries: [stripeBookmark, githubBookmark],
  folders: [],
} satisfies BookmarkTree;

/** 利用統計fixture。 */
const usageByBookmarkId = {
  "42": { lastOpenedAt: "2026-05-02T00:00:00.000Z", openCount: 5 },
  "43": { lastOpenedAt: "2026-05-03T00:00:00.000Z", openCount: 1 },
} satisfies UsageByBookmarkId;

/** 1件だけ表示するlimit。 */
const singleResultLimit = 1;

/**
 * Bookmark repository fixtureを作成。
 * @returns {BookmarkRepositoryPort} Bookmark repository fixture。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  /**
   * Bookmark Tree fixtureを返す。
   * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
   */
  getBookmarkTree: async (): Promise<BookmarkTree> => {
    await Promise.resolve();

    return bookmarkTree;
  },
});

/**
 * 利用統計Bookmark use caseのテストスイート。
 */
describe("bookmark usage use cases", (): void => {
  /**
   * Recentで最近開いたBookmarkを返すことを検証。
   */
  it("lists recent bookmarks", async (): Promise<void> => {
    const result = await listRecentBookmarks({
      repository: createBookmarkRepository(),
      usageByBookmarkId,
    });

    expect(result).toMatchObject({ ok: true });
    expect(result.ok && result.value.entries.map((entry) => entry.id)).toStrictEqual(["43", "42"]);
  });

  /**
   * Freqでlimit件数のよく開くBookmarkを返すことを検証。
   */
  it("lists frequent bookmarks with limit", async (): Promise<void> => {
    const result = await listFrequentBookmarks({
      limit: singleResultLimit,
      repository: createBookmarkRepository(),
      usageByBookmarkId,
    });

    expect(result).toMatchObject({ ok: true });
    expect(result.ok && result.value.entries.map((entry) => entry.id)).toStrictEqual(["42"]);
  });
});
