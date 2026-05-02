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
        id: "1",
        parentId: "0",
        title: "Bookmarks Bar",
      },
      {
        children: [],
        id: "2",
        parentId: "0",
        title: "Other Bookmarks",
      },
    ],
    id: "0",
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
] satisfies readonly BookmarkEntry[];

/**
 * Entry ID一覧を取得します。
 * @param {readonly BookmarkEntry[]} entries IDを取り出すentry一覧です。
 * @returns {readonly string[]} entry ID一覧です。
 */
const getEntryIds = (entries: readonly BookmarkEntry[]): readonly string[] => {
  const entryIds: string[] = [];

  for (const entry of entries) {
    entryIds.push(entry.id);
  }

  return entryIds;
};

/**
 * Bookmark Tree正規化のテストスイートです。
 */
describe("normalizeBookmarkTree", (): void => {
  /**
   * Chromeのroot containerをCLIのfolderから除外し、folderとBookmarkを平坦化できることを検証します。
   */
  it("normalizes bookmark tree nodes into CLI entries", (): void => {
    const bookmarkTree = normalizeBookmarkTree(chromeBookmarkTree);

    expect(bookmarkTree.entries).toStrictEqual(expectedEntries);
  });

  /**
   * Bookmarkとfolderを用途別の一覧へ分けて参照できることを検証します。
   */
  it("exposes folders and bookmarks separately", (): void => {
    const bookmarkTree = normalizeBookmarkTree(chromeBookmarkTree);

    expect(getEntryIds(bookmarkTree.folders)).toStrictEqual(["10", "11"]);
    expect(getEntryIds(bookmarkTree.bookmarks)).toStrictEqual(["42", "43"]);
  });
});
