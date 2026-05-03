import { describe, expect, it } from "vitest";
import { createBookmarkCliCompletionInput } from "./bookmark-cli-completion-input";

/** Go command入力値です。 */
const goCommandInputValue = "go";

/** Go commandの現在directory prefix付き入力値です。 */
const goCurrentDirectoryPrefixInputValue = "go ./st";

/** Folder result item fixtureです。 */
const folderResultItem = {
  folderPath: "/Work/Admin",
  kind: "folder",
  title: "Admin",
} as const;

/** Bookmark result item fixtureです。 */
const bookmarkResultItem = {
  folderPath: "/Work/Admin",
  kind: "bookmark",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} as const;

/**
 * Bookmark CLI補完入力の基本テストスイートです。
 */
describe("createBookmarkCliCompletionInput basics", (): void => {
  /**
   * Folder result itemはfolder pathで補完することを検証します。
   */
  it("creates folder path completion for folder item", (): void => {
    expect(createBookmarkCliCompletionInput(folderResultItem)).toBe("/Work/Admin");
  });

  /**
   * Bookmark result itemはtitleで補完することを検証します。
   */
  it("creates title completion for bookmark item", (): void => {
    expect(createBookmarkCliCompletionInput(bookmarkResultItem)).toBe("Stripe Dashboard");
  });
});

/**
 * Go command向けBookmark CLI補完入力のテストスイートです。
 */
describe("createBookmarkCliCompletionInput for go", (): void => {
  /**
   * Go command入力中はcommand名を残してbookmark titleを補完することを検証します。
   */
  it("keeps go command when completing a bookmark result item", (): void => {
    expect(createBookmarkCliCompletionInput(bookmarkResultItem, goCommandInputValue)).toBe(
      "go Stripe Dashboard",
    );
  });

  /**
   * Go commandのpath prefix入力中はpath prefixを残してbookmark titleを補完することを検証します。
   */
  it("keeps go path prefix when completing a bookmark result item", (): void => {
    expect(
      createBookmarkCliCompletionInput(bookmarkResultItem, goCurrentDirectoryPrefixInputValue),
    ).toBe("go ./Stripe Dashboard");
  });
});
