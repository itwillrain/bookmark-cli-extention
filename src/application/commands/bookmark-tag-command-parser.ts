import type { TagBookmarkCommand } from "./bookmark-command-types";

/** Tag削除option名。 */
const tagRemoveOptionName = "--remove";

/** 空文字。 */
const emptyString = "";

/**
 * Tokenがtag command optionかを判定。
 * @param {string} token 判定対象token。
 * @returns {boolean} optionならtrue。
 */
const isTagCommandOptionToken = (token: string): boolean => token === tagRemoveOptionName;

/**
 * Tag commandの操作対象token一覧を作成。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {readonly string[]} optionを除いたtoken一覧。
 */
const createTagCommandValueTokens = (queryParts: readonly string[]): readonly string[] =>
  queryParts.filter((token) => !isTagCommandOptionToken(token));

/**
 * Tag commandを解析。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧。
 * @returns {TagBookmarkCommand} Tag command。
 */
export const parseTagBookmarkCommand = (queryParts: readonly string[]): TagBookmarkCommand => {
  const valueTokens = createTagCommandValueTokens(queryParts);
  const [targetInput = emptyString, ...tagInputs] = valueTokens;

  return {
    kind: "tag",
    remove: queryParts.includes(tagRemoveOptionName),
    tagInputs,
    targetInput,
  };
};
