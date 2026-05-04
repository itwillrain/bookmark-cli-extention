import type {
  MakeDirectoryCommand,
  MoveBookmarkCommand,
  RemoveBookmarkCommand,
  RenameBookmarkCommand,
} from "./bookmark-command-types";

/** Force option名。 */
const forceOptionName = "-f";

/** Long force option名。 */
const longForceOptionName = "--force";

/** 空文字。 */
const emptyString = "";

/** Command tokenの区切り文字。 */
const commandTokenSeparator = " ";

/** 先頭と末尾の二重引用符に一致する正規表現。 */
const wrappingDoubleQuotePattern = /^"|"$/gu;

/**
 * 整理系commandの値tokenだけを抽出。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {readonly string[]} optionを除いた値token一覧。
 */
const createOrganizeValueTokens = (queryParts: readonly string[]): readonly string[] => queryParts;

/**
 * Rm command optionかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} Rm command optionならtrue。
 */
const isRemoveOptionToken = (token: string): boolean =>
  token === forceOptionName || token === longForceOptionName;

/**
 * Rm commandの値tokenだけを抽出。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {readonly string[]} optionを除いた値token一覧。
 */
const createRemoveValueTokens = (queryParts: readonly string[]): readonly string[] =>
  queryParts.filter((token) => !isRemoveOptionToken(token));

/**
 * 二重引用符で囲まれた入力を素朴に外す。
 * @param {string} input 引用符を外す入力。
 * @returns {string} 引用符を外した入力。
 */
const stripWrappingDoubleQuotes = (input: string): string =>
  input.replace(wrappingDoubleQuotePattern, emptyString);

/**
 * 値tokenを空白区切り文字列へ戻す。
 * @param {readonly string[]} tokens 値token一覧。
 * @returns {string} 結合済み値。
 */
const joinValueTokens = (tokens: readonly string[]): string =>
  stripWrappingDoubleQuotes(tokens.join(commandTokenSeparator));

/**
 * Force指定があるかを判定。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {boolean} force指定があればtrue。
 */
const hasForceOption = (queryParts: readonly string[]): boolean =>
  queryParts.includes(forceOptionName) || queryParts.includes(longForceOptionName);

/**
 * Mkdir commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {MakeDirectoryCommand} Mkdir command。
 * @example
 * ```ts
 * const result = parseMakeDirectoryCommand(["./Work/Admin"]);
 * // { kind: "mkdir", pathInput: "./Work/Admin" }
 * ```
 */
export const parseMakeDirectoryCommand = (queryParts: readonly string[]): MakeDirectoryCommand => ({
  kind: "mkdir",
  pathInput: joinValueTokens(createOrganizeValueTokens(queryParts)),
});

/**
 * Mv commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {MoveBookmarkCommand} Mv command。
 * @example
 * ```ts
 * const result = parseMoveBookmarkCommand(["2", "../Finance"]);
 * // { kind: "mv", targetInput: "2", targetFolderPathInput: "../Finance" }
 * ```
 */
export const parseMoveBookmarkCommand = (queryParts: readonly string[]): MoveBookmarkCommand => {
  const [targetInput = emptyString, ...targetFolderPathTokens] =
    createOrganizeValueTokens(queryParts);

  return {
    kind: "mv",
    targetFolderPathInput: joinValueTokens(targetFolderPathTokens),
    targetInput,
  };
};

/**
 * Rm commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {RemoveBookmarkCommand} Rm command。
 * @example
 * ```ts
 * const result = parseRemoveBookmarkCommand(["-f", "3"]);
 * // { kind: "rm", force: true, targetInput: "3" }
 * ```
 */
export const parseRemoveBookmarkCommand = (
  queryParts: readonly string[],
): RemoveBookmarkCommand => {
  const [targetInput = emptyString] = createRemoveValueTokens(queryParts);

  return {
    force: hasForceOption(queryParts),
    kind: "rm",
    targetInput,
  };
};

/**
 * Rename commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {RenameBookmarkCommand} Rename command。
 * @example
 * ```ts
 * const result = parseRenameBookmarkCommand(["1", "Stripe", "Dashboard"]);
 * // { kind: "rename", targetInput: "1", titleInput: "Stripe Dashboard" }
 * ```
 */
export const parseRenameBookmarkCommand = (
  queryParts: readonly string[],
): RenameBookmarkCommand => {
  const [targetInput = emptyString, ...titleTokens] = createOrganizeValueTokens(queryParts);

  return {
    kind: "rename",
    targetInput,
    titleInput: joinValueTokens(titleTokens),
  };
};
