import type { FindBookmarkCommand, GoBookmarkCommand } from "./bookmark-search-command-types";

/** Debug option名。 */
const debugOptionName = "--debug";

/** Command tokenの区切り文字。 */
const commandTokenSeparator = " ";

/** 検索command共通のparse結果。 */
interface SearchCommandParseValue {
  /** Debug情報を表示するか。 */
  readonly debug: boolean;
  /** 検索query。 */
  readonly query: string;
}

/**
 * Debug option tokenかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} debug optionならtrue。
 */
const isDebugOptionToken = (token: string): boolean => token === debugOptionName;

/**
 * 検索queryに使う値tokenだけを抽出。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {readonly string[]} optionを除いた値token一覧。
 */
const createSearchValueTokens = (queryParts: readonly string[]): readonly string[] =>
  queryParts.filter((token) => !isDebugOptionToken(token));

/**
 * 値tokenを検索query文字列へ戻す。
 * @param {readonly string[]} tokens 値token一覧。
 * @returns {string} 検索query文字列。
 */
const joinSearchQuery = (tokens: readonly string[]): string => tokens.join(commandTokenSeparator);

/**
 * Debug option指定があるかを判定。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {boolean} debug option指定があればtrue。
 */
const hasDebugOption = (queryParts: readonly string[]): boolean =>
  queryParts.includes(debugOptionName);

/**
 * 検索command共通部分を解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {SearchCommandParseValue} 検索command共通のparse結果。
 */
const parseSearchCommand = (queryParts: readonly string[]): SearchCommandParseValue => ({
  debug: hasDebugOption(queryParts),
  query: joinSearchQuery(createSearchValueTokens(queryParts)),
});

/**
 * Find commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {FindBookmarkCommand} Find command。
 */
export const parseFindBookmarkCommand = (queryParts: readonly string[]): FindBookmarkCommand => ({
  kind: "find",
  ...parseSearchCommand(queryParts),
});

/**
 * Go commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {GoBookmarkCommand} Go command。
 */
export const parseGoBookmarkCommand = (queryParts: readonly string[]): GoBookmarkCommand => ({
  kind: "go",
  ...parseSearchCommand(queryParts),
});
