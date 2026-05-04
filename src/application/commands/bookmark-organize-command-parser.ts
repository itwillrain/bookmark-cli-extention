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

/** Recursive option名。 */
const recursiveOptionName = "-r";

/** 大文字recursive option名。 */
const upperRecursiveOptionName = "-R";

/** Long recursive option名。 */
const longRecursiveOptionName = "--recursive";

/** Short option prefix。 */
const shortOptionPrefix = "-";

/** Long option prefix。 */
const longOptionPrefix = "--";

/** Force option文字。 */
const forceOptionCharacter = "f";

/** Recursive option文字。 */
const recursiveOptionCharacter = "r";

/** 大文字recursive option文字。 */
const upperRecursiveOptionCharacter = "R";

/** Short optionの本文開始index。 */
const shortOptionContentStartIndex = 1;

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
 * Short option tokenかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} Short option tokenならtrue。
 */
const isShortOptionToken = (token: string): boolean =>
  token.startsWith(shortOptionPrefix) && !token.startsWith(longOptionPrefix);

/**
 * Rm commandのcombined short optionかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} combined short optionならtrue。
 */
const isCombinedRemoveShortOptionToken = (token: string): boolean => {
  if (!isShortOptionToken(token)) {
    return false;
  }

  const optionCharacters = token.slice(shortOptionContentStartIndex).split(emptyString);

  return optionCharacters.every(
    (optionCharacter) =>
      optionCharacter === forceOptionCharacter ||
      optionCharacter === recursiveOptionCharacter ||
      optionCharacter === upperRecursiveOptionCharacter,
  );
};

/**
 * Rm command force optionかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} force optionならtrue。
 */
const isForceOptionToken = (token: string): boolean =>
  token === forceOptionName ||
  token === longForceOptionName ||
  (isCombinedRemoveShortOptionToken(token) && token.includes(forceOptionCharacter));

/**
 * Rm command recursive optionかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} recursive optionならtrue。
 */
const isRecursiveOptionToken = (token: string): boolean =>
  token === recursiveOptionName ||
  token === upperRecursiveOptionName ||
  token === longRecursiveOptionName ||
  (isCombinedRemoveShortOptionToken(token) &&
    (token.includes(recursiveOptionCharacter) || token.includes(upperRecursiveOptionCharacter)));

/**
 * Rm command optionかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} Rm command optionならtrue。
 */
const isRemoveOptionToken = (token: string): boolean =>
  isForceOptionToken(token) || isRecursiveOptionToken(token);

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
  queryParts.some((token) => isForceOptionToken(token));

/**
 * Recursive指定があるかを判定。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {boolean} recursive指定があればtrue。
 */
const hasRecursiveOption = (queryParts: readonly string[]): boolean =>
  queryParts.some((token) => isRecursiveOptionToken(token));

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
 * // { kind: "rm", force: true, recursive: false, targetInput: "3" }
 * ```
 */
export const parseRemoveBookmarkCommand = (
  queryParts: readonly string[],
): RemoveBookmarkCommand => {
  const [targetInput = emptyString] = createRemoveValueTokens(queryParts);

  return {
    force: hasForceOption(queryParts),
    kind: "rm",
    recursive: hasRecursiveOption(queryParts),
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
