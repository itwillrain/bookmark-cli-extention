import type { BookmarkEntry, BookmarkTree } from "./bookmark-tree";
import { describe, expect, it } from "vitest";
import { doesFolderPathExist, listDirectoryEntries } from "./bookmark-directory";

/**
 * Work folderのentryです。
 */
const workFolderEntry = {
  childrenCount: 2,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
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
 * Research folderのentryです。
 */
const researchFolderEntry = {
  childrenCount: 0,
  folderPath: "/Work/Research",
  id: "12",
  kind: "folder",
  parentId: "10",
  title: "Research",
} satisfies BookmarkEntry;

/**
 * Stripe bookmarkのentryです。
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
 * GitHub bookmarkのentryです。
 */
const githubBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "43",
  kind: "bookmark",
  parentId: "10",
  title: "GitHub Pull Requests",
  url: "https://github.com/pulls",
} satisfies BookmarkEntry;

/**
 * Directory表示に使うBookmark Treeです。
 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry, githubBookmarkEntry],
  entries: [
    workFolderEntry,
    stripeBookmarkEntry,
    researchFolderEntry,
    adminFolderEntry,
    githubBookmarkEntry,
  ],
  folders: [workFolderEntry, researchFolderEntry, adminFolderEntry],
} satisfies BookmarkTree;

/**
 * 先頭entryのindexです。
 */
const firstEntryIndex = 0;

/**
 * 2番目entryのindexです。
 */
const secondEntryIndex = 1;

/**
 * 3番目entryのindexです。
 */
const thirdEntryIndex = 2;

/**
 * 4番目entryのindexです。
 */
const fourthEntryIndex = 3;

/**
 * Directory entries取得のテストスイートです。
 */
describe("listDirectoryEntries", (): void => {
  /**
   * 指定folder直下のfolderとbookmarkをfolder-firstで返すことを検証します。
   */
  it("lists direct children with folders first", (): void => {
    const entries = listDirectoryEntries(bookmarkTree, "/Work");

    expect(entries[firstEntryIndex]?.id).toBe("11");
    expect(entries[secondEntryIndex]?.id).toBe("12");
    expect(entries[thirdEntryIndex]?.id).toBe("43");
    expect(entries[fourthEntryIndex]?.id).toBe("42");
  });

  /**
   * Root直下のfolderを返すことを検証します。
   */
  it("lists root folders", (): void => {
    const entries = listDirectoryEntries(bookmarkTree, "/");

    expect(entries).toStrictEqual([workFolderEntry]);
  });
});

/**
 * Folder存在判定のテストスイートです。
 */
describe("doesFolderPathExist", (): void => {
  /**
   * Rootは常に存在することを検証します。
   */
  it("treats root as existing folder", (): void => {
    expect(doesFolderPathExist(bookmarkTree, "/")).toBe(true);
  });

  /**
   * Bookmark Tree内にあるfolder pathを存在するものとして扱うことを検証します。
   */
  it("detects existing folder path", (): void => {
    expect(doesFolderPathExist(bookmarkTree, "/Work/Admin")).toBe(true);
  });

  /**
   * Bookmark Tree内にないfolder pathを存在しないものとして扱うことを検証します。
   */
  it("detects missing folder path", (): void => {
    expect(doesFolderPathExist(bookmarkTree, "/Missing")).toBe(false);
  });
});
