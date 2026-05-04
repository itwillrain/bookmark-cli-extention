import type {
  BookmarkCommandFailure,
  BookmarkCommandResult,
  BookmarkCommandSuccess,
  BookmarkRepositoryPort,
} from "./bookmark-use-cases";
import {
  type BookmarkTreeViewEntry,
  listBookmarkTreeViewEntries,
} from "../../domain/bookmarks/bookmark-tree-view";
import { type CurrentDirectory, resolveFolderPath } from "../../domain/bookmarks/current-directory";
import { doesFolderPathExist } from "../../domain/bookmarks/bookmark-directory";

/**
 * Directory tree表示の入力です。
 */
export interface ShowDirectoryTreeInput {
  /**
   * 現在ディレクトリです。
   */
  readonly currentDirectory: CurrentDirectory;
  /**
   * 表示する最大depthです。
   */
  readonly depth: number;
  /**
   * 表示対象path入力です。
   */
  readonly pathInput: string;
  /**
   * Bookmark Tree取得portです。
   */
  readonly repository: BookmarkRepositoryPort;
}

/**
 * Directory tree表示の成功値です。
 */
export interface ShowDirectoryTreeValue {
  /**
   * 表示対象directory pathです。
   */
  readonly directoryPath: CurrentDirectory;
  /**
   * Tree表示用entry一覧です。
   */
  readonly entries: readonly BookmarkTreeViewEntry[];
}

/**
 * Folder未検出のエラーcodeです。
 */
const folderNotFoundErrorCode = "folder_not_found";

/**
 * 成功結果を作ります。
 * @param {TValue} value 成功値です。
 * @returns {BookmarkCommandSuccess<TValue>} 成功結果です。
 */
const createSuccess = <TValue>(value: TValue): BookmarkCommandSuccess<TValue> => ({
  ok: true,
  value,
});

/**
 * Folder未検出の失敗結果を作ります。
 * @param {CurrentDirectory} folderPath 見つからなかったfolder pathです。
 * @returns {BookmarkCommandFailure} Folder未検出の失敗結果です。
 */
const createFolderNotFoundFailure = (folderPath: CurrentDirectory): BookmarkCommandFailure => ({
  errorCode: folderNotFoundErrorCode,
  message: `Folder was not found: ${folderPath}`,
  ok: false,
});

/**
 * 指定directory配下のBookmark Treeをtree表示用entry一覧にします。
 * @param {ShowDirectoryTreeInput} input Directory tree表示の入力です。
 * @returns {Promise<BookmarkCommandResult<ShowDirectoryTreeValue>>} Directory tree表示の実行結果です。
 * @example
 * ```ts
 * const result = await showDirectoryTree({
 *   currentDirectory: "/Work",
 *   depth: 2,
 *   pathInput: "./Admin",
 *   repository,
 * });
 * ```
 */
export const showDirectoryTree = async (
  input: ShowDirectoryTreeInput,
): Promise<BookmarkCommandResult<ShowDirectoryTreeValue>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const directoryPath = resolveFolderPath(input.currentDirectory, input.pathInput);

  if (!doesFolderPathExist(bookmarkTree, directoryPath)) {
    return createFolderNotFoundFailure(directoryPath);
  }

  return createSuccess({
    directoryPath,
    entries: listBookmarkTreeViewEntries(bookmarkTree, directoryPath, input.depth),
  });
};
