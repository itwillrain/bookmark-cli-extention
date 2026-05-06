/* oxlint-disable max-lines -- Command名からASTを作る集約地点としてfactory mapを同じfileに保つため。 */

import {
  parseAliasBookmarkCommand,
  parseUnaliasBookmarkCommand,
} from "./bookmark-alias-command-parser";
import {
  parseBrowserHistoryCommand,
  parseFrequentBookmarksCommand,
  parseRecentBookmarksCommand,
} from "./bookmark-usage-command-parser";
import { parseFindBookmarkCommand, parseGoBookmarkCommand } from "./bookmark-search-command-parser";
import {
  parseMakeDirectoryCommand,
  parseMoveBookmarkCommand,
  parseRemoveBookmarkCommand,
  parseRenameBookmarkCommand,
} from "./bookmark-organize-command-parser";
import type { ParsedBookmarkCommand } from "./bookmark-command-types";
import { parseListDirectoryCommand } from "./bookmark-list-command-parser";
import { parseMarkBookmarkCommand } from "./bookmark-mark-command-parser";
import { parseShowDirectoryTreeCommand } from "./bookmark-tree-command-parser";
import { parseTagBookmarkCommand } from "./bookmark-tag-command-parser";

/** Find command名です。 */
const findCommandName = "find";

/** Go command名です。 */
const goCommandName = "go";

/** Recent command名です。 */
const recentBookmarksCommandName = "recent";

/** Freq command名です。 */
const frequentBookmarksCommandName = "freq";

/** History command名です。 */
const browserHistoryCommandName = "history";

/** Ls command名です。 */
const listDirectoryCommandName = "ls";

/** Ll command alias名です。 */
const longListDirectoryCommandName = "ll";

/** Cd command名です。 */
const changeDirectoryCommandName = "cd";

/** Clear command名です。 */
const clearCommandName = "clear";

/** Abbr command名です。 */
const abbrCommandName = "abbr";

/** 互換用Alias command名です。 */
const legacyAliasCommandName = "alias";

/** Unabbr command名です。 */
const unabbrCommandName = "unabbr";

/** 互換用Unalias command名です。 */
const legacyUnaliasCommandName = "unalias";

/** Help command名です。 */
const helpCommandName = "help";

/** Man command alias名です。 */
const manualCommandName = "man";

/** Pwd command名です。 */
const printWorkingDirectoryCommandName = "pwd";

/** Tree command名です。 */
const showDirectoryTreeCommandName = "tree";

/** Mark command名です。 */
const markBookmarkCommandName = "mark";

/** Tag command名です。 */
const tagBookmarkCommandName = "tag";

/** Mkdir command名です。 */
const makeDirectoryCommandName = "mkdir";

/** Mv command名です。 */
const moveBookmarkCommandName = "mv";

/** Rm command名です。 */
const removeBookmarkCommandName = "rm";

/** Rename command名です。 */
const renameBookmarkCommandName = "rename";

/** Long help option名です。 */
const longHelpOption = "--help";

/** Short help option名です。 */
const shortHelpOption = "-h";

/**
 * Command parse contextです。
 */
export interface CommandParseContext {
  /**
   * 入力されたcommand名です。
   */
  readonly commandName: string;
  /**
   * Command名を除いたqueryです。
   */
  readonly query: string;
  /**
   * Command名を除いたtoken一覧です。
   */
  readonly queryParts: readonly string[];
  /**
   * 正規化済み入力です。
   */
  readonly normalizedInput: string;
}

/**
 * Command parse contextからcommandを作る関数です。
 */
export type BookmarkCommandFactory = (context: CommandParseContext) => ParsedBookmarkCommand;

/**
 * Find commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Find commandです。
 */
const createFindBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  ...parseFindBookmarkCommand(context.queryParts),
});

/**
 * Go commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Go commandです。
 */
const createGoBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  ...parseGoBookmarkCommand(context.queryParts),
});

/**
 * Recent commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Recent commandです。
 */
const createRecentBookmarksCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseRecentBookmarksCommand(context.queryParts);

/**
 * Freq commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Freq commandです。
 */
const createFrequentBookmarksCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseFrequentBookmarksCommand(context.queryParts);

/**
 * History commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} History commandです。
 */
const createBrowserHistoryCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseBrowserHistoryCommand(context.queryParts);

/**
 * Ls commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Ls commandです。
 */
const createListDirectoryCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  ...parseListDirectoryCommand(context.commandName, context.queryParts),
});

/**
 * Cd commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Cd commandです。
 */
const createChangeDirectoryCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  kind: "cd",
  pathInput: context.query,
});

