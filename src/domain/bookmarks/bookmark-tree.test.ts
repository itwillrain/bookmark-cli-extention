/* oxlint-disable max-lines -- Browser root container正規化のfixtureを同じテストで比較するため。 */

import {
  type BookmarkEntry,
  type RawBookmarkTreeNode,
  normalizeBookmarkTree,
} from "./bookmark-tree";
import { describe, expect, it } from "vitest";

/**
 * Stripe Dashboard のURLです。
 */
const stripeDashboardUrl = "https://dashboard.stripe.com/";

/**
 * GitHub Pull Requests のURLです。
 */
const githubPullRequestsUrl = "https://github.com/pulls";

/**
 * Firefox Release NotesのURLです。
 */
const firefoxReleaseNotesUrl = "https://www.mozilla.org/firefox/releases/";

/**
 * Chrome Extensions DocsのURLです。
 */
const chromeExtensionsDocsUrl = "https://developer.chrome.com/docs/extensions/";

/**
 * Mobile SearchのURLです。
 */
const mobileSearchUrl = "https://www.google.com/search?q=mobile";

/**
 * Chrome Bookmarks APIが返すroot nodeを含むBookmark Tree fixtureです。
 */
const chromeBookmarkTree = [
  {
    children: [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    id: "42",
                    parentId: "11",
                    title: "Stripe Dashboard",
                    url: stripeDashboardUrl,
                  },
                ],
                id: "11",
                parentId: "10",
                title: "Admin",
              },
            ],
            id: "10",
            parentId: "1",
            title: "Work",
          },
          {
            id: "43",
            parentId: "1",
            title: "GitHub Pull Requests",
            url: githubPullRequestsUrl,
          },
        ],
        folderType: "bookmarks-bar",
        id: "1",
        parentId: "0",
        title: "Bookmarks Bar",
      },
      {
        children: [
          {
            id: "44",
            parentId: "2",
            title: "Chrome Extensions Docs",
            url: chromeExtensionsDocsUrl,
          },
        ],
        folderType: "other",
        id: "2",
        parentId: "0",
        title: "Other Bookmarks",
      },
      {
        children: [
          {
            id: "50",
            parentId: "3",
            title: "Mobile Search",
            url: mobileSearchUrl,
          },
        ],
        folderType: "mobile",
        id: "3",
        parentId: "0",
        title: "Mobile Bookmarks",
      },
    ],
    id: "0",
    title: "",
  },
] satisfies readonly RawBookmarkTreeNode[];

/**
 * Firefox Bookmarks APIが返すroot nodeを含むBookmark Tree fixtureです。
 */
const firefoxBookmarkTree = [
  {
    children: [
      {
        children: [
          {
            children: [
              {
                id: "201",
                parentId: "200",
                title: "Docs",
                url: githubPullRequestsUrl,
              },
            ],
            id: "200",
            parentId: "menu________",
            title: "Project",
          },
        ],
        id: "menu________",
        parentId: "root________",
        title: "ブックマークメニュー",
      },
      {
        children: [],
        id: "toolbar_____",
        parentId: "root________",
        title: "ブックマークツールバー",
      },
      {
        children: [
          {
            id: "300",
            parentId: "unfiled_____",
            title: "Firefox Release Notes",
            url: firefoxReleaseNotesUrl,
          },
        ],
        id: "unfiled_____",
        parentId: "root________",
        title: "他のブックマーク",
      },
    ],
    id: "root________",
    title: "",
  },
] satisfies readonly RawBookmarkTreeNode[];

/**
 * 正規化後に期待するentry一覧です。
 */
