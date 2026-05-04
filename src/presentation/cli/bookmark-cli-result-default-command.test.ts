import { describe, expect, it } from "vitest";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-result-list-types";
import { createBookmarkCliResultDefaultCommand } from "./bookmark-cli-result-default-command";

/** Folder result item fixtureです。 */
const folderResultItem = {
  folderPath: "/Work",
  kind: "folder",
  title: "Work",
} satisfies BookmarkCliResultItem;

/** Bookmark result item fixtureです。 */
const bookmarkResultItem = {
  folderPath: "/Work",
  kind: "bookmark",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkCliResultItem;

/** History result item fixtureです。 */
const historyResultItem = {
  folderPath: "/History",
  kind: "history",
  title: "GitHub Docs",
  url: "https://docs.github.com/",
} satisfies BookmarkCliResultItem;

/** 先頭result indexです。 */
const firstResultIndex = 0;

/** 2番目result indexです。 */
const secondResultIndex = 1;

/** 3番目result indexです。 */
const thirdResultIndex = 2;

/**
 * Result item既定command作成のテストスイートです。
 */
describe("createBookmarkCliResultDefaultCommand", (): void => {
  /**
   * Folder resultはcd番号として実行することを検証します。
   */
  it("creates cd result-number command for folder result", (): void => {
    expect(
      createBookmarkCliResultDefaultCommand({
        item: folderResultItem,
        resultIndex: firstResultIndex,
      }),
    ).toBe("cd 1");
  });

  /**
   * Bookmark resultはgo番号として実行することを検証します。
   */
  it("creates go result-number command for bookmark result", (): void => {
    expect(
      createBookmarkCliResultDefaultCommand({
        item: bookmarkResultItem,
        resultIndex: secondResultIndex,
      }),
    ).toBe("go 2");
  });

  /**
   * History resultはgo番号として実行することを検証します。
   */
  it("creates go result-number command for history result", (): void => {
    expect(
      createBookmarkCliResultDefaultCommand({
        item: historyResultItem,
        resultIndex: thirdResultIndex,
      }),
    ).toBe("go 3");
  });
});
