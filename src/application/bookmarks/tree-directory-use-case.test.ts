import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import { showDirectoryTree } from "./tree-directory-use-case";

/**
 * Bookmark Tree取得port fixtureです。
 */
interface BookmarkRepositoryFixture {
  /**
   * Bookmark Treeを取得します。
   */
  readonly getBookmarkTree: () => Promise<BookmarkTree>;
}

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
  childrenCount: 1,
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
 * Invoice bookmarkのentryです。
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
 * Tree use case testで使うBookmark Treeです。
 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry, invoiceBookmarkEntry],
  entries: [
    workFolderEntry,
    adminFolderEntry,
    billingFolderEntry,
    stripeBookmarkEntry,
    invoiceBookmarkEntry,
  ],
  folders: [workFolderEntry, adminFolderEntry, billingFolderEntry],
} satisfies BookmarkTree;

/**
 * Root current directoryです。
 */
const rootCurrentDirectory = "/";

/**
 * Work path入力です。
 */
const workPathInput = "Work";

/**
 * Missing path入力です。
 */
const missingPathInput = "Missing";

/**
 * 2階層のtree depthです。
 */
const twoLevelDepth = 2;

/**
 * 3階層のtree depthです。
 */
const threeLevelDepth = 3;

/**
 * 1階層目の表示depthです。
 */
const firstTreeViewDepth = 1;

/**
 * 2階層目の表示depthです。
 */
const secondTreeViewDepth = 2;

/**
 * 2階層treeの期待depth一覧です。
 */
const twoLevelExpectedDepths = [
  firstTreeViewDepth,
  secondTreeViewDepth,
  firstTreeViewDepth,
] as const;

/**
 * Bookmark Tree fixtureを返します。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixtureです。
 */
const getBookmarkTreeFixture = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/**
 * Bookmark Tree取得port fixtureを作ります。
 * @returns {BookmarkRepositoryFixture} Bookmark Tree取得port fixtureです。
 */
const createBookmarkRepository = (): BookmarkRepositoryFixture => ({
  getBookmarkTree: getBookmarkTreeFixture,
});

/**
 * Directory tree use caseの正常系テストスイートです。
 */
describe("showDirectoryTree valid input", (): void => {
  /**
   * 指定pathとdepthでtree表示用entry一覧を返すことを検証します。
   */
  it("returns tree entries under resolved path", async (): Promise<void> => {
    const result = await showDirectoryTree({
      currentDirectory: rootCurrentDirectory,
      depth: twoLevelDepth,
      directoriesOnly: false,
      pathInput: workPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.directoryPath).toBe("/Work");
      expect(result.value.entries.map((item) => item.entry.id)).toStrictEqual(["11", "12", "42"]);
      expect(result.value.entries.map((item) => item.depth)).toStrictEqual(twoLevelExpectedDepths);
    }
  });

  /**
   * Depthを増やすと深いBookmarkを含めることを検証します。
   */
  it("returns deeper tree entries when depth allows it", async (): Promise<void> => {
    const result = await showDirectoryTree({
      currentDirectory: rootCurrentDirectory,
      depth: threeLevelDepth,
      directoriesOnly: false,
      pathInput: workPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.entries.map((item) => item.entry.id)).toStrictEqual([
        "11",
        "12",
        "44",
        "42",
      ]);
    }
  });
});

/**
 * Directory tree use caseのdirectory限定テストスイートです。
 */
describe("showDirectoryTree directories only input", (): void => {
  /** Directory限定ではBookmarkを含めずfolderだけを返すことを検証します。 */
  it("returns folder entries only for directories only tree", async (): Promise<void> => {
    const result = await showDirectoryTree({
      currentDirectory: rootCurrentDirectory,
      depth: threeLevelDepth,
      directoriesOnly: true,
      pathInput: workPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.entries.map((item) => item.entry.id)).toStrictEqual(["11", "12"]);
    }
  });
});

/**
 * Directory tree use caseの異常系テストスイートです。
 */
describe("showDirectoryTree missing folder", (): void => {
  /**
   * 存在しないfolder pathをfolder_not_foundとして扱うことを検証します。
   */
  it("returns folder_not_found for missing folder", async (): Promise<void> => {
    const result = await showDirectoryTree({
      currentDirectory: rootCurrentDirectory,
      depth: twoLevelDepth,
      directoriesOnly: false,
      pathInput: missingPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.errorCode).toBe("folder_not_found");
    }
  });
});
