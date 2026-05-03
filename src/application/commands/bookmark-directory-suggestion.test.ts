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

/** Bookmark tree fixture。 */
const bookmarkTree = {
  bookmarks: [],
  entries: [workFolderEntry, adminFolderEntry, researchFolderEntry],
  folders: [workFolderEntry, adminFolderEntry, researchFolderEntry],
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
