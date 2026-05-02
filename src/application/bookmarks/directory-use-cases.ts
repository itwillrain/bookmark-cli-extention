import type {
  BookmarkCommandFailure,
  BookmarkCommandResult,
  BookmarkCommandSuccess,
  BookmarkRepositoryPort,
} from "./bookmark-use-cases";
import { type CurrentDirectory, resolveFolderPath } from "../../domain/bookmarks/current-directory";
import {
  doesFolderPathExist,
  listDirectoryEntries,
} from "../../domain/bookmarks/bookmark-directory";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";

/**
 * Directory listの入力です。
 */
export interface ListDirectoryInput {
  /**
   * 現在ディレクトリです。
   */
  readonly currentDirectory: CurrentDirectory;
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
 * Directory listの成功値です。
 */
export interface ListDirectoryValue {
  /**
   * 表示対象directory pathです。
   */
  readonly directoryPath: CurrentDirectory;
  /**
   * Directory直下のentry一覧です。
   */
  readonly entries: readonly BookmarkEntry[];
}

/**
 * Pwdの入力です。
 */
export interface PrintWorkingDirectoryInput {
  /**
   * 現在ディレクトリです。
   */
  readonly currentDirectory: CurrentDirectory;
}

/**
 * Pwdの成功値です。
 */
export interface PrintWorkingDirectoryValue {
  /**
   * 現在ディレクトリです。
   */
  readonly currentDirectory: CurrentDirectory;
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
 * 現在ディレクトリまたは指定pathのentry一覧を返します。
 * @param {ListDirectoryInput} input Directory listの入力です。
 * @returns {Promise<BookmarkCommandResult<ListDirectoryValue>>} Directory listの実行結果です。
 */
export const listDirectory = async (
  input: ListDirectoryInput,
): Promise<BookmarkCommandResult<ListDirectoryValue>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const directoryPath = resolveFolderPath(input.currentDirectory, input.pathInput);

  if (!doesFolderPathExist(bookmarkTree, directoryPath)) {
    return createFolderNotFoundFailure(directoryPath);
  }

  return createSuccess({
    directoryPath,
    entries: listDirectoryEntries(bookmarkTree, directoryPath),
  });
};

/**
 * 現在ディレクトリを返します。
 * @param {PrintWorkingDirectoryInput} input Pwdの入力です。
 * @returns {BookmarkCommandResult<PrintWorkingDirectoryValue>} Pwdの実行結果です。
 */
export const printWorkingDirectory = (
  input: PrintWorkingDirectoryInput,
): BookmarkCommandResult<PrintWorkingDirectoryValue> =>
  createSuccess({ currentDirectory: input.currentDirectory });
