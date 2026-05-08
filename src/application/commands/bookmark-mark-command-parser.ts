import type { MarkBookmarkCommand } from "./bookmark-command-types";

/** Mark commandの保存先option名。 */
const markTargetFolderOptionName = "--to";

/** Mark commandの重複許可option名。 */
const allowDuplicateOptionName = "--allow-duplicate";

/** Command tokenの区切り文字。 */
const commandTokenSeparator = " ";

/** 空文字。 */
const emptyString = "";

/** 次tokenへのoffset。 */
const nextTokenOffset = 1;

/** 前tokenへのoffset。 */
const previousTokenOffset = 1;

/** 見つからないindex。 */
const notFoundIndex = -1;

/** 空のtitle token数。 */
const emptyTitleTokenCount = 0;

/** 先頭と末尾の二重引用符に一致する正規表現。 */
const wrappingDoubleQuotePattern = /^"|"$/gu;

/**
 * Mark command option tokenかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} option tokenならtrue。
 */
const isMarkOptionToken = (token: string): boolean =>
  token === markTargetFolderOptionName || token === allowDuplicateOptionName;

/**
 * 保存先folder optionの値tokenかを判定。
 * @param {readonly string[]} queryParts query token一覧。
 * @param {number} index 判定対象index。
 * @returns {boolean} 保存先folder optionの値ならtrue。
 */
const isTargetFolderValueToken = (queryParts: readonly string[], index: number): boolean =>
  queryParts[index - previousTokenOffset] === markTargetFolderOptionName;

/**
 * 保存先folder path入力を取得。
 * @param {readonly string[]} queryParts query token一覧。
 * @returns {string} 保存先folder path入力。
 */
const findTargetFolderPathInput = (queryParts: readonly string[]): string => {
  const optionIndex = queryParts.indexOf(markTargetFolderOptionName);

  if (optionIndex === notFoundIndex) {
    return emptyString;
  }

  return queryParts[optionIndex + nextTokenOffset] ?? emptyString;
};

/**
 * 二重引用符で囲まれた入力を素朴に外す。
 * @param {string} input 引用符を外す入力。
 * @returns {string} 引用符を外した入力。
 */
const stripWrappingDoubleQuotes = (input: string): string =>
  input.replace(wrappingDoubleQuotePattern, emptyString);

/**
 * Mark command title tokenかを判定。
 * @param {readonly string[]} queryParts query token一覧。
 * @param {string} token 判定対象token。
 * @param {number} index 判定対象index。
 * @returns {boolean} title tokenならtrue。
 */
const isTitleToken = (queryParts: readonly string[], token: string, index: number): boolean =>
  !isMarkOptionToken(token) && !isTargetFolderValueToken(queryParts, index);

/**
 * Mark commandのtitle token一覧を取得。
 * @param {readonly string[]} queryParts query token一覧。
 * @returns {readonly string[]} title token一覧。
 */
const getMarkBookmarkTitleTokens = (queryParts: readonly string[]): readonly string[] =>
  queryParts.filter((token, index) => isTitleToken(queryParts, token, index));

/**
 * Mark commandにtitle入力が含まれるかを判定。
 * @param {readonly string[]} queryParts query token一覧。
 * @returns {boolean} title入力が含まれるならtrue。
 */
const hasMarkBookmarkTitle = (queryParts: readonly string[]): boolean =>
  getMarkBookmarkTitleTokens(queryParts).length > emptyTitleTokenCount;

/**
 * Mark commandのtitleを正規化。
 * @param {readonly string[]} queryParts query token一覧。
 * @returns {string} 正規化したtitle入力。
 */
const normalizeMarkBookmarkTitle = (queryParts: readonly string[]): string =>
  stripWrappingDoubleQuotes(getMarkBookmarkTitleTokens(queryParts).join(commandTokenSeparator));

/**
 * Mark commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {MarkBookmarkCommand} Mark command。
 * @example
 * ```ts
 * const result = parseMarkBookmarkCommand(["--to", "./Work", "Stripe"]);
 * // { kind: "mark", targetFolderPathInput: "./Work", titleInput: "Stripe", titleSpecified: true, allowDuplicate: false }
 * ```
 */
export const parseMarkBookmarkCommand = (queryParts: readonly string[]): MarkBookmarkCommand => ({
  allowDuplicate: queryParts.includes(allowDuplicateOptionName),
  kind: "mark",
  targetFolderPathInput: findTargetFolderPathInput(queryParts),
  titleInput: normalizeMarkBookmarkTitle(queryParts),
  titleSpecified: hasMarkBookmarkTitle(queryParts),
});
