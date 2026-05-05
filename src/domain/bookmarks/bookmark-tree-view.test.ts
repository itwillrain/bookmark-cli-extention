import type { BookmarkEntry, BookmarkTree } from "./bookmark-tree";
import { describe, expect, it } from "vitest";
import {
  listBookmarkTreeViewEntries,
  listBookmarkTreeViewEntriesWithOptions,
} from "./bookmark-tree-view";

/**
 * Work folderのentryです。
 */
const workFolderEntry = {
  childrenCount: 3,
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
  childrenCount: 2,
  folderPath: "/Work/Admin",
  id: "11",
  kind: "folder",
  parentId: "10",
  title: "Admin",
} satisfies BookmarkEntry;

/**
 * Billing folderのentryです。
 */
const billingFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work/Admin/Billing",
  id: "12",
  kind: "folder",
  parentId: "11",
  title: "Billing",
} satisfies BookmarkEntry;

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
 * GitHub PullsのBookmark Entryです。
 */
const githubBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "43",
  kind: "bookmark",
  parentId: "11",
  title: "GitHub Pulls",
  url: "https://github.com/pulls",
} satisfies BookmarkEntry;

/**
 * InvoiceのBookmark Entryです。
 */
const invoiceBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin/Billing",
  id: "44",
  kind: "bookmark",
  parentId: "12",
  title: "Invoice",
  url: "https://billing.example.com/invoice",
} satisfies BookmarkEntry;

/**
 * Tree view testで使うBookmark Treeです。
 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry, githubBookmarkEntry, invoiceBookmarkEntry],
  entries: [
    workFolderEntry,
    adminFolderEntry,
    billingFolderEntry,
    stripeBookmarkEntry,
    githubBookmarkEntry,
    invoiceBookmarkEntry,
  ],
  folders: [workFolderEntry, adminFolderEntry, billingFolderEntry],
} satisfies BookmarkTree;

/**
 * Work folder pathです。
 */
const workFolderPath = "/Work";

/**
 * 2階層のtree depthです。
 */
const twoLevelDepth = 2;

/**
 * 3階層のtree depthです。
 */
const threeLevelDepth = 3;

/**
 * 0階層のtree depthです。
 */
const zeroLevelDepth = 0;

/**
 * 1階層目の表示depthです。
 */
const firstTreeViewDepth = 1;

/**
 * 2階層目の表示depthです。
 */
const secondTreeViewDepth = 2;

/**
 * 3階層目の表示depthです。
 */
const thirdTreeViewDepth = 3;

/**
 * 2階層treeの期待depth一覧です。
 */
const twoLevelExpectedDepths = [
  firstTreeViewDepth,
  secondTreeViewDepth,
  secondTreeViewDepth,
  firstTreeViewDepth,
] as const;

/**
 * 2階層treeの期待guide一覧です。
 */
const twoLevelExpectedGuides = ["├── ", "│   ├── ", "│   └── ", "└── "] as const;

/**
 * 3階層treeの期待depth一覧です。
 */
const threeLevelExpectedDepths = [
  firstTreeViewDepth,
  secondTreeViewDepth,
  thirdTreeViewDepth,
  secondTreeViewDepth,
  firstTreeViewDepth,
] as const;

/**
 * 3階層treeの期待guide一覧です。
 */
const threeLevelExpectedGuides = ["├── ", "│   ├── ", "│   │   └── ", "│   └── ", "└── "] as const;

/**
 * Directoryだけを表示する2階層treeの期待guide一覧です。
 */
const foldersOnlyExpectedGuides = ["└── ", "    └── "] as const;

/**
 * Tree view entry一覧からid一覧を取り出します。
 * @param {ReturnType<typeof listBookmarkTreeViewEntries>} entries Tree view entry一覧です。
 * @returns {readonly string[]} entry id一覧です。
 */
const getTreeViewEntryIds = (
  entries: ReturnType<typeof listBookmarkTreeViewEntries>,
): readonly string[] => entries.map((item) => item.entry.id);

/**
 * Bookmark tree viewのテストスイートです。
 */
describe("listBookmarkTreeViewEntries", (): void => {
  /**
   * 指定階層までfolder-first順のflat listを返すことを検証します。
   */
  it("lists nested tree entries up to max depth", (): void => {
    const entries = listBookmarkTreeViewEntries(bookmarkTree, workFolderPath, twoLevelDepth);

    expect(getTreeViewEntryIds(entries)).toStrictEqual(["11", "12", "43", "42"]);
    expect(entries.map((item) => item.depth)).toStrictEqual(twoLevelExpectedDepths);
    expect(entries.map((item) => item.guide)).toStrictEqual(twoLevelExpectedGuides);
  });

  /**
   * Depthを増やすと深い階層のBookmarkを含めることを検証します。
   */
  it("includes deeper entries when max depth allows it", (): void => {
    const entries = listBookmarkTreeViewEntries(bookmarkTree, workFolderPath, threeLevelDepth);

    expect(getTreeViewEntryIds(entries)).toStrictEqual(["11", "12", "44", "43", "42"]);
    expect(entries.map((item) => item.depth)).toStrictEqual(threeLevelExpectedDepths);
    expect(entries.map((item) => item.guide)).toStrictEqual(threeLevelExpectedGuides);
  });

  /**
   * Directory限定ではbookmarkを除外してguideを作り直すことを検証します。
   */
  it("lists folder entries only with directory guides", (): void => {
    const entries = listBookmarkTreeViewEntriesWithOptions({
      bookmarkTree,
      directoryPath: workFolderPath,
      maxDepth: twoLevelDepth,
      options: { directoriesOnly: true },
    });

    expect(getTreeViewEntryIds(entries)).toStrictEqual(["11", "12"]);
    expect(entries.map((item) => item.guide)).toStrictEqual(foldersOnlyExpectedGuides);
  });

  /**
   * 1未満のdepthではentryを返さないことを検証します。
   */
  it("returns no entries for depth below minimum", (): void => {
    expect(listBookmarkTreeViewEntries(bookmarkTree, workFolderPath, zeroLevelDepth)).toStrictEqual(
      [],
    );
  });
});
