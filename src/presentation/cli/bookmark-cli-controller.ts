/* oxlint-disable max-lines -- Parsed command executor mapをCLI controllerの境界に集約するため。 */

import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import {
  type ParsedBookmarkCommand,
  type PipeSourceBookmarkCommand,
  parseBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import {
  executeAbbrCommand,
  executeAliasCommand,
  executeBrowserHistoryCommand,
  executeChangeDirectoryCommand,
  executeEmptyCommand,
  executeFindCommand,
  executeGoCommand,
  executeHelpCommand,
  executeListDirectoryCommand,
  executeMarkCommand,
  executePendingConfirmationCommand,
  executePrintWorkingDirectoryCommand,
  executeShowDirectoryTreeCommand,
  executeTagCommand,
  executeUnabbrCommand,
  executeUnaliasCommand,
  executeUnknownCommand,
} from "./bookmark-cli-command-executors";
import { executeParsedOrganizeCommand } from "./bookmark-cli-organize-command-router";
import { executeParsedUsageCommand } from "./bookmark-cli-usage-command-router";
import { executePipeCommand } from "./bookmark-cli-pipe-command-executors";
import { expandCommandAlias } from "../../domain/cli/command-alias";

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
 * Abbr command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedAbbrCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind === "abbr") {
    return executeAbbrCommand(command, dependencies);
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
 * History command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedBrowserHistoryCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "history") {
    const state = await executeBrowserHistoryCommand(command, dependencies);

    return state;
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};

/**
 * Help command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedHelpCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind === "help") {
    return executeHelpCommand(command, dependencies);
  }

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
 * Pipe source kindごとのexecutorです。
 */
const pipeSourceCommandExecutors = {
  find: executeParsedFindCommand,
  freq: executeParsedUsageCommand,
  help: executeParsedHelpCommand,
  history: executeParsedBrowserHistoryCommand,
  ls: executeParsedListDirectoryCommand,
  recent: executeParsedUsageCommand,
  tree: executeParsedShowDirectoryTreeCommand,
} satisfies Readonly<Record<PipeSourceBookmarkCommand["kind"], ParsedBookmarkCommandExecutor>>;

/**
 * Pipe source commandを実行します。
 * @param {PipeSourceBookmarkCommand} command pipe source commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executePipeSourceCommand = async (
  command: PipeSourceBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const executor = pipeSourceCommandExecutors[command.kind];
  const state = await executor(command, dependencies);

  return state;
};

/**
 * Pipe command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedPipeCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "pipe") {
    return executePipeCommand(command, dependencies, executePipeSourceCommand);
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};

/**
 * Alias command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedAliasCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind === "alias") {
    return executeAliasCommand(command, dependencies);
  }

  return executeEmptyCommand(dependencies);
};

/**
 * Unalias command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedUnaliasCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind === "unalias") {
    return executeUnaliasCommand(command, dependencies);
  }

  return executeEmptyCommand(dependencies);
};

/**
 * Unabbr command executor adapterです。
 * @param {ParsedBookmarkCommand} command Parsed commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
const executeParsedUnabbrCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  await Promise.resolve();

  if (command.kind === "unabbr") {
    return executeUnabbrCommand(command, dependencies);
  }

  return executeEmptyCommand(dependencies);
};

/**
 * Command kindごとのexecutorです。
 */
const parsedBookmarkCommandExecutors = {
  abbr: executeParsedAbbrCommand,
  alias: executeParsedAliasCommand,
  cd: executeParsedChangeDirectoryCommand,
  clear: executeParsedEmptyCommand,
  empty: executeParsedEmptyCommand,
  find: executeParsedFindCommand,
  freq: executeParsedUsageCommand,
  go: executeParsedGoCommand,
  help: executeParsedHelpCommand,
  history: executeParsedBrowserHistoryCommand,
  ls: executeParsedListDirectoryCommand,
  mark: executeParsedMarkCommand,
  mkdir: executeParsedOrganizeCommand,
  mv: executeParsedOrganizeCommand,
  pipe: executeParsedPipeCommand,
  pwd: executeParsedPrintWorkingDirectoryCommand,
  recent: executeParsedUsageCommand,
  rename: executeParsedOrganizeCommand,
  rm: executeParsedOrganizeCommand,
  tag: executeParsedTagCommand,
  tree: executeParsedShowDirectoryTreeCommand,
  unabbr: executeParsedUnabbrCommand,
  unalias: executeParsedUnaliasCommand,
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
  if (dependencies.pendingConfirmation) {
    return executePendingConfirmationCommand(input, dependencies);
  }

  const expandedInput = expandCommandAlias(
    input,
    dependencies.extensionState.settings.commandAliases,
  );
  const command = parseBookmarkCommand(expandedInput);
  const executor = getParsedBookmarkCommandExecutor(command);
  const state = await executor(command, dependencies);

  return state;
};
