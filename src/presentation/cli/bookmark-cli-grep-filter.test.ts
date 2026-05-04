import { describe, expect, it } from "vitest";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import { filterBookmarkCliResultItemsByGrep } from "./bookmark-cli-grep-filter";

/** Stripe result itemのindexです。 */
const stripeResultItemIndex = 0;

/** Help result itemのindexです。 */
const helpResultItemIndex = 2;

/** Stripe result item fixtureです。 */
const stripeResultItem = {
  folderPath: "/Work/Admin",
  kind: "bookmark",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkCliResultItem;

/** Admin folder result item fixtureです。 */
const adminFolderResultItem = {
  details: ["id=11", "children=2"],
  folderPath: "/Work",
  kind: "folder",
  title: "Admin",
} satisfies BookmarkCliResultItem;

/** Help result item fixtureです。 */
const helpResultItem = {
  description: "現在ディレクトリの中身を表示する",
  details: ["usage: ls [-a] [-l] [path]"],
  folderPath: "/",
  kind: "help",
  title: "ls",
} satisfies BookmarkCliResultItem;

/** Grep filter対象のresult items fixtureです。 */
const resultItems = [stripeResultItem, adminFolderResultItem, helpResultItem] as const;

/**
 * Bookmark CLI grep filterのテストスイートです。
 */
describe("filterBookmarkCliResultItemsByGrep", (): void => {
  /**
   * Titleを大文字小文字無視で絞り込めることを検証します。
   */
  it("filters items by title case-insensitively", (): void => {
    const result = filterBookmarkCliResultItemsByGrep(resultItems, "stripe");

    expect(result.resultItems).toStrictEqual([stripeResultItem]);
    expect(result.matchingIndexes).toStrictEqual([stripeResultItemIndex]);
  });

  /**
   * URLを対象に絞り込めることを検証します。
   */
  it("filters items by URL", (): void => {
    const result = filterBookmarkCliResultItemsByGrep(resultItems, "dashboard.stripe.com");

    expect(result.resultItems).toStrictEqual([stripeResultItem]);
    expect(result.matchingIndexes).toStrictEqual([stripeResultItemIndex]);
  });

  /**
   * Detailsを対象に絞り込めることを検証します。
   */
  it("filters items by details", (): void => {
    const result = filterBookmarkCliResultItemsByGrep(resultItems, "usage: ls");

    expect(result.resultItems).toStrictEqual([helpResultItem]);
    expect(result.matchingIndexes).toStrictEqual([helpResultItemIndex]);
  });
});
