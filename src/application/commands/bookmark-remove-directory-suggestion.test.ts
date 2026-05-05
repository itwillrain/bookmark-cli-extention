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
   * RecursiveなしではFolder候補が多い場合でもBookmark候補だけをTab巡回対象にすることを検証。
   */
  it("keeps only bookmark candidates selectable without recursive option", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm ./",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "rm ./Stripe Dashboard",
    ]);
  });

  /**
   * RecursiveありではBookmark候補を混ぜずFolder候補だけをTab巡回対象にすることを検証。
   */
  it("keeps only folder candidates selectable with recursive option", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm -r ./",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "rm -r ./A",
      "rm -r ./B",
      "rm -r ./C",
      "rm -r ./D",
      "rm -r ./E",
      "rm -r ./F",
      "rm -r ./G",
      "rm -r ./H",
    ]);
  });
});

/**
 * Rm command向けcombined option suggestionのテストスイート。
 */
describe("suggestBookmarkDirectoryPaths for rm combined option", (): void => {
  /**
   * Recursive force optionでもFolder候補だけをTab巡回対象にすることを検証。
   */
  it("keeps only folder candidates selectable with recursive force option", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm -rf ./A",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual(["rm -rf ./A"]);
  });
});
