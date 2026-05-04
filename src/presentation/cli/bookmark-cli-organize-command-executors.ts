/* oxlint-disable max-lines -- 整理系command executorとrm確認待ち処理を同じPresentation境界に集約するため。 */

import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import type {
  MakeDirectoryCommand,
  MoveBookmarkCommand,
  RemoveBookmarkCommand,
  RenameBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import {
  type OrganizeBookmarkResult,
  makeDirectory,
  moveBookmark,
  removeBookmark,
  renameBookmark,
} from "../../application/bookmarks/organize-bookmark-use-case";
import {
  createCommandState,
  createEmptyResultState,
  emptyResultItems,
} from "./bookmark-cli-state-builders";
import { createBookmarkCliResultItemsFromEntries } from "./bookmark-cli-view-model";

/** Bookmark organizer未接続時のstatus text。 */
const organizerUnavailableStatusText = "Bookmark organizer is not available";

/** Remove対象がない場合のstatus text。 */
const removeTargetMissingStatusText = "Remove target was not found";

/** Executed status prefix。 */
const executedStatusPrefix = "Executed";

/** Remove確認status suffix。 */
const removeConfirmationStatusSuffix = "? y/N";

/** Removed status prefix。 */
const removedStatusPrefix = "Removed";

/** Cancelled rm status prefix。 */
const cancelledRemoveStatusPrefix = "Cancelled rm";

/** Confirm入力。 */
const confirmAnswer = "y";

/** Confirm入力の長いalias。 */
const longConfirmAnswer = "yes";

/** Noop promise。 */
const noopPromise = Promise.resolve();

/** 空文字。 */
const emptyString = "";

/**
 * Bookmark organizerが必要なcommand依存から取得。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {BookmarkCliCommandDependencies["organizer"]} Bookmark organizer。
 */
const getOrganizer = (
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandDependencies["organizer"] => dependencies.organizer;

/**
 * 整理操作のstatus textを作成。
 * @param {OrganizeBookmarkResult} result 整理操作結果。
 * @returns {string} status text。
 */
const createOrganizeStatusText = (result: OrganizeBookmarkResult): string => {
  if (!result.ok) {
    return result.message;
  }

  const [entry] = result.value.entries;

  return `${executedStatusPrefix} ${entry?.title ?? emptyString}`;
};

/**
 * Remove確認status textを作成。
 * @param {OrganizeBookmarkResult} result 削除操作結果。
 * @returns {string} Remove確認status text。
 */
const createRemoveConfirmationStatusText = (result: OrganizeBookmarkResult): string => {
  if (!result.ok) {
    return result.message;
  }

  const [entry] = result.value.entries;

  return `Remove ${entry?.title ?? emptyString}${removeConfirmationStatusSuffix}`;
};

/**
 * Remove成功status textを作成。
 * @param {OrganizeBookmarkResult} result 削除操作結果。
 * @returns {string} Remove成功status text。
 */
const createRemoveExecutedStatusText = (result: OrganizeBookmarkResult): string => {
  if (!result.ok) {
    return result.message;
  }

  const [entry] = result.value.entries;

  return `${removedStatusPrefix} ${entry?.title ?? emptyString}`;
};

/**
 * Remove中止status textを作成。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {string} Remove中止status text。
 */
const createRemoveCancelledStatusText = (dependencies: BookmarkCliCommandDependencies): string =>
  `${cancelledRemoveStatusPrefix} ${dependencies.pendingConfirmation?.entry.title ?? ""}`;

/**
 * 整理操作結果をcommand stateへ変換。
 * @param {OrganizeBookmarkResult} result 整理操作結果。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {BookmarkCliCommandState} 画面に反映する状態。
 */
const createOrganizeCommandState = (
  result: OrganizeBookmarkResult,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: result.value.entries,
    resultItems: createBookmarkCliResultItemsFromEntries(result.value.entries),
    statusText: createOrganizeStatusText(result),
  });
};

/**
 * Rm command実行結果をcommand stateへ変換。
 * @param {OrganizeBookmarkResult} result 削除操作結果。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @param {boolean} recursive recursive削除として確認待ちにするか。
 * @returns {BookmarkCliCommandState} 画面に反映する状態。
 */
