import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { describe, expect, it } from "vitest";
import { createBookmarkEntryIdTargetInput } from "../../domain/bookmarks/bookmark-entry-id-target";
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

/** 先に見つかる空title Bookmark entry fixture。 */
const firstEmptyTitleBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "empty-1",
  kind: "bookmark",
  parentId: workFolderEntry.id,
  title: "",
  url: "https://first.example.com/",
} satisfies BookmarkEntry;

/** クリック対象の空title Bookmark entry fixture。 */
const secondEmptyTitleBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "empty-2",
  kind: "bookmark",
  parentId: workFolderEntry.id,
  title: "",
  url: "https://second.example.com/",
} satisfies BookmarkEntry;

/** Bookmark tree fixture。 */
const bookmarkTree = {
  bookmarks: [stripeBookmarkEntry],
  entries: [workFolderEntry, ...folderEntries, stripeBookmarkEntry],
  folders: [workFolderEntry, ...folderEntries],
} satisfies BookmarkTree;

/** 空title Bookmarkを含むBookmark tree fixture。 */
const emptyTitleBookmarkTree = {
  bookmarks: [firstEmptyTitleBookmarkEntry, secondEmptyTitleBookmarkEntry],
  entries: [workFolderEntry, firstEmptyTitleBookmarkEntry, secondEmptyTitleBookmarkEntry],
  folders: [workFolderEntry],
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
      `rm ${createBookmarkEntryIdTargetInput(stripeBookmarkEntry.id)}`,
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

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual(
      folderEntries.map((entry) => `rm -r ${createBookmarkEntryIdTargetInput(entry.id)}`),
    );
  });
});

/**
 * Rm command向け空title Bookmark suggestionのテストスイート。
 */
describe("suggestBookmarkDirectoryPaths for empty title rm candidates", (): void => {
  /**
   * 空title Bookmarkが複数ある場合も各候補をentry ID targetに補完することを検証。
   */
  it("uses entry-id completions for empty title bookmarks", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree: emptyTitleBookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm ./",
    });

    expect(suggestions).toStrictEqual([
      {
        commandName: "./",
        completion: `rm ${createBookmarkEntryIdTargetInput(firstEmptyTitleBookmarkEntry.id)}`,
        description: "https://first.example.com/",
      },
      {
        commandName: "./",
        completion: `rm ${createBookmarkEntryIdTargetInput(secondEmptyTitleBookmarkEntry.id)}`,
        description: "https://second.example.com/",
      },
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
    const [firstFolderEntry] = folderEntries;

    if (!firstFolderEntry) {
      throw new TypeError("Missing first folder entry fixture");
    }

    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm -rf ./A",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      `rm -rf ${createBookmarkEntryIdTargetInput(firstFolderEntry.id)}`,
    ]);
  });
});
