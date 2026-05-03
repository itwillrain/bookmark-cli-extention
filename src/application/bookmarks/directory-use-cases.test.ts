import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { changeDirectory, listDirectory, printWorkingDirectory } from "./directory-use-cases";
import { describe, expect, it } from "vitest";

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
 * Directory use case testで使うBookmark Treeです。
 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry],
  entries: [workFolderEntry, adminFolderEntry, stripeBookmarkEntry],
  folders: [workFolderEntry, adminFolderEntry],
} satisfies BookmarkTree;

/**
 * Root current directoryです。
 */
const rootCurrentDirectory = "/";

/**
 * Work current directoryです。
 */
const workCurrentDirectory = "/Work";

/**
 * Admin path入力です。
 */
const adminPathInput = "Admin";

/**
 * Missing path入力です。
 */
const missingPathInput = "Missing";

/**
 * 空のpath入力です。
 */
const emptyPathInput = "";

/**
 * 先頭entryのindexです。
 */
const firstEntryIndex = 0;

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
 * 現在ディレクトリのDirectory list use caseテストスイートです。
 */
describe("listDirectory current directory", (): void => {
  /**
   * 現在ディレクトリ直下のentry一覧を返すことを検証します。
   */
  it("lists entries under current directory", async (): Promise<void> => {
    const result = await listDirectory({
      currentDirectory: workCurrentDirectory,
      pathInput: emptyPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.directoryPath).toBe("/Work");
      expect(result.value.entries[firstEntryIndex]?.id).toBe("11");
    }
  });
});

/**
 * Change directoryの空path入力テストスイートです。
 */
describe("changeDirectory empty path input", (): void => {
  /**
   * 空path入力ではroot current directoryへ移動することを検証します。
   */
  it("changes current directory to root", async (): Promise<void> => {
    const result = await changeDirectory({
      currentDirectory: workCurrentDirectory,
      lastResultEntries: [],
      pathInput: emptyPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result).toStrictEqual({
      ok: true,
      value: {
        currentDirectory: rootCurrentDirectory,
      },
    });
  });
});

/**
 * Path指定のDirectory list use caseテストスイートです。
 */
describe("listDirectory path input", (): void => {
  /**
   * 入力pathを現在ディレクトリから解決してentry一覧を返すことを検証します。
   */
  it("lists entries under resolved path", async (): Promise<void> => {
    const result = await listDirectory({
      currentDirectory: workCurrentDirectory,
      pathInput: adminPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.directoryPath).toBe("/Work/Admin");
      expect(result.value.entries).toStrictEqual([]);
    }
  });
});

/**
 * Directory list use caseの異常系テストスイートです。
 */
describe("listDirectory missing folder", (): void => {
  /**
   * 存在しないfolder pathをfolder_not_foundとして扱うことを検証します。
   */
  it("returns folder_not_found for missing folder", async (): Promise<void> => {
    const result = await listDirectory({
      currentDirectory: rootCurrentDirectory,
      pathInput: missingPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.errorCode).toBe("folder_not_found");
    }
  });
});

/**
 * Pwd use caseのテストスイートです。
 */
describe("printWorkingDirectory", (): void => {
  /**
   * 現在ディレクトリを返すことを検証します。
   */
  it("returns current directory", (): void => {
    const result = printWorkingDirectory({ currentDirectory: workCurrentDirectory });

    expect(result).toStrictEqual({
      ok: true,
      value: {
        currentDirectory: "/Work",
      },
    });
  });
});
