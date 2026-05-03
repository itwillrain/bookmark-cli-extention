import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import type { UnknownBookmarkCommand } from "../../application/commands/bookmark-command-parser";
import { createEmptyResultState } from "./bookmark-cli-state-builders";

export {
  executeChangeDirectoryCommand,
  executeListDirectoryCommand,
  executePrintWorkingDirectoryCommand,
  executeShowDirectoryTreeCommand,
} from "./bookmark-cli-directory-command-executors";
export { executeMarkCommand } from "./bookmark-cli-mark-command-executors";
export { executeTagCommand } from "./bookmark-cli-tag-command-executors";
export { executeFindCommand, executeGoCommand } from "./bookmark-cli-search-command-executors";

/**
 * 初期状態のstatus textです。
 */
const readyStatusText = "Ready";

/**
 * 未対応commandのstatus prefixです。
 */
const unknownCommandStatusPrefix = "Unknown command";

/**
 * 未対応commandのstatus textを作ります。
 * @param {UnknownBookmarkCommand} command 未対応commandです。
 * @returns {string} 未対応commandのstatus textです。
 */
const createUnknownCommandStatusText = (command: UnknownBookmarkCommand): string =>
  `${unknownCommandStatusPrefix}: ${command.commandName}`;

/**
 * Empty commandを実行します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
export const executeEmptyCommand = (
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState => createEmptyResultState(dependencies, readyStatusText);

/**
 * Unknown commandを実行します。
 * @param {UnknownBookmarkCommand} command Unknown commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
export const executeUnknownCommand = (
  command: UnknownBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState =>
  createEmptyResultState(dependencies, createUnknownCommandStatusText(command));
