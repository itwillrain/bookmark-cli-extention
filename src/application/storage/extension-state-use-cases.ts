import type {
  BookmarkCommandFailure,
  BookmarkCommandResult,
  BookmarkCommandSuccess,
  BookmarkRepositoryPort,
} from "../bookmarks/bookmark-use-cases";
import { type ExtensionState, appendCommandHistory } from "../../domain/storage/extension-state";
import {
  sanitizeExtensionStateForBookmarkTree,
  updateCurrentDirectory,
} from "../../domain/storage/extension-state-cleanup";
import type { CurrentDirectory } from "../../domain/bookmarks/current-directory";
import type { ExtensionStateStoragePort } from "./extension-state-ports";

/** 現在日時を返すport。 */
export type NowProvider = () => string;

/** 拡張状態読み込み入力。 */
export interface LoadExtensionStateInput {
  /** 現在日時を返すport。 */
  readonly now: NowProvider;
  /** Bookmark Tree repository port。 */
  readonly repository: BookmarkRepositoryPort;
  /** Extension state storage port。 */
  readonly storage: ExtensionStateStoragePort;
}

/** Command実行後の拡張状態保存入力。 */
export interface PersistCommandExecutionStateInput {
  /** 実行したcommand入力。 */
  readonly commandInput: string;
  /** 実行後の現在ディレクトリ。 */
  readonly currentDirectory: CurrentDirectory;
  /** 現在の拡張状態。 */
  readonly extensionState: ExtensionState;
  /** 現在日時を返すport。 */
  readonly now: NowProvider;
  /** Bookmark Tree repository port。 */
  readonly repository: BookmarkRepositoryPort;
  /** Extension state storage port。 */
  readonly storage: ExtensionStateStoragePort;
}

/** Storage失敗のエラーcode。 */
const storageFailedErrorCode = "storage_failed";

/** Storage失敗時のmessage。 */
const storageFailedMessage = "Extension state storage operation failed";

/**
 * 成功結果を作成。
 * @param {TValue} value 成功値。
 * @returns {BookmarkCommandSuccess<TValue>} 成功結果。
 */
const createSuccess = <TValue>(value: TValue): BookmarkCommandSuccess<TValue> => ({
  ok: true,
  value,
});

/**
 * Storage失敗結果を作成。
 * @returns {BookmarkCommandFailure} storage失敗結果。
 */
const createStorageFailedFailure = (): BookmarkCommandFailure => ({
  errorCode: storageFailedErrorCode,
  message: storageFailedMessage,
  ok: false,
});

/**
 * 起動時の拡張状態を読み込み、Bookmark Treeと照合。
 * @param {LoadExtensionStateInput} input 拡張状態読み込み入力。
 * @returns {Promise<BookmarkCommandResult<ExtensionState>>} 拡張状態読み込み結果。
 */
export const loadExtensionState = async (
  input: LoadExtensionStateInput,
): Promise<BookmarkCommandResult<ExtensionState>> => {
  try {
    const [bookmarkTree, extensionState] = await Promise.all([
      input.repository.getBookmarkTree(),
      input.storage.readExtensionState(),
    ]);
    const sanitizedState = sanitizeExtensionStateForBookmarkTree({
      bookmarkTree,
      state: extensionState,
      updatedAt: input.now(),
    });

    await input.storage.writeExtensionState(sanitizedState);

    return createSuccess(sanitizedState);
  } catch {
    return createStorageFailedFailure();
  }
};

/**
 * Command実行後の現在ディレクトリと入力履歴を保存。
 * @param {PersistCommandExecutionStateInput} input 拡張状態保存入力。
 * @returns {Promise<BookmarkCommandResult<ExtensionState>>} 拡張状態保存結果。
 */
export const persistCommandExecutionState = async (
  input: PersistCommandExecutionStateInput,
): Promise<BookmarkCommandResult<ExtensionState>> => {
  try {
    const executedAt = input.now();
    const bookmarkTree = await input.repository.getBookmarkTree();
    const stateWithCurrentDirectory = updateCurrentDirectory({
      bookmarkTree,
      currentDirectory: input.currentDirectory,
      state: input.extensionState,
      updatedAt: executedAt,
    });
    const stateWithHistory = appendCommandHistory(
      stateWithCurrentDirectory,
      input.commandInput,
      executedAt,
    );

    await input.storage.writeExtensionState(stateWithHistory);

    return createSuccess(stateWithHistory);
  } catch {
    return createStorageFailedFailure();
  }
};
