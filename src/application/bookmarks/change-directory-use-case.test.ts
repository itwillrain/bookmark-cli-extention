import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import { changeDirectory } from "./directory-use-cases";

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
 * その他のブックマークfolderのentryです。
 */
const otherBookmarksFolderEntry = {
  childrenCount: 0,
  folderPath: "/その他のブックマーク",
  id: "2",
  kind: "folder",
  parentId: "0",
  title: "その他のブックマーク",
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
  entries: [workFolderEntry, adminFolderEntry, otherBookmarksFolderEntry, stripeBookmarkEntry],
  folders: [workFolderEntry, adminFolderEntry, otherBookmarksFolderEntry],
} satisfies BookmarkTree;

/**
 * Work current directoryです。
 */
const workCurrentDirectory = "/Work";

/**
 * Admin path入力です。
 */
const adminPathInput = "Admin";

/**
 * その他のブックマークpath入力です。
 */
const otherBookmarksPathInput = "/その他のブックマーク";

/**
 * Missing path入力です。
 */
const missingPathInput = "Missing";

/**
 * 直前結果の2番目を指す入力です。
 */
const secondResultInput = "2";

/**
 * 直前結果の1番目を指す入力です。
 */
const firstResultInput = "1";

/**
 * 直前結果entry一覧です。
 */
const lastResultEntries = [stripeBookmarkEntry, adminFolderEntry] as const;

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
 * Cd path指定のuse caseテストスイートです。
 */
describe("changeDirectory path input", (): void => {
  /**
   * 現在ディレクトリから相対pathでfolderへ移動できることを検証します。
   */
  it("changes current directory by relative folder path", async (): Promise<void> => {
    const result = await changeDirectory({
      currentDirectory: workCurrentDirectory,
      lastResultEntries,
      pathInput: adminPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result).toStrictEqual({
      ok: true,
      value: {
        currentDirectory: "/Work/Admin",
      },
    });
  });

  /**
   * 存在しないfolder pathをfolder_not_foundとして扱うことを検証します。
   */
  it("returns folder_not_found for missing folder path", async (): Promise<void> => {
    const result = await changeDirectory({
      currentDirectory: workCurrentDirectory,
      lastResultEntries,
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
 * Cd root container path指定のuse caseテストスイートです。
 */
describe("changeDirectory root container path input", (): void => {
  /**
   * Root直下のbrowser container folderへ移動できることを検証します。
   */
  it("changes current directory to root container folder", async (): Promise<void> => {
    const result = await changeDirectory({
      currentDirectory: workCurrentDirectory,
      lastResultEntries,
      pathInput: otherBookmarksPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result).toStrictEqual({
      ok: true,
      value: {
        currentDirectory: "/その他のブックマーク",
      },
    });
  });
});

/**
 * Cd番号指定のuse caseテストスイートです。
 */
describe("changeDirectory result number input", (): void => {
  /**
   * 直前結果番号からfolderへ移動できることを検証します。
   */
  it("changes current directory by folder result number", async (): Promise<void> => {
    const result = await changeDirectory({
      currentDirectory: workCurrentDirectory,
      lastResultEntries,
      pathInput: secondResultInput,
      repository: createBookmarkRepository(),
    });

    expect(result).toStrictEqual({
      ok: true,
      value: {
        currentDirectory: "/Work/Admin",
      },
    });
  });

  /**
   * Bookmarkを指す番号指定をnot_foundとして扱うことを検証します。
   */
  it("returns not_found when result number points to bookmark", async (): Promise<void> => {
    const result = await changeDirectory({
      currentDirectory: workCurrentDirectory,
      lastResultEntries,
      pathInput: firstResultInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.errorCode).toBe("not_found");
    }
  });
});
