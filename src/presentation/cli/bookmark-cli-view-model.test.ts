import { describe, expect, it } from "vitest";
import type { BookmarkSearchResult } from "../../domain/search/bookmark-search";
import { createBookmarkCliResultItems } from "./bookmark-cli-view-model";

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
        score: 0.98,
        title: "Stripe Dashboard",
        url: "https://dashboard.stripe.com/",
      },
    ]);
  });
});
