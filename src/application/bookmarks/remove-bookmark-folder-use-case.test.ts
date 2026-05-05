import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import type { BookmarkRepositoryPort } from "./bookmark-use-cases";
import { createRecordingOrganizer as createRecordingOrganizerFixture } from "./organize-bookmark-use-case-test-helper";
import { removeBookmark } from "./organize-bookmark-use-case";

/** Work folder entry fixture。 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Archive folder entry fixture。 */
const archiveFolderEntry = {
  childrenCount: 0,
  folderPath: "/Work/Archive",
  id: "11",
  kind: "folder",
  parentId: "10",
  title: "Archive",
} satisfies BookmarkEntry;

/** Other Bookmarks folder entry fixture。 */
const otherBookmarksFolderEntry = {
  childrenCount: 0,
  folderPath: "/Other Bookmarks",
  folderType: "other",
  id: "2",
  kind: "folder",
  parentId: "0",
  title: "Other Bookmarks",
} satisfies BookmarkEntry;

/** Stripe bookmark entry fixture。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Bookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry],
  entries: [workFolderEntry, archiveFolderEntry, stripeBookmarkEntry],
  folders: [workFolderEntry, archiveFolderEntry],
} satisfies BookmarkTree;

/** Folderを含む直前結果一覧fixture。 */
const folderLastResultEntries = [workFolderEntry] as const;

/** Browser管理folderを含む直前結果一覧fixture。 */
const browserManagedFolderLastResultEntries = [otherBookmarksFolderEntry] as const;

/** 対象result number入力。 */
const targetInput = "1";

/** Folder path対象入力。 */
const targetFolderPathInput = "./Archive";

/** Browser管理folder path対象入力。 */
const browserManagedFolderPathInput = "/Other Bookmarks";

/** 現在ディレクトリfixture。 */
const currentDirectory = "/Work";

/**
 * Bookmark Tree repository fixtureを作成。
 * @returns {BookmarkRepositoryPort} Bookmark repository port。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  /**
   * Bookmark Tree fixtureを返す。
   * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
   */
  getBookmarkTree: async (): Promise<BookmarkTree> => {
    await Promise.resolve();

    return bookmarkTree;
  },
});

/**
 * Browser管理folderを含むBookmark Tree repository fixtureを作成。
 * @returns {BookmarkRepositoryPort} Bookmark repository port。
 */
const createBrowserManagedFolderBookmarkRepository = (): BookmarkRepositoryPort => ({
  /**
   * Browser管理folderを含むBookmark Tree fixtureを返す。
   * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
   */
  getBookmarkTree: async (): Promise<BookmarkTree> => {
    await Promise.resolve();

    return {
      ...bookmarkTree,
      entries: [...bookmarkTree.entries, otherBookmarksFolderEntry],
      folders: [...bookmarkTree.folders, otherBookmarksFolderEntry],
    };
  },
});

/**
 * 書き込みを記録するorganizer fixtureを作成。
 * @returns {ReturnType<typeof createRecordingOrganizerFixture>} organizer fixture。
 */
const createRecordingOrganizer = (): ReturnType<typeof createRecordingOrganizerFixture> =>
  createRecordingOrganizerFixture({ archiveFolderEntry, stripeBookmarkEntry });

/** Folder削除guard use caseのテストスイート。 */
describe("removeBookmark folder guard", (): void => {
  /**
   * Rmがfolder対象かつrecursiveなしでは削除しないことを検証。
   */
  it("rejects folder remove without recursive option", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: true,
      lastResultEntries: folderLastResultEntries,
      organizer: recordingOrganizer.organizer,
      recursive: false,
      repository: createBookmarkRepository(),
      targetInput,
    });

    expect(result).toMatchObject({
      errorCode: "invalid_argument",
      ok: false,
    });
    expect(recordingOrganizer.removedFolderTrees).toStrictEqual([]);
  });
});

/** Folder recursive削除use caseのテストスイート。 */
describe("removeBookmark recursive folder", (): void => {
  /**
   * Rmがfolder対象かつrecursiveありでは確認待ち結果を返すことを検証。
   */
  it("returns pending confirmation for recursive folder remove without force", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: false,
      lastResultEntries: folderLastResultEntries,
      organizer: recordingOrganizer.organizer,
      recursive: true,
      repository: createBookmarkRepository(),
      targetInput,
    });

    expect(result).toMatchObject({ ok: true, value: { executed: false } });
    expect(recordingOrganizer.removedFolderTrees).toStrictEqual([]);
  });

  /**
   * Rmがfolder対象かつforceとrecursiveありではsubtreeを削除することを検証。
   */
  it("removes folder tree when forced recursively", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: true,
      lastResultEntries: folderLastResultEntries,
      organizer: recordingOrganizer.organizer,
      recursive: true,
      repository: createBookmarkRepository(),
      targetInput,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.removedFolderTrees).toStrictEqual([{ id: "10" }]);
  });
});

/** Folder path recursive削除use caseのテストスイート。 */
describe("removeBookmark recursive folder by path", (): void => {
  /**
   * Rm -rfがfolder path対象でsubtreeを削除することを検証。
   */
  it("removes folder tree by path when forced recursively", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: true,
      lastResultEntries: [],
      organizer: recordingOrganizer.organizer,
      recursive: true,
      repository: createBookmarkRepository(),
      targetInput: targetFolderPathInput,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.removedFolderTrees).toStrictEqual([{ id: "11" }]);
  });
});

/** Browser管理folder削除guard use caseのテストスイート。 */
describe("removeBookmark browser managed folder guard", (): void => {
  /**
   * Rm -rfがbrowser管理folderを削除せず理由を返すことを検証。
   */
  it("rejects browser managed folder remove with permission_denied", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: true,
      lastResultEntries: browserManagedFolderLastResultEntries,
      organizer: recordingOrganizer.organizer,
      recursive: true,
      repository: createBookmarkRepository(),
      targetInput,
    });

    expect(result).toMatchObject({
      errorCode: "permission_denied",
      ok: false,
    });
    expect(recordingOrganizer.removedFolderTrees).toStrictEqual([]);
  });
});

/** Browser管理folder path削除guard use caseのテストスイート。 */
describe("removeBookmark browser managed folder path guard", (): void => {
  /**
   * Rm -rfがbrowser管理folder path対象でも削除せず理由を返すことを検証。
   */
  it("rejects browser managed folder path remove with permission_denied", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: true,
      lastResultEntries: [],
      organizer: recordingOrganizer.organizer,
      recursive: true,
      repository: createBrowserManagedFolderBookmarkRepository(),
      targetInput: browserManagedFolderPathInput,
    });

    expect(result).toMatchObject({
      errorCode: "permission_denied",
      ok: false,
    });
    expect(recordingOrganizer.removedFolderTrees).toStrictEqual([]);
  });
});
