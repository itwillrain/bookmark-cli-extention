import { describe, expect, it } from "vitest";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import { resolveBookmarkSearchResultByResultNumber } from "./go-bookmark-result-number";

/** Folder entry fixtureです。 */
const folderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Bookmark entry fixtureです。 */
const bookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** 直前結果一覧fixtureです。 */
const lastResultEntries = [folderEntry, bookmarkEntry] satisfies readonly BookmarkEntry[];

/**
 * 直前結果番号によるBookmark検索結果解決のテストスイートです。
 */
describe("resolveBookmarkSearchResultByResultNumber", (): void => {
  /**
   * Bookmarkを指すresult numberから検索結果を返すことを検証します。
   */
  it("resolves bookmark search result by result number", (): void => {
    const result = resolveBookmarkSearchResultByResultNumber({
      lastResultEntries,
      query: "2",
    });

    expect(result).not.toBe(false);

    if (result !== false) {
      expect(result.entry.id).toBe("42");
      expect(result.entry.url).toBe("https://dashboard.stripe.com/");
    }
  });

  /**
   * Folderを指すresult numberは解決しないことを検証します。
   */
  it("returns false when result number points to folder", (): void => {
    expect(
      resolveBookmarkSearchResultByResultNumber({
        lastResultEntries,
        query: "1",
      }),
    ).toBe(false);
  });
});
