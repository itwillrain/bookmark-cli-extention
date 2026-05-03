import { describe, expect, it } from "vitest";
import { isResultNumberInput, resolveEntryByResultNumber } from "./result-selection";
import type { BookmarkEntry } from "./bookmark-tree";

/**
 * Stripe DashboardのBookmark Entryです。
 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/**
 * Admin folderのentryです。
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
 * 直前結果のentry一覧です。
 */
const lastResultEntries = [stripeBookmarkEntry, adminFolderEntry] as const;

/**
 * 2番目の結果番号入力です。
 */
const secondResultNumberInput = "2";

/**
 * 範囲外の結果番号入力です。
 */
const outOfRangeResultNumberInput = "3";

/**
 * 数値ではない結果番号入力です。
 */
const nonNumberResultInput = "Admin";

/**
 * Result number入力判定のテストスイートです。
 */
describe("isResultNumberInput", (): void => {
  /**
   * 数字だけの入力を結果番号として扱うことを検証します。
   */
  it("detects number-only input", (): void => {
    expect(isResultNumberInput(secondResultNumberInput)).toBe(true);
  });

  /**
   * 数字以外を含む入力を結果番号として扱わないことを検証します。
   */
  it("rejects non-number input", (): void => {
    expect(isResultNumberInput(nonNumberResultInput)).toBe(false);
  });
});

/**
 * Result number解決のテストスイートです。
 */
describe("resolveEntryByResultNumber", (): void => {
  /**
   * 1-based番号から対象entryを解決できることを検証します。
   */
  it("resolves entry by one-based result number", (): void => {
    expect(resolveEntryByResultNumber(lastResultEntries, secondResultNumberInput)).toStrictEqual({
      entry: adminFolderEntry,
      ok: true,
    });
  });

  /**
   * 範囲外番号をmissingとして扱うことを検証します。
   */
  it("returns missing result for out-of-range number", (): void => {
    expect(
      resolveEntryByResultNumber(lastResultEntries, outOfRangeResultNumberInput),
    ).toStrictEqual({
      ok: false,
    });
  });
});
