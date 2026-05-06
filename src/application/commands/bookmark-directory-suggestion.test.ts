import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import {
  canSuggestBookmarkDirectoryPaths,
  suggestBookmarkDirectoryPaths,
} from "./bookmark-directory-suggestion";
import { describe, expect, it } from "vitest";

/** Work folder entry。 */
const workFolderEntry = {
  childrenCount: 2,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/** Admin folder entry。 */
const adminFolderEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "11",
  kind: "folder",
  parentId: "10",
  title: "Admin",
} satisfies BookmarkEntry;

/** Research folder entry。 */
const researchFolderEntry = {
  childrenCount: 0,
  folderPath: "/Work/Research",
  id: "12",
  kind: "folder",
  parentId: "10",
  title: "Research",
} satisfies BookmarkEntry;

/** その他のブックマークfolder entry。 */
const otherBookmarksFolderEntry = {
  childrenCount: 0,
  folderPath: "/その他のブックマーク",
  id: "2",
  kind: "folder",
  parentId: "0",
  title: "その他のブックマーク",
} satisfies BookmarkEntry;

/** Eza bookmark entry。 */
const ezaBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work",
  id: "20",
  kind: "bookmark",
  parentId: "10",
  title: "eza",
  url: "https://github.com/eza-community/eza",
} satisfies BookmarkEntry;

/** Stripe bookmark entry。 */
const stripeBookmarkEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "21",
  kind: "bookmark",
  parentId: "11",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/** Bookmark tree fixture。 */
const bookmarkTree = {
  bookmarks: [ezaBookmarkEntry, stripeBookmarkEntry],
  entries: [
    workFolderEntry,
    adminFolderEntry,
    stripeBookmarkEntry,
    researchFolderEntry,
    otherBookmarksFolderEntry,
    ezaBookmarkEntry,
  ],
  folders: [workFolderEntry, adminFolderEntry, researchFolderEntry, otherBookmarksFolderEntry],
} satisfies BookmarkTree;

/**
 * Directory path suggestionのテストスイート。
 */
describe("suggestBookmarkDirectoryPaths", (): void => {
  /**
   * Cd command名だけではdirectory suggestion対象にしないことを検証。
   */
  it("does not suggest before path input starts", (): void => {
    expect(canSuggestBookmarkDirectoryPaths("cd")).toBe(false);
  });

  /**
   * Cd ./ で現在ディレクトリ直下のfolder候補を返すことを検証。
   */
  it("suggests current directory children for cd dot slash input", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "cd ./",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "cd ./Admin",
      "cd ./Research",
    ]);
  });

  /**
   * Cd ./A で現在ディレクトリ直下のfolder候補をprefix filterすることを検証。
   */
  it("filters current directory children by path prefix", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "cd ./A",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual(["cd ./Admin"]);
  });

  /**
   * Ll aliasでもdirectory候補を返すことを検証。
   */
  it("suggests directory paths for ll alias", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "ll -a A",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual(["ll -a Admin"]);
  });
});

/**
 * Root絶対path suggestionのテストスイート。
 */
describe("suggestBookmarkDirectoryPaths root absolute path", (): void => {
  /**
   * Cd / でroot直下のfolder候補を返すことを検証。
   */
  it("suggests root children for cd absolute root input", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "cd /",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "cd /Work",
      "cd /その他のブックマーク",
    ]);
  });

  /**
   * Cd /そ でroot直下のbrowser container folderをprefix filterすることを検証。
   */
  it("suggests root container folder by absolute path prefix", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "cd /そ",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "cd /その他のブックマーク",
    ]);
  });
});

/**
 * Go command向けdirectory path suggestionのテストスイート。
 */
describe("suggestBookmarkDirectoryPaths for go", (): void => {
  /**
   * Go commandでもdirectory候補を返すことを検証。
   */
  it("suggests directory paths for go query prefix", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "go ./",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "go ./Admin",
      "go ./Research",
      "go ./eza",
    ]);
  });

  /**
   * Go commandでは現在ディレクトリ直下のBookmarkをprefix filterして返すことを検証。
   */
  it("suggests bookmark paths for go current directory prefix", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "go ./e",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual(["go ./eza"]);
  });

  /**
   * Go commandではfolder配下のBookmarkをpath prefixで返すことを検証。
   */
  it("suggests bookmark paths under a child folder for go path prefix", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "go ./Admin/S",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "go ./Admin/Stripe Dashboard",
    ]);
  });
});

/**
 * Rm command向けpath suggestionのテストスイート。
 */
describe("suggestBookmarkDirectoryPaths for rm", (): void => {
  /**
   * Rm commandではrecursiveなしで現在ディレクトリ直下のBookmark候補だけを返すことを検証。
   */
  it("suggests bookmark paths for rm path prefix", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm ./",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual(["rm ./eza"]);
  });

  /**
   * Rm commandのrecursive option後ではfolder候補だけを返すことを検証。
   */
  it("suggests folder paths for rm recursive option path prefix", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm -r ./A",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual(["rm -r ./Admin"]);
  });
});

/**
 * Rm command向けnested path suggestionのテストスイート。
 */
describe("suggestBookmarkDirectoryPaths for rm nested path", (): void => {
  /**
   * Rm commandではfolder配下のBookmarkをpath prefixで返すことを検証。
   */
  it("suggests bookmark paths under a child folder for rm path prefix", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm ./Admin/S",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "rm ./Admin/Stripe Dashboard",
    ]);
  });

  /**
   * Rm commandではspaceを含むBookmark title prefixをpathとして扱うことを検証。
   */
  it("keeps spaced bookmark path prefix for rm suggestions", (): void => {
    const suggestions = suggestBookmarkDirectoryPaths({
      bookmarkTree,
      currentDirectory: "/Work",
      inputValue: "rm ./Admin/Stripe D",
    });

    expect(suggestions.map((suggestion) => suggestion.completion)).toStrictEqual([
      "rm ./Admin/Stripe Dashboard",
    ]);
  });
});
