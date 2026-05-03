import type {
  MakeDirectoryCommand,
  MoveBookmarkCommand,
  RemoveBookmarkCommand,
  RenameBookmarkCommand,
} from "./bookmark-command-types";

/** Preview option名。 */
const previewOptionName = "--preview";

/** Yes option名。 */
const yesOptionName = "--yes";

/** 空文字。 */
const emptyString = "";

/** Command tokenの区切り文字。 */
const commandTokenSeparator = " ";

/** 先頭と末尾の二重引用符に一致する正規表現。 */
const wrappingDoubleQuotePattern = /^"|"$/gu;

/**
 * 整理系command optionかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} 整理系optionならtrue。
 */
const isOrganizeOptionToken = (token: string): boolean =>
  token === previewOptionName || token === yesOptionName;

/**
 * 整理系commandの値tokenだけを抽出。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {readonly string[]} optionを除いた値token一覧。
 */
const createOrganizeValueTokens = (queryParts: readonly string[]): readonly string[] =>
  queryParts.filter((token) => !isOrganizeOptionToken(token));

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
 * Preview指定があるかを判定。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {boolean} preview指定があればtrue。
 */
const hasPreviewOption = (queryParts: readonly string[]): boolean =>
  queryParts.includes(previewOptionName);

/**
 * Yes指定があるかを判定。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {boolean} yes指定があればtrue。
 */
const hasYesOption = (queryParts: readonly string[]): boolean => queryParts.includes(yesOptionName);

/**
 * Mkdir commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {MakeDirectoryCommand} Mkdir command。
 */
export const parseMakeDirectoryCommand = (
  queryParts: readonly string[],
): MakeDirectoryCommand => ({
  kind: "mkdir",
  pathInput: joinValueTokens(createOrganizeValueTokens(queryParts)),
  preview: hasPreviewOption(queryParts),
  yes: hasYesOption(queryParts),
});

/**
 * Mv commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {MoveBookmarkCommand} Mv command。
 */
export const parseMoveBookmarkCommand = (
  queryParts: readonly string[],
): MoveBookmarkCommand => {
  const [targetInput = emptyString, ...targetFolderPathTokens] =
    createOrganizeValueTokens(queryParts);

  return {
    kind: "mv",
    preview: hasPreviewOption(queryParts),
    targetFolderPathInput: joinValueTokens(targetFolderPathTokens),
    targetInput,
    yes: hasYesOption(queryParts),
  };
};

/**
 * Rm commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {RemoveBookmarkCommand} Rm command。
 */
export const parseRemoveBookmarkCommand = (
  queryParts: readonly string[],
): RemoveBookmarkCommand => {
  const [targetInput = emptyString] = createOrganizeValueTokens(queryParts);

  return {
    kind: "rm",
    preview: hasPreviewOption(queryParts),
    targetInput,
    yes: hasYesOption(queryParts),
  };
};

/**
 * Rename commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {RenameBookmarkCommand} Rename command。
 */
export const parseRenameBookmarkCommand = (
  queryParts: readonly string[],
): RenameBookmarkCommand => {
  const [targetInput = emptyString, ...titleTokens] = createOrganizeValueTokens(queryParts);

  return {
    kind: "rename",
    preview: hasPreviewOption(queryParts),
    targetInput,
    titleInput: joinValueTokens(titleTokens),
    yes: hasYesOption(queryParts),
  };
};
