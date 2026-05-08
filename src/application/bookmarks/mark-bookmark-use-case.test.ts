import {
  type BookmarkCreatorPort,
  type CreatedBookmarkInput,
  markCurrentTab,
} from "./mark-bookmark-use-case";
import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import type { BookmarkRepositoryPort } from "./bookmark-use-cases";

/** Work folder entry fixture。 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** 既存Stripe bookmark entry fixture。 */
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
  entries: [workFolderEntry, stripeBookmarkEntry],
  folders: [workFolderEntry],
  rootBookmarkParentId: "1",
} satisfies BookmarkTree;

/** CLI起動元タブfixture。 */
const launchContext = {
  tabId: 7,
  title: "Production Admin",
  url: "https://admin.example.com/",
};

/** 作成されたBookmarkを記録するfixture。 */
interface RecordingBookmarkCreator {
  /** Bookmark creator port。 */
  readonly creator: BookmarkCreatorPort;
  /** 作成要求一覧。 */
  readonly createdBookmarks: readonly CreatedBookmarkInput[];
}

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
 * Bookmark creator fixtureを作成。
 * @returns {RecordingBookmarkCreator} Bookmark creator fixture。
 */
const createRecordingBookmarkCreator = (): RecordingBookmarkCreator => {
  const createdBookmarks: CreatedBookmarkInput[] = [];

  return {
    createdBookmarks,
    creator: {
      /**
       * 作成要求を記録する。
       * @param {CreatedBookmarkInput} input 作成要求。
       * @returns {Promise<BookmarkEntry>} 作成済みBookmark。
       */
      createBookmark: async (input: CreatedBookmarkInput): Promise<BookmarkEntry> => {
        createdBookmarks.push(input);
        await Promise.resolve();

        return {
          childrenCount: 0,
          folderPath: "/Work",
          id: "100",
          kind: "bookmark",
          parentId: input.parentId ?? "",
          title: input.title,
          url: input.url,
        };
      },
    },
  };
};

/** Mark current tab保存成功のテストスイート。 */
describe("markCurrentTab creation", (): void => {
  /**
   * 起動元タブを指定folderへ保存できることを検証。
   */
  it("creates bookmark from launch context", async (): Promise<void> => {
    const recordingCreator = createRecordingBookmarkCreator();

    const result = await markCurrentTab({
      allowDuplicate: false,
      creator: recordingCreator.creator,
      currentDirectory: "/",
      launchContext,
      repository: createBookmarkRepository(),
      targetFolderPathInput: "Work",
      titleInput: "",
      titleSpecified: false,
    });

    expect(result.ok).toBe(true);
    expect(recordingCreator.createdBookmarks).toStrictEqual([
      {
        parentId: "10",
        title: "Production Admin",
        url: "https://admin.example.com/",
      },
    ]);
  });
});

/** Mark current tab root保存のテストスイート。 */
describe("markCurrentTab root creation", (): void => {
  /**
   * Root保存時にbrowser root直下の既定containerを明示することを検証。
   */
  it("creates root bookmark with root bookmark parent id", async (): Promise<void> => {
    const recordingCreator = createRecordingBookmarkCreator();

    const result = await markCurrentTab({
      allowDuplicate: false,
      creator: recordingCreator.creator,
      currentDirectory: "/",
      launchContext,
      repository: createBookmarkRepository(),
      targetFolderPathInput: "",
      titleInput: "",
      titleSpecified: false,
    });

    expect(result.ok).toBe(true);
    expect(recordingCreator.createdBookmarks).toStrictEqual([
      {
        parentId: "1",
        title: "Production Admin",
        url: "https://admin.example.com/",
      },
    ]);
  });
});

/** Mark current tab空title保存のテストスイート。 */
describe("markCurrentTab empty title creation", (): void => {
  /**
   * 空titleが明示された場合は起動元タブtitleへfallbackしないことを検証。
   */
  it("creates bookmark with explicit empty title", async (): Promise<void> => {
    const recordingCreator = createRecordingBookmarkCreator();

    const result = await markCurrentTab({
      allowDuplicate: false,
      creator: recordingCreator.creator,
      currentDirectory: "/",
      launchContext,
      repository: createBookmarkRepository(),
      targetFolderPathInput: "",
      titleInput: "",
      titleSpecified: true,
    });

    expect(result.ok).toBe(true);
    expect(recordingCreator.createdBookmarks).toStrictEqual([
      {
        parentId: "1",
        title: "",
        url: "https://admin.example.com/",
      },
    ]);
  });
});

/** Mark current tab起動元tab検証のテストスイート。 */
describe("markCurrentTab launch context validation", (): void => {
  /**
   * 起動元タブがない場合はunsupported_tabを返すことを検証。
   */
  it("returns unsupported_tab when launch context is missing", async (): Promise<void> => {
    const recordingCreator = createRecordingBookmarkCreator();

    const result = await markCurrentTab({
      allowDuplicate: false,
      creator: recordingCreator.creator,
      currentDirectory: "/Work",
      repository: createBookmarkRepository(),
      targetFolderPathInput: "",
      titleInput: "",
      titleSpecified: false,
    });

    expect(result).toMatchObject({
      errorCode: "unsupported_tab",
      ok: false,
    });
    expect(recordingCreator.createdBookmarks).toStrictEqual([]);
  });
});

/** Mark current tab重複検出のテストスイート。 */
describe("markCurrentTab duplicate detection", (): void => {
  /**
   * 保存先に同じURLがある場合はalready_markedを返すことを検証。
   */
  it("returns already_marked for duplicate URL in target folder", async (): Promise<void> => {
    const recordingCreator = createRecordingBookmarkCreator();

    const result = await markCurrentTab({
      allowDuplicate: false,
      creator: recordingCreator.creator,
      currentDirectory: "/Work",
      launchContext: {
        ...launchContext,
        url: "https://dashboard.stripe.com/",
      },
      repository: createBookmarkRepository(),
      targetFolderPathInput: "",
      titleInput: "",
      titleSpecified: false,
    });

    expect(result).toMatchObject({
      errorCode: "already_marked",
      ok: false,
    });
    expect(recordingCreator.createdBookmarks).toStrictEqual([]);
  });
});
