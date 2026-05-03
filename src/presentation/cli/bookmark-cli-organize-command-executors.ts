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
  createBookmarkCliResultItemFromOrganizationPreview,
  createBookmarkCliResultItemsFromEntries,
} from "./bookmark-cli-view-model";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";

/** Bookmark organizer未接続時のstatus text。 */
const organizerUnavailableStatusText = "Bookmark organizer is not available";

/** Preview status prefix。 */
const previewStatusPrefix = "Preview";

/** Executed status prefix。 */
const executedStatusPrefix = "Executed";

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

  if (result.value.executed) {
    return `${executedStatusPrefix} ${result.value.preview.description}`;
  }

  return `${previewStatusPrefix} ${result.value.preview.description}`;
};

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
    resultItems: [
      createBookmarkCliResultItemFromOrganizationPreview(result.value.preview),
      ...createBookmarkCliResultItemsFromEntries(result.value.entries),
    ],
    statusText: createOrganizeStatusText(result),
  });
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
      preview: command.preview,
      repository: dependencies.repository,
      yes: command.yes,
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
      preview: command.preview,
      repository: dependencies.repository,
      targetFolderPathInput: command.targetFolderPathInput,
      targetInput: command.targetInput,
      yes: command.yes,
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

  return createOrganizeCommandState(
    await removeBookmark({
      currentDirectory: dependencies.currentDirectory,
      lastResultEntries: dependencies.lastResultEntries,
      organizer,
      preview: command.preview,
      repository: dependencies.repository,
      targetInput: command.targetInput,
      yes: command.yes,
    }),
    dependencies,
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
      preview: command.preview,
      repository: dependencies.repository,
      targetInput: command.targetInput,
      titleInput: command.titleInput,
      yes: command.yes,
    }),
    dependencies,
  );
};
