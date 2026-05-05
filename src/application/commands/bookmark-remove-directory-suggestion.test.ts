import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import { suggestBookmarkDirectoryPaths } from "./bookmark-directory-suggestion";

/** Folder候補を多く持つ親folder entry。 */
const workFolderEntry = {
  childrenCount: 9,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Folder title fixture一覧。 */
const folderTitles = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

/**
 * Folder entry fixtureを作成。
 * @param {string} title Folder title。
 * @param {number} index Folder index。
 * @returns {BookmarkEntry} Folder entry fixture。
 */
const createFolderEntry = (title: string, index: number): BookmarkEntry => ({
  childrenCount: 0,
  folderPath: `/Work/${title}`,
  id: `folder-${String(index)}`,
  kind: "folder",
  parentId: workFolderEntry.id,
  title,
});

/** Folder entry fixture一覧。 */
const folderEntries = folderTitles.map((title, index) => createFolderEntry(title, index));

/** Stripe bookmark entry fixture。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "20",
  kind: "bookmark",
  parentId: workFolderEntry.id,
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Bookmark tree fixture。 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry],
  entries: [workFolderEntry, ...folderEntries, stripeBookmarkEntry],
  folders: [workFolderEntry, ...folderEntries],
} satisfies BookmarkTree;

/**
 * Rm command向けpath suggestionの全件巡回テストスイート。
 */
describe("suggestBookmarkDirectoryPaths for rm full candidate list", (): void => {
  /**
   * Folder候補が多い場合でもBookmark候補をTab巡回対象に含めることを検証。
   */
  it("keeps bookmark candidates selectable when rm has many folder candidates", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm ./",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "rm ./A",
      "rm ./B",
      "rm ./C",
      "rm ./D",
      "rm ./E",
      "rm ./F",
      "rm ./G",
      "rm ./H",
      "rm ./Stripe Dashboard",
    ]);
  });
});
