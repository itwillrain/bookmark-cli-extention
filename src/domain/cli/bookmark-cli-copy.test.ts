import { createBookmarkCliEntryPath, resolveBookmarkCliEntryCopyText } from "./bookmark-cli-copy";
import { describe, expect, it } from "vitest";
import type { BookmarkEntry } from "../bookmarks/bookmark-tree";

/** Work folder entry fixtureです。 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Stripe bookmark entry fixtureです。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Bookmark CLI entry path作成のテストスイートです。 */
describe("createBookmarkCliEntryPath", (): void => {
  /** Folder entryではfolder pathを返すことを検証します。 */
  it("returns folder path for folder entry", (): void => {
    expect(createBookmarkCliEntryPath(workFolderEntry)).toBe("/Work");
  });

  /** Bookmark entryではfolder pathとtitleを結合することを検証します。 */
  it("joins folder path and title for bookmark entry", (): void => {
    expect(createBookmarkCliEntryPath(stripeBookmarkEntry)).toBe("/Work/Stripe Dashboard");
  });
});

/** Bookmark CLI entry copy text解決のテストスイートです。 */
describe("resolveBookmarkCliEntryCopyText", (): void => {
  /** Default copyではURLを優先することを検証します。 */
  it("prefers URL for default bookmark copy", (): void => {
    expect(resolveBookmarkCliEntryCopyText(stripeBookmarkEntry, "default")).toStrictEqual({
      ok: true,
      text: "https://dashboard.stripe.com/",
    });
  });

  /** Default copyではURLがなければpathへfallbackすることを検証します。 */
  it("falls back to path for default folder copy", (): void => {
    expect(resolveBookmarkCliEntryCopyText(workFolderEntry, "default")).toStrictEqual({
      ok: true,
      text: "/Work",
    });
  });

  /** Path指定ではCLI pathを返すことを検証します。 */
  it("returns path for path copy", (): void => {
    expect(resolveBookmarkCliEntryCopyText(stripeBookmarkEntry, "path")).toStrictEqual({
      ok: true,
      text: "/Work/Stripe Dashboard",
    });
  });

  /** Title指定ではtitleを返すことを検証します。 */
  it("returns title for title copy", (): void => {
    expect(resolveBookmarkCliEntryCopyText(stripeBookmarkEntry, "title")).toStrictEqual({
      ok: true,
      text: "Stripe Dashboard",
    });
  });

  /** URL指定でURLがない場合は失敗することを検証します。 */
  it("returns missing result when URL is unavailable", (): void => {
    expect(resolveBookmarkCliEntryCopyText(workFolderEntry, "url")).toStrictEqual({
      ok: false,
    });
  });
});
