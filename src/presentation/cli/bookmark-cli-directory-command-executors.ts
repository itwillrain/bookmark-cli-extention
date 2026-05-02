import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import type {
  ChangeDirectoryCommand,
  ListDirectoryCommand,
  ShowDirectoryTreeCommand,
} from "../../application/commands/bookmark-command-parser";
import {
  changeDirectory,
  listDirectory,
  printWorkingDirectory,
} from "../../application/bookmarks/directory-use-cases";
import {
  createBookmarkCliResultItemsFromEntries,
  createBookmarkCliResultItemsFromTreeEntries,
} from "./bookmark-cli-view-model";
import {
  createCommandState,
  createEmptyResultState,
  emptyResultItems,
} from "./bookmark-cli-state-builders";
import type { CurrentDirectory } from "../../domain/bookmarks/current-directory";
import { showDirectoryTree } from "../../application/bookmarks/tree-directory-use-case";

/**
 * Directory移動後のstatus prefixです。
 */
const changedDirectoryStatusPrefix = "Directory";

/**
 * Entry件数statusのsuffixです。
 */
const entryStatusSuffix = "entries";

/**
 * Entry件数のstatus textを作ります。
 * @param {number} entryCount Entry件数です。
 * @returns {string} Entry件数のstatus textです。
 */
const createEntryStatusText = (entryCount: number): string =>
  `${String(entryCount)} ${entryStatusSuffix}`;

/**
 * Directory移動後のstatus textを作ります。
 * @param {CurrentDirectory} currentDirectory 現在ディレクトリです。
 * @returns {string} Directory移動後のstatus textです。
 */
const createChangedDirectoryStatusText = (currentDirectory: CurrentDirectory): string =>
  `${changedDirectoryStatusPrefix} ${currentDirectory}`;

/**
 * Ls commandを実行します。
 * @param {ListDirectoryCommand} command Ls commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeListDirectoryCommand = async (
  command: ListDirectoryCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await listDirectory({
    currentDirectory: dependencies.currentDirectory,
    pathInput: command.pathInput,
    repository: dependencies.repository,
  });

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    lastResultEntries: result.value.entries,
    resultItems: createBookmarkCliResultItemsFromEntries(result.value.entries),
    statusText: createEntryStatusText(result.value.entries.length),
  });
};

/**
 * Cd commandを実行します。
 * @param {ChangeDirectoryCommand} command Cd commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeChangeDirectoryCommand = async (
  command: ChangeDirectoryCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await changeDirectory({
    currentDirectory: dependencies.currentDirectory,
    lastResultEntries: dependencies.lastResultEntries,
    pathInput: command.pathInput,
    repository: dependencies.repository,
  });

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: result.value.currentDirectory,
    lastResultEntries: dependencies.lastResultEntries,
    resultItems: emptyResultItems,
    statusText: createChangedDirectoryStatusText(result.value.currentDirectory),
  });
};

/**
 * Pwd commandを実行します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
export const executePrintWorkingDirectoryCommand = (
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => {
  const result = printWorkingDirectory({ currentDirectory: dependencies.currentDirectory });

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: result.value.currentDirectory,
    lastResultEntries: dependencies.lastResultEntries,
    resultItems: emptyResultItems,
    statusText: result.value.currentDirectory,
  });
};

/**
 * Tree commandを実行します。
 * @param {ShowDirectoryTreeCommand} command Tree commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeShowDirectoryTreeCommand = async (
  command: ShowDirectoryTreeCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const result = await showDirectoryTree({
    currentDirectory: dependencies.currentDirectory,
    depth: command.depth,
    pathInput: command.pathInput,
    repository: dependencies.repository,
  });

  if (!result.ok) {
    return createEmptyResultState(dependencies, result.message);
  }

  return createCommandState({
    currentDirectory: dependencies.currentDirectory,
    lastResultEntries: result.value.entries.map((item) => item.entry),
    resultItems: createBookmarkCliResultItemsFromTreeEntries(result.value.entries),
    statusText: createEntryStatusText(result.value.entries.length),
  });
};
