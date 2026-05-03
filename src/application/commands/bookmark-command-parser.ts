import { type CommandParseContext, getBookmarkCommandFactory } from "./bookmark-command-factory";
import type { ParsedBookmarkCommand } from "./bookmark-command-types";

export type {
  ChangeDirectoryCommand,
  ClearBookmarkCommand,
  EmptyBookmarkCommand,
  FindBookmarkCommand,
  FrequentBookmarksCommand,
  GoBookmarkCommand,
  HelpBookmarkCommand,
  ListDirectoryCommand,
  MakeDirectoryCommand,
  MarkBookmarkCommand,
  MoveBookmarkCommand,
  ParsedBookmarkCommand,
  PrintWorkingDirectoryCommand,
  RecentBookmarksCommand,
  RemoveBookmarkCommand,
  RenameBookmarkCommand,
  ShowDirectoryTreeCommand,
  TagBookmarkCommand,
  UnknownBookmarkCommand,
} from "./bookmark-command-types";

/** 空command名です。 */
const emptyCommandName = "";

/** Command tokenの区切り文字です。 */
const commandTokenSeparator = " ";

/** 連続した空白文字に一致する正規表現です。 */
const whitespacePattern = /\s+/gu;

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
