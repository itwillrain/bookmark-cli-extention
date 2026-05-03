import {
  parseMakeDirectoryCommand,
  parseMoveBookmarkCommand,
  parseRemoveBookmarkCommand,
  parseRenameBookmarkCommand,
} from "./bookmark-organize-command-parser";
import type { ParsedBookmarkCommand } from "./bookmark-command-types";
import { parseMarkBookmarkCommand } from "./bookmark-mark-command-parser";
import { parseShowDirectoryTreeCommand } from "./bookmark-tree-command-parser";
import { parseTagBookmarkCommand } from "./bookmark-tag-command-parser";

export type {
  ChangeDirectoryCommand,
  EmptyBookmarkCommand,
  FindBookmarkCommand,
  GoBookmarkCommand,
  ListDirectoryCommand,
  MakeDirectoryCommand,
  MarkBookmarkCommand,
  MoveBookmarkCommand,
  ParsedBookmarkCommand,
  PrintWorkingDirectoryCommand,
  RemoveBookmarkCommand,
  RenameBookmarkCommand,
  ShowDirectoryTreeCommand,
  TagBookmarkCommand,
  UnknownBookmarkCommand,
} from "./bookmark-command-types";

/** Find command名です。 */
const findCommandName = "find";

/** Go command名です。 */
const goCommandName = "go";

/** Ls command名です。 */
const listDirectoryCommandName = "ls";

/** Cd command名です。 */
const changeDirectoryCommandName = "cd";

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

/** 空command名です。 */
const emptyCommandName = "";

/** Command tokenの区切り文字です。 */
const commandTokenSeparator = " ";

/** 連続した空白文字に一致する正規表現です。 */
const whitespacePattern = /\s+/gu;

/**
 * Command parse contextです。
 */
interface CommandParseContext {
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
type BookmarkCommandFactory = (context: CommandParseContext) => ParsedBookmarkCommand;

/**
 * 入力文字列の空白をCLI向けに正規化します。
 * @param {string} input 正規化する入力です。
 * @returns {string} 正規化済み入力です。
 */
const normalizeCommandInput = (input: string): string =>
  input.trim().replace(whitespacePattern, commandTokenSeparator);

/**
 * Command token一覧からquery部分を取り出します。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {string} Query文字列です。
 */
const joinQueryParts = (queryParts: readonly string[]): string =>
  queryParts.join(commandTokenSeparator);

/**
 * Command parse contextを作ります。
 * @param {string} normalizedInput 正規化済み入力です。
 * @returns {CommandParseContext} Command parse contextです。
 */
const createCommandParseContext = (normalizedInput: string): CommandParseContext => {
  const [commandName = emptyCommandName, ...queryParts] =
    normalizedInput.split(commandTokenSeparator);
  const query = joinQueryParts(queryParts);

  return {
    commandName,
    normalizedInput,
    query,
    queryParts,
  };
};

/**
 * Find commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Find commandです。
 */
const createFindBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  kind: "find",
  query: context.query,
});

/**
 * Go commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Go commandです。
 */
const createGoBookmarkCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  kind: "go",
  query: context.query,
});

/**
 * Ls commandを作ります。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {ParsedBookmarkCommand} Ls commandです。
 */
const createListDirectoryCommand = (context: CommandParseContext): ParsedBookmarkCommand => ({
  kind: "ls",
  pathInput: context.query,
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
  [changeDirectoryCommandName]: createChangeDirectoryCommand,
  [findCommandName]: createFindBookmarkCommand,
  [goCommandName]: createGoBookmarkCommand,
  [listDirectoryCommandName]: createListDirectoryCommand,
  [makeDirectoryCommandName]: createMakeDirectoryCommand,
  [markBookmarkCommandName]: createMarkBookmarkCommand,
  [moveBookmarkCommandName]: createMoveBookmarkCommand,
  [printWorkingDirectoryCommandName]: createPrintWorkingDirectoryCommand,
  [removeBookmarkCommandName]: createRemoveBookmarkCommand,
  [renameBookmarkCommandName]: createRenameBookmarkCommand,
  [showDirectoryTreeCommandName]: createTreeCommand,
  [tagBookmarkCommandName]: createTagBookmarkCommand,
};

/**
 * Command parse contextに対応するfactoryを取得します。
 * @param {CommandParseContext} context Command parse contextです。
 * @returns {BookmarkCommandFactory} Command factoryです。
 */
const getBookmarkCommandFactory = (context: CommandParseContext): BookmarkCommandFactory =>
  bookmarkCommandFactories[context.commandName] ?? createUnknownCommand;

/**
 * Bookmark command入力を解析します。
 * @param {string} input CLIに入力された文字列です。
 * @returns {ParsedBookmarkCommand} 解析済みBookmark commandです。
 */
export const parseBookmarkCommand = (input: string): ParsedBookmarkCommand => {
  const normalizedInput = normalizeCommandInput(input);

  if (normalizedInput === emptyCommandName) {
    return { kind: "empty" };
  }

  const context = createCommandParseContext(normalizedInput);
  const factory = getBookmarkCommandFactory(context);

  return factory(context);
};