/**
 * Clear commandを作ります。
 * @returns {ParsedBookmarkCommand} Clear commandです。
 */
const createClearCommand = (): ParsedBookmarkCommand => ({
  kind: "clear",
});

/**
 * Abbr commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Abbr commandです。
 */
const createAliasCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseAliasBookmarkCommand(context.query);

/**
 * Unabbr commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Unabbr commandです。
 */
const createUnaliasCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseUnaliasBookmarkCommand(context.queryParts);

/**
 * Help commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Help commandです。
 */
const createHelpCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  kind: "help",
  topicInput: context.query,
});

/**
 * Help option付きcommandをHelp commandへ変換します。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Help commandです。
 */
const createCommandHelpCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  kind: "help",
  topicInput: context.commandName,
});

/**
 * Pwd commandを作ります。
 * @returns {ParsedBookmarkCommand} Pwd commandです。
 */
const createPrintWorkingDirectoryCommand = (): ParsedBookmarkCommand => ({
  kind: "pwd",
});

/**
 * Tree commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Tree commandです。
 */
const createTreeCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseShowDirectoryTreeCommand(context.queryParts);

/**
 * Mark commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Mark commandです。
 */
const createMarkBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseMarkBookmarkCommand(context.queryParts);

/**
 * Tag commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Tag commandです。
 */
const createTagBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseTagBookmarkCommand(context.queryParts);

/**
 * Mkdir commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Mkdir commandです。
 */
const createMakeDirectoryCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseMakeDirectoryCommand(context.queryParts);

/**
 * Mv commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Mv commandです。
 */
const createMoveBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseMoveBookmarkCommand(context.queryParts);

/**
 * Rm commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Rm commandです。
 */
const createRemoveBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseRemoveBookmarkCommand(context.queryParts);

/**
 * Rename commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Rename commandです。
 */
const createRenameBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand =>
  parseRenameBookmarkCommand(context.queryParts);

/**
 * Unknown commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Unknown commandです。
 */
const createUnknownCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  commandName: context.commandName,
  kind: "unknown",
  rawInput: context.normalizedInput,
});

/**
 * Command名ごとのfactoryです。
 */
const bookmarkCommandFactories: Readonly<Record<string, BookmarkCommandFactory>> = {
  [abbrCommandName]: createAliasCommand,
  [changeDirectoryCommandName]: createChangeDirectoryCommand,
  [clearCommandName]: createClearCommand,
  [findCommandName]: createFindBookmarkCommand,
  [frequentBookmarksCommandName]: createFrequentBookmarksCommand,
  [goCommandName]: createGoBookmarkCommand,
  [browserHistoryCommandName]: createBrowserHistoryCommand,
  [helpCommandName]: createHelpCommand,
  [legacyAliasCommandName]: createAliasCommand,
  [legacyUnaliasCommandName]: createUnaliasCommand,
  [listDirectoryCommandName]: createListDirectoryCommand,
  [longListDirectoryCommandName]: createListDirectoryCommand,
  [makeDirectoryCommandName]: createMakeDirectoryCommand,
  [manualCommandName]: createHelpCommand,
  [markBookmarkCommandName]: createMarkBookmarkCommand,
  [moveBookmarkCommandName]: createMoveBookmarkCommand,
  [printWorkingDirectoryCommandName]: createPrintWorkingDirectoryCommand,
  [recentBookmarksCommandName]: createRecentBookmarksCommand,
  [removeBookmarkCommandName]: createRemoveBookmarkCommand,
  [renameBookmarkCommandName]: createRenameBookmarkCommand,
  [showDirectoryTreeCommandName]: createTreeCommand,
  [tagBookmarkCommandName]: createTagBookmarkCommand,
  [unabbrCommandName]: createUnaliasCommand,
};

/**
 * Query tokenにhelp optionが含まれるかを判定します。
 * @param {readonly string[]} queryParts Command名を除いたtoken一覧です。
 * @returns {boolean} Help optionを含むならtrueです。
 */
const hasHelpOption = (queryParts: readonly string[]): boolean =>
  queryParts.includes(longHelpOption) || queryParts.includes(shortHelpOption);

/**
 * Command parse contextに対応するfactoryを取得します。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {BookmarkCommandFactory} Command factoryです。
 * @example
 * ```ts
 * const result = getBookmarkCommandFactory(context);
 * ```
 */
export const getBookmarkCommandFactory = (context: CommandParseContext): BookmarkCommandFactory => {
  if (hasHelpOption(context.queryParts)) {
    return createCommandHelpCommand;
  }

  return bookmarkCommandFactories[context.commandName] ?? createUnknownCommand;
};
