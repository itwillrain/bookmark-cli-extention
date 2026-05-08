import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import type { BookmarkRepositoryPort } from "./bookmark-use-cases";
import { createBookmarkEntryIdTargetInput } from "../../domain/bookmarks/bookmark-entry-id-target";
import { createRecordingOrganizer as createRecordingOrganizerFixture } from "./organize-bookmark-use-case-test-helper";
import { removeBookmark } from "./organize-bookmark-use-case";

/** Work folder entry fixture。 */
const workFolderEntry = {
  childrenCount: 2,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** 先に見つかる空title Bookmark fixture。 */
const firstEmptyTitleBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "51",
  kind: "bookmark",
  parentId: "10",
  title: "",
  url: "https://first.example.com/",
} satisfies BookmarkEntry;

/** 削除対象の空title Bookmark fixture。 */
const secondEmptyTitleBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "52",
  kind: "bookmark",
  parentId: "10",
  title: "",
  url: "https://second.example.com/",
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

/** Bookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [firstEmptyTitleBookmarkEntry, secondEmptyTitleBookmarkEntry],
  entries: [workFolderEntry, firstEmptyTitleBookmarkEntry, secondEmptyTitleBookmarkEntry],
  folders: [workFolderEntry],
} satisfies BookmarkTree;

/** 現在ディレクトリfixture。 */
const currentDirectory = "/Work";

/** 削除対象のentry ID target入力。 */
const secondEntryIdTargetInput = createBookmarkEntryIdTargetInput(secondEmptyTitleBookmarkEntry.id);

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
  createRecordingOrganizerFixture({
    archiveFolderEntry,
    stripeBookmarkEntry: secondEmptyTitleBookmarkEntry,
  });

/** Entry ID target削除use caseのテストスイート。 */
describe("removeBookmark by entry-id target", (): void => {
  /**
   * 空title Bookmarkが複数ある場合もentry IDで選んだBookmarkだけ削除することを検証。
   */
  it("removes the exact bookmark selected by entry-id target", async (): Promise<void> => {
    const recordingOrganizer = createRecordingOrganizer();

    const result = await removeBookmark({
      currentDirectory,
      force: true,
      lastResultEntries: [],
      organizer: recordingOrganizer.organizer,
      recursive: false,
      repository: createBookmarkRepository(),
      targetInput: secondEntryIdTargetInput,
    });

    expect(result.ok).toBe(true);
    expect(recordingOrganizer.removedEntries).toStrictEqual([
      { id: secondEmptyTitleBookmarkEntry.id },
    ]);
  });
});