const expectedEntries = [
  {
    childrenCount: 1,
    folderPath: "/Work",
    id: "10",
    kind: "folder",
    parentId: "1",
    title: "Work",
  },
  {
    childrenCount: 1,
    folderPath: "/Work/Admin",
    id: "11",
    kind: "folder",
    parentId: "10",
    title: "Admin",
  },
  {
    childrenCount: 0,
    folderPath: "/Work/Admin",
    id: "42",
    kind: "bookmark",
    parentId: "11",
    title: "Stripe Dashboard",
    url: stripeDashboardUrl,
  },
  {
    childrenCount: 0,
    folderPath: "/",
    id: "43",
    kind: "bookmark",
    parentId: "1",
    title: "GitHub Pull Requests",
    url: githubPullRequestsUrl,
  },
  {
    childrenCount: 1,
    folderPath: "/Other Bookmarks",
    id: "2",
    kind: "folder",
    parentId: "0",
    title: "Other Bookmarks",
  },
  {
    childrenCount: 0,
    folderPath: "/Other Bookmarks",
    id: "44",
    kind: "bookmark",
    parentId: "2",
    title: "Chrome Extensions Docs",
    url: chromeExtensionsDocsUrl,
  },
  {
    childrenCount: 1,
    folderPath: "/Mobile Bookmarks",
    id: "3",
    kind: "folder",
    parentId: "0",
    title: "Mobile Bookmarks",
  },
  {
    childrenCount: 0,
    folderPath: "/Mobile Bookmarks",
    id: "50",
    kind: "bookmark",
    parentId: "3",
    title: "Mobile Search",
    url: mobileSearchUrl,
  },
] satisfies readonly BookmarkEntry[];

/**
 * Firefox Bookmark Tree正規化後に期待するentry一覧です。
 */
const expectedFirefoxEntries = [
  {
    childrenCount: 1,
    folderPath: "/Project",
    id: "200",
    kind: "folder",
    parentId: "menu________",
    title: "Project",
  },
  {
    childrenCount: 0,
    folderPath: "/Project",
    id: "201",
    kind: "bookmark",
    parentId: "200",
    title: "Docs",
    url: githubPullRequestsUrl,
  },
  {
    childrenCount: 0,
    folderPath: "/ブックマークツールバー",
    id: "toolbar_____",
    kind: "folder",
    parentId: "root________",
    title: "ブックマークツールバー",
  },
  {
    childrenCount: 1,
    folderPath: "/他のブックマーク",
    id: "unfiled_____",
    kind: "folder",
    parentId: "root________",
    title: "他のブックマーク",
  },
  {
    childrenCount: 0,
    folderPath: "/他のブックマーク",
    id: "300",
    kind: "bookmark",
    parentId: "unfiled_____",
    title: "Firefox Release Notes",
    url: firefoxReleaseNotesUrl,
  },
] satisfies readonly BookmarkEntry[];

/**
 * Entry ID一覧を取得します。
 * @param {readonly BookmarkEntry[]} entries IDを取り出すentry一覧です。
 * @returns {readonly string[]} entry ID一覧です。
 */
const getEntryIds = (entries: readonly BookmarkEntry[]): readonly string[] =>
  entries.map((entry) => entry.id);

/**
 * Bookmark Tree正規化のテストスイートです。
 */
describe("normalizeBookmarkTree", (): void => {
  /**
   * ChromeのBookmarks BarをCLI rootへ割り当て、他のroot containerをfolderとして正規化できることを検証します。
   */
  it("normalizes bookmark tree nodes into CLI entries", (): void => {
    const bookmarkTree = normalizeBookmarkTree(chromeBookmarkTree);

    expect(bookmarkTree.entries).toStrictEqual(expectedEntries);
  });

  /**
   * Firefoxの先頭root containerをCLI rootへ割り当て、他のroot containerをfolderとして正規化できることを検証します。
   */
  it("normalizes Firefox root containers into explicit CLI folders", (): void => {
    const bookmarkTree = normalizeBookmarkTree(firefoxBookmarkTree);

    expect(bookmarkTree.entries).toStrictEqual(expectedFirefoxEntries);
  });

  /**
   * Bookmarkとfolderを用途別の一覧へ分けて参照できることを検証します。
   */
  it("exposes folders and bookmarks separately", (): void => {
    const bookmarkTree = normalizeBookmarkTree(chromeBookmarkTree);

    expect(getEntryIds(bookmarkTree.folders)).toStrictEqual(["10", "11", "2", "3"]);
    expect(getEntryIds(bookmarkTree.bookmarks)).toStrictEqual(["42", "43", "44", "50"]);
  });

  /**
   * CLI root保存時に使うbrowser root直下container IDを参照できることを検証します。
   */
  it("exposes root bookmark parent id", (): void => {
    const bookmarkTree = normalizeBookmarkTree(chromeBookmarkTree);

    expect(bookmarkTree.rootBookmarkParentId).toBe("1");
  });
});
