import type { FindBookmarkCommand, GoBookmarkCommand } from "./bookmark-search-command-types";

/** Long option名。 */
const longOptionName = "-l";

/** Command tokenの区切り文字。 */
const commandTokenSeparator = " ";

/** 検索command共通のparse結果。 */
interface SearchCommandParseValue {
  /** 詳細情報を表示するか。 */
  readonly long: boolean;
  /** 検索query。 */
  readonly query: string;
}

/**
 * Long option tokenかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} long optionならtrue。
 */
const isLongOptionToken = (token: string): boolean => token === longOptionName;

/**
 * 検索queryに使う値tokenだけを抽出。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {readonly string[]} optionを除いた値token一覧。
 */
const createSearchValueTokens = (queryParts: readonly string[]): readonly string[] =>
  queryParts.filter((token) => !isLongOptionToken(token));

/**
 * 値tokenを検索query文字列へ戻す。
 * @param {readonly string[]} tokens 値token一覧。
 * @returns {string} 検索query文字列。
 */
const joinSearchQuery = (tokens: readonly string[]): string => tokens.join(commandTokenSeparator);

/**
 * Long option指定があるかを判定。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {boolean} long option指定があればtrue。
 */
const hasLongOption = (queryParts: readonly string[]): boolean =>
  queryParts.includes(longOptionName);

/**
 * 検索command共通部分を解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {SearchCommandParseValue} 検索command共通のparse結果。
 */
const parseSearchCommand = (queryParts: readonly string[]): SearchCommandParseValue => ({
  long: hasLongOption(queryParts),
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
