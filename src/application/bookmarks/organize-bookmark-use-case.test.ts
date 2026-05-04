import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import {
  makeDirectory,
  moveBookmark,
  removeBookmark,
  renameBookmark,
} from "./organize-bookmark-use-case";
import type { BookmarkRepositoryPort } from "./bookmark-use-cases";
import { createRecordingOrganizer as createRecordingOrganizerFixture } from "./organize-bookmark-use-case-test-helper";

/** Work folder entry fixture。 */
const workFolderEntry = {
  childrenCount: 2,
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

/** Stripe bookmark entry fixture。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "42",
  kind: "bookmark",
  parentId: "12",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Bookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry],
  entries: [workFolderEntry, archiveFolderEntry, stripeBookmarkEntry],
  folders: [workFolderEntry, archiveFolderEntry],
} satisfies BookmarkTree;

/** 直前結果一覧fixture。 */
const lastResultEntries = [stripeBookmarkEntry] as const;

/** 対象result number入力。 */
const targetInput = "1";

/** 移動先folder path入力。 */
const targetFolderPathInput = "Archive";

/** 作成するfolder path入力。 */
const createFolderPathInput = "Tools";

/** Root直下へ作成するfolder path入力。 */
const createRootFolderPathInput = "/Project";

/** 変更後title入力。 */
const renamedTitleInput = "GitHub Pull Requests";

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
 * 書き込みを記録するorganizer fixtureを作成。
 * @returns {ReturnType<typeof createRecordingOrganizerFixture>} organizer fixture。
 */
const createRecordingOrganizer = (): ReturnType<typeof createRecordingOrganizerFixture> =>
  createRecordingOrganizerFixture({ archiveFolderEntry, stripeBookmarkEntry });

/** Mkdir use caseのテストスイート。 */
describe("makeDirectory", (): void => {
  /**
   * Mkdirでfolderを作成できることを検証。
   */
  it("creates folder by mkdir", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await makeDirectory({
      currentDirectory,
      organizer: recordingOrganizer.organizer,
      pathInput: createFolderPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.createdFolders).toStrictEqual([{ parentId: "10", title: "Tools" }]);
  });

  /**
   * Mkdirでroot直下のfolderをブラウザ既定の保存先へ作成することを検証。
   */
  it("creates root folder without root parent id", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await makeDirectory({
      currentDirectory,
      organizer: recordingOrganizer.organizer,
      pathInput: createRootFolderPathInput,
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.createdFolders).toStrictEqual([{ title: "Project" }]);
  });
});

/** Move use caseのテストスイート。 */
describe("moveBookmark", (): void => {
  /**
   * MvでBookmarkを移動できることを検証。
   */
  it("moves bookmark", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await moveBookmark({
      currentDirectory,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      repository: createBookmarkRepository(),
      targetFolderPathInput,
      targetInput,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.movedEntries).toStrictEqual([{ id: "42", parentId: "11" }]);
  });
});

/** Remove use caseのテストスイート。 */
describe("removeBookmark", (): void => {
  /**
   * Rmがforceなしでは確認待ち結果を返すことを検証。
   */
  it("returns pending confirmation for remove without force", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: false,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      repository: createBookmarkRepository(),
      targetInput,
    });

    expect(result).toMatchObject({ ok: true, value: { executed: false } });
    expect(recordingOrganizer.removedEntries).toStrictEqual([]);
  });

  /**
   * Rmをforce optionで実行できることを検証。
   */
  it("removes bookmark when forced", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: true,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      repository: createBookmarkRepository(),
      targetInput,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.removedEntries).toStrictEqual([{ id: "42" }]);
  });
});

/** Rename use caseのテストスイート。 */
describe("renameBookmark", (): void => {
  /**
   * RenameでBookmark名を変更できることを検証。
   */
  it("renames bookmark", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await renameBookmark({
      currentDirectory,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      repository: createBookmarkRepository(),
      targetInput,
      titleInput: renamedTitleInput,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.renamedEntries).toStrictEqual([
      { id: "42", title: renamedTitleInput },
    ]);
  });
});
