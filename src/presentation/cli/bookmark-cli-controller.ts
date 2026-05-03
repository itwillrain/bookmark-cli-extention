import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import {
  type ParsedBookmarkCommand,
  parseBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import {
  executeChangeDirectoryCommand,
  executeEmptyCommand,
  executeFindCommand,
  executeGoCommand,
  executeListDirectoryCommand,
  executeMarkCommand,
  executePrintWorkingDirectoryCommand,
  executeShowDirectoryTreeCommand,
  executeTagCommand,
  executeUnknownCommand,
} from "./bookmark-cli-command-executors";
import { executeParsedOrganizeCommand } from "./bookmark-cli-organize-command-router";
import { executeParsedUsageCommand } from "./bookmark-cli-usage-command-router";

export type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";

/**
 * Parsed commandを実行する関数です。
 */
type ParsedBookmarkCommandExecutor = (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
) => Promise<BookmarkCliCommandState>;

/**
 * Empty command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedEmptyCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind !== "empty") {
    return executeEmptyCommand(dependencies);
  }

  return executeEmptyCommand(dependencies);
};

/**
 * Unknown command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedUnknownCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind === "unknown") {
    return executeUnknownCommand(command, dependencies);
  }

  return executeEmptyCommand(dependencies);
};

/**
 * Find command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedFindCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "find") {
    const state = await executeFindCommand(command, dependencies);

    return state;
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};

/**
 * Go command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedGoCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "go") {
    const state = await executeGoCommand(command, dependencies);

    return state;
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};

/**
 * Ls command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedListDirectoryCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "ls") {
    const state = await executeListDirectoryCommand(command, dependencies);

    return state;
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};

/**
 * Cd command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedChangeDirectoryCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "cd") {
    const state = await executeChangeDirectoryCommand(command, dependencies);

    return state;
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};

/**
 * Pwd command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedPrintWorkingDirectoryCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind !== "pwd") {
    return executeEmptyCommand(dependencies);
  }

  return executePrintWorkingDirectoryCommand(dependencies);
};

/**
 * Tree command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedShowDirectoryTreeCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "tree") {
    const state = await executeShowDirectoryTreeCommand(command, dependencies);

    return state;
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};

/**
 * Mark command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedMarkCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "mark") {
    const state = await executeMarkCommand(command, dependencies);

    return state;
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};

/**
 * Tag command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedTagCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind === "tag") {
    return executeTagCommand(command, dependencies);
  }

  return executeEmptyCommand(dependencies);
};

/**
 * Command kindごとのexecutorです。
 */
const parsedBookmarkCommandExecutors = {
  cd: executeParsedChangeDirectoryCommand,
  empty: executeParsedEmptyCommand,
  find: executeParsedFindCommand,
  freq: executeParsedUsageCommand,
  go: executeParsedGoCommand,
  ls: executeParsedListDirectoryCommand,
  mark: executeParsedMarkCommand,
  mkdir: executeParsedOrganizeCommand,
  mv: executeParsedOrganizeCommand,
  pwd: executeParsedPrintWorkingDirectoryCommand,
  recent: executeParsedUsageCommand,
  rename: executeParsedOrganizeCommand,
  rm: executeParsedOrganizeCommand,
  tag: executeParsedTagCommand,
  tree: executeParsedShowDirectoryTreeCommand,
  unknown: executeParsedUnknownCommand,
} satisfies Readonly<Record<ParsedBookmarkCommand["kind"], ParsedBookmarkCommandExecutor>>;

/**
 * Parsed commandに対応するexecutorを取得します。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @returns {ParsedBookmarkCommandExecutor} Parsed command executorです。
 */
const getParsedBookmarkCommandExecutor = (
  command: ParsedBookmarkCommand,
): ParsedBookmarkCommandExecutor => parsedBookmarkCommandExecutors[command.kind];

/**
 * CLI入力を解析してBookmark commandを実行します。
 * @param {string} input CLI入力です。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeBookmarkCliCommand = async (
  input: string,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const command = parseBookmarkCommand(input);
  const executor = getParsedBookmarkCommandExecutor(command);
  const state = await executor(command, dependencies);

  return state;
};
