import type { AliasBookmarkCommand, UnaliasBookmarkCommand } from "./bookmark-command-types";

/** Alias command kindです。 */
const aliasCommandKind = "alias";

/** Unalias command kindです。 */
const unaliasCommandKind = "unalias";

/** Alias list操作です。 */
const aliasListOperation = "list";

/** Alias set操作です。 */
const aliasSetOperation = "set";

/** 空文字です。 */
const emptyString = "";

/** Assignment separatorです。 */
const assignmentSeparator = "=";

/** 先頭の文字indexです。 */
const firstCharacterIndex = 0;

/** 次文字へのoffsetです。 */
const nextCharacterOffset = 1;

/** 末尾文字へのoffsetです。 */
const lastCharacterOffset = 1;

/** Single quoteです。 */
const singleQuote = "'";

/** Double quoteです。 */
const doubleQuote = '"';

/**
 * 入力が指定quoteで囲まれているかを判定します。
 * @param {string} input 判定対象です。
 * @param {string} quote quote文字です。
 * @returns {boolean} 囲まれていればtrueです。
 */
const isWrappedWithQuote = (input: string, quote: string): boolean =>
  input.startsWith(quote) && input.endsWith(quote) && input.length > quote.length;

/**
 * 入力の前後quoteを外します。
 * @param {string} input quoteを外す入力です。
 * @returns {string} quoteを外した入力です。
 */
const stripWrappingQuotes = (input: string): string => {
  if (isWrappedWithQuote(input, singleQuote) || isWrappedWithQuote(input, doubleQuote)) {
    return input.slice(firstCharacterIndex + nextCharacterOffset, -lastCharacterOffset);
  }

  return input;
};

/**
 * Alias一覧commandを作ります。
 * @returns {AliasBookmarkCommand} Alias一覧commandです。
 */
const createAliasListCommand = (): AliasBookmarkCommand => ({
  aliasName: emptyString,
  commandInput: emptyString,
  kind: aliasCommandKind,
  operation: aliasListOperation,
});

/**
 * Alias設定commandを作ります。
 * @param {string} assignmentInput alias assignment入力です。
 * @returns {AliasBookmarkCommand} Alias設定commandです。
 */
const createAliasSetCommand = (assignmentInput: string): AliasBookmarkCommand => {
  const separatorIndex = assignmentInput.indexOf(assignmentSeparator);
  const aliasName = assignmentInput.slice(firstCharacterIndex, separatorIndex).trim();
  const commandInput = stripWrappingQuotes(
    assignmentInput.slice(separatorIndex + nextCharacterOffset).trim(),
  );

  return {
    aliasName,
    commandInput,
    kind: aliasCommandKind,
    operation: aliasSetOperation,
  };
};

/**
 * Alias commandを解析します。
 * @param {string} query command名を除いた入力です。
 * @returns {AliasBookmarkCommand} Alias commandです。
 * @example
 * ```ts
 * const result = parseAliasBookmarkCommand("c=clear");
 * // { kind: "alias", operation: "set", aliasName: "c", commandInput: "clear" }
 * ```
 */
export const parseAliasBookmarkCommand = (query: string): AliasBookmarkCommand => {
  const assignmentInput = query.trim();

  if (assignmentInput === emptyString || !assignmentInput.includes(assignmentSeparator)) {
    return createAliasListCommand();
  }

  return createAliasSetCommand(assignmentInput);
};

/**
 * Unalias commandを解析します。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {UnaliasBookmarkCommand} Unalias commandです。
 * @example
 * ```ts
 * const result = parseUnaliasBookmarkCommand(["c"]);
 * // { kind: "unalias", aliasName: "c" }
 * ```
 */
export const parseUnaliasBookmarkCommand = (
  queryParts: readonly string[],
): UnaliasBookmarkCommand => ({
  aliasName: queryParts[firstCharacterIndex] ?? emptyString,
  kind: unaliasCommandKind,
});
