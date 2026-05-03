import { describe, expect, it } from "vitest";
import {
  listFrequentlyOpenedBookmarks,
  listRecentlyOpenedBookmarks,
  recordBookmarkOpened,
} from "./bookmark-usage";
import type { BookmarkEntry } from "../bookmarks/bookmark-tree";
import type { UsageByBookmarkId } from "./extension-state";

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

/** Docs Bookmark fixture。 */
const docsBookmark = {
  childrenCount: 0,
  folderPath: "/Work/Docs",
  id: "44",
  kind: "bookmark",
  parentId: "12",
  title: "Astro Docs",
  url: "https://docs.astro.build/",
} satisfies BookmarkEntry;

/** Bookmark一覧fixture。 */
const bookmarks = [stripeBookmark, githubBookmark, docsBookmark] as const;

/** 古い日時fixture。 */
const oldOpenedAt = "2026-05-01T00:00:00.000Z";

/** 新しい日時fixture。 */
const newOpenedAt = "2026-05-03T00:00:00.000Z";

/** 中間日時fixture。 */
const middleOpenedAt = "2026-05-02T00:00:00.000Z";

/** 初期利用統計fixture。 */
const usageByBookmarkId = {
  "42": { lastOpenedAt: middleOpenedAt, openCount: 3 },
  "43": { lastOpenedAt: newOpenedAt, openCount: 1 },
  "44": { lastOpenedAt: oldOpenedAt, openCount: 7 },
} satisfies UsageByBookmarkId;

/** 結果limit fixture。 */
const resultLimit = 2;

/**
 * Bookmark利用統計記録のテストスイート。
 */
describe("recordBookmarkOpened", (): void => {
  /**
   * Bookmarkを開いた回数と最終日時を更新できることを検証。
   */
  it("increments existing usage", (): void => {
    const nextUsage = recordBookmarkOpened({
      bookmarkId: stripeBookmark.id,
      openedAt: newOpenedAt,
      usageByBookmarkId,
    });

    expect(nextUsage[stripeBookmark.id]).toStrictEqual({
      lastOpenedAt: newOpenedAt,
      openCount: 4,
    });
  });

  /**
   * 初回利用のBookmark統計を作成できることを検証。
   */
  it("creates first usage", (): void => {
    const nextUsage = recordBookmarkOpened({
      bookmarkId: "100",
      openedAt: newOpenedAt,
      usageByBookmarkId: {},
    });

    expect(nextUsage).toStrictEqual({
      "100": { lastOpenedAt: newOpenedAt, openCount: 1 },
    });
  });
});

/**
 * Bookmark利用統計一覧のテストスイート。
 */
describe("list usage bookmarks", (): void => {
  /**
   * 最近開いた順にBookmarkを返すことを検証。
   */
  it("lists recently opened bookmarks", (): void => {
    const entries = listRecentlyOpenedBookmarks({ bookmarks, resultLimit, usageByBookmarkId });

    expect(entries.map((entry) => entry.id)).toStrictEqual(["43", "42"]);
  });

  /**
   * よく開く順にBookmarkを返すことを検証。
   */
  it("lists frequently opened bookmarks", (): void => {
    const entries = listFrequentlyOpenedBookmarks({ bookmarks, resultLimit, usageByBookmarkId });

    expect(entries.map((entry) => entry.id)).toStrictEqual(["44", "42"]);
  });
});
