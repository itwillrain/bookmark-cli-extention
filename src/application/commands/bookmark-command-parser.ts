/**
 * Find command名です。
 */
const findCommandName = "find";

/**
 * Go command名です。
 */
const goCommandName = "go";

/**
 * 空command名です。
 */
const emptyCommandName = "";

/**
 * Command tokenの区切り文字です。
 */
const commandTokenSeparator = " ";

/**
 * 連続した空白文字に一致する正規表現です。
 */
const whitespacePattern = /\s+/gu;

/**
 * Find commandです。
 */
export interface FindBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "find";
  /**
   * 検索queryです。
   */
  readonly query: string;
}

/**
 * Go commandです。
 */
export interface GoBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "go";
  /**
   * 検索queryです。
   */
  readonly query: string;
}

/**
 * 空入力commandです。
 */
export interface EmptyBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "empty";
}

/**
 * 未対応commandです。
 */
export interface UnknownBookmarkCommand {
  /**
   * 入力されたcommand名です。
   */
  readonly commandName: string;
  /**
   * Command種別です。
   */
  readonly kind: "unknown";
  /**
   * 正規化済みの入力全体です。
   */
  readonly rawInput: string;
}

/**
 * 解析済みBookmark commandです。
 */
export type ParsedBookmarkCommand =
  | EmptyBookmarkCommand
  | FindBookmarkCommand
  | GoBookmarkCommand
  | UnknownBookmarkCommand;

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
 * Bookmark command入力を解析します。
 * @param {string} input CLIに入力された文字列です。
 * @returns {ParsedBookmarkCommand} 解析済みBookmark commandです。
 */
export const parseBookmarkCommand = (input: string): ParsedBookmarkCommand => {
  const normalizedInput = normalizeCommandInput(input);

  if (normalizedInput === emptyCommandName) {
    return { kind: "empty" };
  }

  const [commandName = emptyCommandName, ...queryParts] =
    normalizedInput.split(commandTokenSeparator);
  const query = joinQueryParts(queryParts);

  if (commandName === findCommandName) {
    return { kind: "find", query };
  }

  if (commandName === goCommandName) {
    return { kind: "go", query };
  }

  return {
    commandName,
    kind: "unknown",
    rawInput: normalizedInput,
  };
};
