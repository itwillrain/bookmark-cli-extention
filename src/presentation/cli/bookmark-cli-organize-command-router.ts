import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import {
  executeMakeDirectoryCommand,
  executeMoveBookmarkCommand,
  executeRemoveBookmarkCommand,
  executeRenameBookmarkCommand,
} from "./bookmark-cli-organize-command-executors";
import type { ParsedBookmarkCommand } from "../../application/commands/bookmark-command-parser";
import { executeEmptyCommand } from "./bookmark-cli-command-executors";

/**
 * 整理系commandかを判定。
 * @param {ParsedBookmarkCommand} command Parsed command。
 * @returns {boolean} 整理系commandならtrue。
 */
const isOrganizeCommand = (
  command: ParsedBookmarkCommand,
): command is Extract<ParsedBookmarkCommand, { readonly kind: "mkdir" | "mv" | "rename" | "rm" }> =>
  command.kind === "mkdir" ||
  command.kind === "mv" ||
  command.kind === "rename" ||
  command.kind === "rm";

/**
 * 整理系commandを実行。
 * @param {ParsedBookmarkCommand} command Parsed command。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態。
 */
export const executeParsedOrganizeCommand = async (
  command: ParsedBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (!isOrganizeCommand(command)) {
    await Promise.resolve();

    return executeEmptyCommand(dependencies);
  }

  if (command.kind === "mkdir") {
    return executeMakeDirectoryCommand(command, dependencies);
  }

  if (command.kind === "mv") {
    return executeMoveBookmarkCommand(command, dependencies);
  }

  if (command.kind === "rm") {
    return executeRemoveBookmarkCommand(command, dependencies);
  }

  return executeRenameBookmarkCommand(command, dependencies);
};
