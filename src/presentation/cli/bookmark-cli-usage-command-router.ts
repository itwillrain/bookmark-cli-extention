import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import {
  executeEmptyCommand,
  executeFrequentBookmarksCommand,
  executeRecentBookmarksCommand,
} from "./bookmark-cli-command-executors";
import type { ParsedBookmarkCommand } from "../../application/commands/bookmark-command-parser";

/**
 * Usage commandを実行。
 * @param {ParsedBookmarkCommand} command Parsed command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeParsedUsageCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (command.kind === "recent") {
    return executeRecentBookmarksCommand(command, dependencies);
  }

  if (command.kind === "freq") {
    return executeFrequentBookmarksCommand(command, dependencies);
  }

  await Promise.resolve();

  return executeEmptyCommand(dependencies);
};
