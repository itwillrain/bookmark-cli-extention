import type {
  BookmarkCommandFailure,
  BookmarkCommandResult,
  BookmarkCommandSuccess,
  BookmarkRepositoryPort,
} from "./bookmark-use-cases";
import {
  type CurrentDirectory,
  currentDirectoryRoot,
  resolveFolderPath,
} from "../../domain/bookmarks/current-directory";
import {
  doesFolderPathExist,
  listDirectoryEntries,
} from "../../domain/bookmarks/bookmark-directory";
import {
  isResultNumberInput,
  resolveEntryByResultNumber,
} from "../../domain/bookmarks/result-selection";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";

/**
 * Directory listの入力です。
 */
export interface ListDirectoryInput {
  /**
   * Dot始まりのentryも表示するかです。
   */
  readonly all: boolean;
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
 * Change directoryの入力です。
 */
export interface ChangeDirectoryInput {
  /**
   * 現在ディレクトリです。
   */
  readonly currentDirectory: CurrentDirectory;
  /**
   * 直前結果一覧です。
   */
  readonly lastResultEntries: readonly BookmarkEntry[];
  /**
   * 移動先pathまたは直前結果番号です。
   */
  readonly pathInput: string;
  /**
   * Bookmark Tree取得portです。
   */
  readonly repository: BookmarkRepositoryPort;
}

/**
 * Change directoryの成功値です。
 */
export interface ChangeDirectoryValue {
  /**
   * 移動後の現在ディレクトリです。
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
 * 候補未検出のエラーcodeです。
 */
const notFoundErrorCode = "not_found";

/**
 * 空のpath入力です。
 */
const emptyPathInput = "";

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
 * 候補未検出の失敗結果を作ります。
 * @param {string} pathInput 解決できなかったpathまたは番号入力です。
 * @returns {BookmarkCommandFailure} 候補未検出の失敗結果です。
 */
const createNotFoundFailure = (pathInput: string): BookmarkCommandFailure => ({
  errorCode: notFoundErrorCode,
  message: `Directory target was not found: ${pathInput}`,
  ok: false,
});

/**
 * Entryがfolder entryかを判定します。
 * @param {BookmarkEntry} entry 判定対象のentryです。
 * @returns {boolean} folder entryならtrueです。
 */
const isFolderEntry = (entry: BookmarkEntry): boolean => entry.kind === "folder";

/**
 * 直前結果番号から移動先directory pathを解決します。
 * @param {ChangeDirectoryInput} input Change directoryの入力です。
 * @returns {BookmarkCommandResult<ChangeDirectoryValue>} Change directoryの実行結果です。
 */
const changeDirectoryByResultNumber = (
  input: ChangeDirectoryInput,
): BookmarkCommandResult<ChangeDirectoryValue> => {
  const targetEntryResolution = resolveEntryByResultNumber(
    input.lastResultEntries,
    input.pathInput,
  );

  if (!targetEntryResolution.ok || !isFolderEntry(targetEntryResolution.entry)) {
    return createNotFoundFailure(input.pathInput);
  }

  return createSuccess({ currentDirectory: targetEntryResolution.entry.folderPath });
};

/**
 * Cd commandのpath入力を移動先folder pathへ解決します。
 * @param {CurrentDirectory} currentDirectory 現在ディレクトリです。
 * @param {string} pathInput 移動先path入力です。
 * @returns {CurrentDirectory} 解決済み移動先folder pathです。
 */
const resolveChangeDirectoryPath = (
  currentDirectory: CurrentDirectory,
  pathInput: string,
): CurrentDirectory => {
  if (pathInput.trim() === emptyPathInput) {
    return currentDirectoryRoot;
  }

  return resolveFolderPath(currentDirectory, pathInput);
};

/**
 * Path入力から移動先directory pathを解決します。
 * @param {ChangeDirectoryInput} input Change directoryの入力です。
 * @returns {Promise<BookmarkCommandResult<ChangeDirectoryValue>>} Change directoryの実行結果です。
 */
const changeDirectoryByPath = async (
  input: ChangeDirectoryInput,
): Promise<BookmarkCommandResult<ChangeDirectoryValue>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const targetFolderPath = resolveChangeDirectoryPath(input.currentDirectory, input.pathInput);

  if (!doesFolderPathExist(bookmarkTree, targetFolderPath)) {
    return createFolderNotFoundFailure(targetFolderPath);
  }

  return createSuccess({ currentDirectory: targetFolderPath });
};

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
    entries: listDirectoryEntries(bookmarkTree, directoryPath, { all: input.all }),
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

/**
 * 現在ディレクトリを移動します。
 * @param {ChangeDirectoryInput} input Change directoryの入力です。
 * @returns {Promise<BookmarkCommandResult<ChangeDirectoryValue>>} Change directoryの実行結果です。
 */
export const changeDirectory = async (
  input: ChangeDirectoryInput,
): Promise<BookmarkCommandResult<ChangeDirectoryValue>> => {
  if (isResultNumberInput(input.pathInput)) {
    return changeDirectoryByResultNumber(input);
  }

  const result = await changeDirectoryByPath(input);

  return result;
};
