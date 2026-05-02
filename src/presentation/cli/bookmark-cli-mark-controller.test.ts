import {
  type BookmarkCliCommandDependencies,
  executeBookmarkCliCommand,
} from "./bookmark-cli-controller";
import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import { createInitialExtensionState } from "../../domain/storage/extension-state";

/** Work folder entry fixture。 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** 作成済みBookmark entry fixture。 */
const productionAdminEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "100",
  kind: "bookmark",
  parentId: "10",
  title: "Production Admin",
  url: "https://admin.example.com/",
} satisfies BookmarkEntry;

/** Bookmark Tree fixture。 */
const bookmarkTree = {
  bookmarks: [],
  entries: [workFolderEntry],
  folders: [workFolderEntry],
} satisfies BookmarkTree;

/** Mark command入力。 */
const markInput = "mark --to Work";

/** 先頭result entry index。 */
const firstResultEntryIndex = 0;

/** 初期拡張状態fixture。 */
const initialExtensionState = createInitialExtensionState();

/** Controller dependencies fixture。 */
const commandDependencies = {
  creator: {
    /**
     * 作成済みBookmark entry fixtureを返す。
     * @returns {Promise<BookmarkEntry>} 作成済みBookmark entry fixture。
     */
    createBookmark: async (): Promise<BookmarkEntry> => {
      await Promise.resolve();

      return productionAdminEntry;
    },
  },
  currentDirectory: "/",
  extensionState: initialExtensionState,
  lastResultEntries: [],
  launchContext: {
    tabId: 7,
    title: "Production Admin",
    url: "https://admin.example.com/",
  },
  opener: {
    /**
     * 何もしないURL opener。
     * @returns {Promise<void>} 完了Promise。
     */
    openBookmarkUrl: async (): Promise<void> => {
      await Promise.resolve();
    },
  },
  repository: {
    /**
     * Bookmark Tree fixtureを返す。
     * @returns {Promise<BookmarkTree>} Bookmark Tree fixture。
     */
    getBookmarkTree: async (): Promise<BookmarkTree> => {
      await Promise.resolve();

      return bookmarkTree;
    },
  },
} satisfies BookmarkCliCommandDependencies;

/** Bookmark保存系CLI controllerのテストスイート。 */
describe("executeBookmarkCliCommand mark commands", (): void => {
  /**
   * Mark commandで起動元タブをBookmarkとして保存できることを検証します。
   */
  it("marks launch context tab", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(markInput, commandDependencies);

    expect(state.statusText).toBe("Marked Production Admin");
    expect(state.lastResultEntries[firstResultEntryIndex]?.title).toBe("Production Admin");
  });
});
