import { describe, expect, it } from "vitest";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import { createInitialExtensionState } from "../../domain/storage/extension-state";
import { tagBookmark } from "./tag-bookmark-use-case";

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

/** Work folder entry fixture。 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** 直前結果一覧fixture。 */
const lastResultEntries = [stripeBookmarkEntry, workFolderEntry] as const;

/** 先頭result number入力。 */
const firstResultNumberInput = "1";

/** 2番目result number入力。 */
const secondResultNumberInput = "2";

/** 存在しないresult number入力。 */
const missingResultNumberInput = "9";

/** 仮想タグ追加のテストスイート。 */
describe("tagBookmark add", (): void => {
  /**
   * 直前結果番号のBookmarkへ仮想タグを追加できることを検証。
   */
  it("adds virtual tags to bookmark selected by result number", (): void => {
    const result = tagBookmark({
      extensionState: createInitialExtensionState(),
      lastResultEntries,
      remove: false,
      tagInputs: ["Prod", "#finance", "prod"],
      targetInput: firstResultNumberInput,
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.extensionState.virtualTagsByBookmarkId).toStrictEqual({
        "42": ["prod", "finance"],
      });
      expect(result.value.tags).toStrictEqual(["prod", "finance"]);
    }
  });
});

/** 仮想タグ削除のテストスイート。 */
describe("tagBookmark remove", (): void => {
  /**
   * 直前結果番号のBookmarkから仮想タグを削除できることを検証。
   */
  it("removes virtual tags from bookmark selected by result number", (): void => {
    const result = tagBookmark({
      extensionState: {
        ...createInitialExtensionState(),
        virtualTagsByBookmarkId: {
          "42": ["prod", "finance"],
        },
      },
      lastResultEntries,
      remove: true,
      tagInputs: ["prod"],
      targetInput: firstResultNumberInput,
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.extensionState.virtualTagsByBookmarkId).toStrictEqual({
        "42": ["finance"],
      });
      expect(result.value.tags).toStrictEqual(["prod"]);
    }
  });
});

/** 仮想タグ対象検証のテストスイート。 */
describe("tagBookmark target validation", (): void => {
  /**
   * 対象番号がBookmarkではない場合はnot_foundを返すことを検証。
   */
  it("returns not_found when result number points to folder", (): void => {
    const result = tagBookmark({
      extensionState: createInitialExtensionState(),
      lastResultEntries,
      remove: false,
      tagInputs: ["prod"],
      targetInput: secondResultNumberInput,
    });

    expect(result).toMatchObject({
      errorCode: "not_found",
      ok: false,
    });
  });

  /**
   * 対象番号が存在しない場合はnot_foundを返すことを検証。
   */
  it("returns not_found when result number is missing", (): void => {
    const result = tagBookmark({
      extensionState: createInitialExtensionState(),
      lastResultEntries,
      remove: false,
      tagInputs: ["prod"],
      targetInput: missingResultNumberInput,
    });

    expect(result).toMatchObject({
      errorCode: "not_found",
      ok: false,
    });
  });
});
