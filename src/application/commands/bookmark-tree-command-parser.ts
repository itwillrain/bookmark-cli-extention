import type { ShowDirectoryTreeCommand } from "./bookmark-command-types";
import { defaultBookmarkTreeDepth } from "../../domain/bookmarks/bookmark-tree-view";

/**
 * 空command名です。
 */
const emptyCommandName = "";

/**
 * Command tokenの区切り文字です。
 */
const commandTokenSeparator = " ";

/**
 * Tree depth option名です。
 */
const treeDepthOptionName = "--depth";

/**
 * 見つからなかったindex値です。
 */
const missingIndex = -1;

/**
 * 次のtokenへ進むindex offsetです。
 */
const nextTokenOffset = 1;

/**
 * 有効なtree depthの最小値です。
 */
const minimumTreeDepth = 1;

/**
 * 10進数parseに使うradixです。
 */
const decimalRadix = 10;

/**
 * 数字だけのdepth値に一致する正規表現です。
 */
const treeDepthPattern = /^\d+$/u;

/**
 * Command token一覧からquery部分を取り出します。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {string} Query文字列です。
 */
const joinQueryParts = (queryParts: readonly string[]): string =>
  queryParts.join(commandTokenSeparator);

/**
 * Tree depth optionのindexを取得します。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {number} Tree depth optionのindexです。
 */
const findTreeDepthOptionIndex = (queryParts: readonly string[]): number =>
  queryParts.indexOf(treeDepthOptionName);

/**
 * 入力を有効なtree depthへ変換できるかを判定します。
 * @param {string} depthInput depth tokenです。
 * @returns {boolean} 有効なtree depthならtrueです。
 */
const isTreeDepthInput = (depthInput: string): boolean => treeDepthPattern.test(depthInput);

/**
 * Tree depth tokenを数値へ変換します。
 * @param {string} depthInput depth tokenです。
 * @returns {number} Tree表示のdepthです。
 */
const parseTreeDepth = (depthInput: string): number => {
  if (!isTreeDepthInput(depthInput)) {
    return defaultBookmarkTreeDepth;
  }

  const parsedDepth = Number.parseInt(depthInput, decimalRadix);

  if (parsedDepth < minimumTreeDepth) {
    return defaultBookmarkTreeDepth;
  }

  return parsedDepth;
};

/**
 * Tree depth optionからdepth値を取り出します。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @param {number} depthOptionIndex depth optionのindexです。
 * @returns {number} Tree表示のdepthです。
 */
const resolveTreeDepth = (queryParts: readonly string[], depthOptionIndex: number): number => {
  if (depthOptionIndex === missingIndex) {
    return defaultBookmarkTreeDepth;
  }

  const depthTokenIndex = depthOptionIndex + nextTokenOffset;
  const depthToken = queryParts[depthTokenIndex] ?? emptyCommandName;

  return parseTreeDepth(depthToken);
};

/**
 * Tree path token一覧を取り出します。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @param {number} depthOptionIndex depth optionのindexです。
 * @returns {readonly string[]} Tree path token一覧です。
 */
const getTreePathParts = (
  queryParts: readonly string[],
  depthOptionIndex: number,
): readonly string[] => {
  if (depthOptionIndex === missingIndex) {
    return queryParts;
  }

  return queryParts.slice(missingIndex + nextTokenOffset, depthOptionIndex);
};

/**
 * Tree commandを作ります。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {ShowDirectoryTreeCommand} Tree commandです。
 * @example
 * ```ts
 * const result = parseShowDirectoryTreeCommand(["--depth", "2", "./Work"]);
 * // { kind: "tree", depth: 2, pathInput: "./Work" }
 * ```
 */
export const parseShowDirectoryTreeCommand = (
  queryParts: readonly string[],
): ShowDirectoryTreeCommand => {
  const depthOptionIndex = findTreeDepthOptionIndex(queryParts);
  const depth = resolveTreeDepth(queryParts, depthOptionIndex);
  const pathParts = getTreePathParts(queryParts, depthOptionIndex);

  return {
    depth,
    kind: "tree",
    pathInput: joinQueryParts(pathParts),
  };
};