const createRemoveCommandState = (
  result: OrganizeBookmarkResult,
  dependencies: BookmarkCliCommandDependencies,
  recursive: boolean,
): BookmarkCliCommandState => {
  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  if (result.value.executed) {
    return createCommandState({
      currentDirectory: dependencies.currentDirectory,
      extensionState: dependencies.extensionState,
      lastResultEntries: result.value.entries,
      resultItems: emptyResultItems,
      statusText: createRemoveExecutedStatusText(result),
    });
  }

  const [entry] = result.value.entries;

  if (!entry) {
    return createEmptyResultState(dependencies, removeTargetMissingStatusText);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    extensionState: dependencies.extensionState,
    lastResultEntries: result.value.entries,
    pendingConfirmation: {
      entry,
      kind: "rm",
      recursive,
    },
    resultItems: emptyResultItems,
    statusText: createRemoveConfirmationStatusText(result),
  });
};

/**
 * 確認入力が承認かを判定。
 * @param {string} inputValue 入力値。
 * @returns {boolean} 承認入力ならtrue。
 */
const isConfirmedInput = (inputValue: string): boolean => {
  const normalizedInput = inputValue.trim().toLowerCase();

  return normalizedInput === confirmAnswer || normalizedInput === longConfirmAnswer;
};

/**
 * Mkdir commandを実行。
 * @param {MakeDirectoryCommand} command Mkdir command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeMakeDirectoryCommand = async (
  command: MakeDirectoryCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const organizer = getOrganizer(dependencies);

  if (!organizer) {
    return createEmptyResultState(dependencies, organizerUnavailableStatusText);
  }

  return createOrganizeCommandState(
    await makeDirectory({
      currentDirectory: dependencies.currentDirectory,
      organizer,
      pathInput: command.pathInput,
      repository: dependencies.repository,
    }),
    dependencies,
  );
};

/**
 * Mv commandを実行。
 * @param {MoveBookmarkCommand} command Mv command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeMoveBookmarkCommand = async (
  command: MoveBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const organizer = getOrganizer(dependencies);

  if (!organizer) {
    return createEmptyResultState(dependencies, organizerUnavailableStatusText);
  }

  return createOrganizeCommandState(
    await moveBookmark({
      currentDirectory: dependencies.currentDirectory,
      lastResultEntries: dependencies.lastResultEntries,
      organizer,
      repository: dependencies.repository,
      targetFolderPathInput: command.targetFolderPathInput,
      targetInput: command.targetInput,
    }),
    dependencies,
  );
};

/**
 * Rm commandを実行。
 * @param {RemoveBookmarkCommand} command Rm command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeRemoveBookmarkCommand = async (
  command: RemoveBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const organizer = getOrganizer(dependencies);

  if (!organizer) {
    return createEmptyResultState(dependencies, organizerUnavailableStatusText);
  }

  return createRemoveCommandState(
    await removeBookmark({
      currentDirectory: dependencies.currentDirectory,
      force: command.force,
      lastResultEntries: dependencies.lastResultEntries,
      organizer,
      recursive: command.recursive,
      repository: dependencies.repository,
      targetInput: command.targetInput,
    }),
    dependencies,
    command.recursive,
  );
};

/**
 * 確認待ち入力を処理。
 * @param {string} inputValue 確認入力。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executePendingConfirmationCommand = async (
  inputValue: string,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (dependencies.pendingConfirmation?.kind !== "rm") {
    await noopPromise;

    return createEmptyResultState(dependencies, "");
  }

  if (!isConfirmedInput(inputValue)) {
    await noopPromise;

    return createCommandState({
      currentDirectory: dependencies.currentDirectory,
      extensionState: dependencies.extensionState,
      lastResultEntries: [dependencies.pendingConfirmation.entry],
      resultItems: emptyResultItems,
      statusText: createRemoveCancelledStatusText(dependencies),
    });
  }

  const organizer = getOrganizer(dependencies);

  if (!organizer) {
    return createEmptyResultState(dependencies, organizerUnavailableStatusText);
  }

  return createRemoveCommandState(
    await removeBookmark({
      currentDirectory: dependencies.currentDirectory,
      force: true,
      lastResultEntries: [dependencies.pendingConfirmation.entry],
      organizer,
      recursive: dependencies.pendingConfirmation.recursive,
      repository: dependencies.repository,
      targetInput: "1",
    }),
    dependencies,
    dependencies.pendingConfirmation.recursive,
  );
};

/**
 * Rename commandを実行。
 * @param {RenameBookmarkCommand} command Rename command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeRenameBookmarkCommand = async (
  command: RenameBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const organizer = getOrganizer(dependencies);

  if (!organizer) {
    return createEmptyResultState(dependencies, organizerUnavailableStatusText);
  }

  return createOrganizeCommandState(
    await renameBookmark({
      currentDirectory: dependencies.currentDirectory,
      lastResultEntries: dependencies.lastResultEntries,
      organizer,
      repository: dependencies.repository,
      targetInput: command.targetInput,
      titleInput: command.titleInput,
    }),
    dependencies,
  );
};
