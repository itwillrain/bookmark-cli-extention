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
      preview: false,
      repository: createBookmarkRepository(),
      yes: false,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.createdFolders).toStrictEqual([{ parentId: "10", title: "Tools" }]);
  });
});

/** Move use caseのテストスイート。 */
describe("moveBookmark", (): void => {
  /**
   * Mv previewで書き込みせずpreviewを返すことを検証。
   */
  it("previews move without writing", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await moveBookmark({
      currentDirectory,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      preview: true,
      repository: createBookmarkRepository(),
      targetFolderPathInput,
      targetInput,
      yes: false,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.movedEntries).toStrictEqual([]);

    if (result.ok) {
      expect(result.value.preview.description).toBe(
        "move Stripe Dashboard: /Work/Admin -> /Work/Archive",
      );
    }
  });

  /**
   * Mvを確認済みoptionで実行できることを検証。
   */
  it("moves bookmark when confirmed", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await moveBookmark({
      currentDirectory,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      preview: false,
      repository: createBookmarkRepository(),
      targetFolderPathInput,
      targetInput,
      yes: true,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.movedEntries).toStrictEqual([{ id: "42", parentId: "11" }]);
  });
});

/** Remove use caseのテストスイート。 */
describe("removeBookmark", (): void => {
  /**
   * Rmが確認なしではconfirmation_requiredを返すことを検証。
   */
  it("requires confirmation for remove", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      preview: false,
      repository: createBookmarkRepository(),
      targetInput,
      yes: false,
    });

    expect(result).toMatchObject({ errorCode: "confirmation_required", ok: false });
    expect(recordingOrganizer.removedEntries).toStrictEqual([]);
  });

  /**
   * Rmを確認済みoptionで実行できることを検証。
   */
  it("removes bookmark when confirmed", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      preview: false,
      repository: createBookmarkRepository(),
      targetInput,
      yes: true,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.removedEntries).toStrictEqual([{ id: "42" }]);
  });
});

/** Rename use caseのテストスイート。 */
describe("renameBookmark", (): void => {
  /**
   * Renameが確認なしではconfirmation_requiredを返すことを検証。
   */
  it("requires confirmation for rename", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await renameBookmark({
      currentDirectory,
      lastResultEntries,
      organizer: recordingOrganizer.organizer,
      preview: false,
      repository: createBookmarkRepository(),
      targetInput,
      titleInput: renamedTitleInput,
      yes: false,
    });

    expect(result).toMatchObject({ errorCode: "confirmation_required", ok: false });
    expect(recordingOrganizer.renamedEntries).toStrictEqual([]);
  });
});
