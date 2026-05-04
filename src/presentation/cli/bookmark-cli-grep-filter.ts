import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";

/** Grep検索textの区切り文字です。 */
const grepTextSeparator = "\n";

/** 空文字です。 */
const emptyString = "";

/**
 * Grep filter結果です。
 */
export interface BookmarkCliGrepFilterResult {
  /**
   * Matchした元index一覧です。
   */
  readonly matchingIndexes: readonly number[];
  /**
   * Matchしたresult item一覧です。
   */
  readonly resultItems: readonly BookmarkCliResultItem[];
}

/**
 * Grep対象textを正規化します。
 * @param {string} value 正規化するtextです。
 * @returns {string} 正規化済みtextです。
 */
const normalizeGrepText = (value: string): string => value.toLowerCase();

/**
 * 任意の値をgrep対象textへ変換します。
 * @param {string | number | undefined} value 変換する値です。
 * @returns {string} grep対象textです。
 */
const stringifyGrepValue = (value: string | number | undefined): string =>
  String(value ?? emptyString);

/**
 * Result itemからgrep対象text一覧を作ります。
 * @param {BookmarkCliResultItem} item result itemです。
 * @returns {readonly string[]} grep対象text一覧です。
 */
const createResultItemGrepTextParts = (item: BookmarkCliResultItem): readonly string[] => [
  item.kind,
  item.title,
  item.folderPath,
  stringifyGrepValue(item.url),
  stringifyGrepValue(item.description),
  stringifyGrepValue(item.score),
  ...(item.details ?? []),
];

/**
 * Result itemからgrep対象textを作ります。
 * @param {BookmarkCliResultItem} item result itemです。
 * @returns {string} grep対象textです。
 */
const createResultItemGrepText = (item: BookmarkCliResultItem): string =>
  normalizeGrepText(createResultItemGrepTextParts(item).join(grepTextSeparator));

/**
 * Result itemがqueryに一致するかを判定します。
 * @param {BookmarkCliResultItem} item result itemです。
 * @param {string} normalizedQuery 正規化済みqueryです。
 * @returns {boolean} 一致するならtrueです。
 */
const doesResultItemMatchGrep = (item: BookmarkCliResultItem, normalizedQuery: string): boolean =>
  createResultItemGrepText(item).includes(normalizedQuery);

/**
 * Result item一覧をgrep queryで絞り込みます。
 * @param {readonly BookmarkCliResultItem[]} resultItems result item一覧です。
 * @param {string} queryInput grep query入力です。
 * @returns {BookmarkCliGrepFilterResult} grep filter結果です。
 */
export const filterBookmarkCliResultItemsByGrep = (
  resultItems: readonly BookmarkCliResultItem[],
  queryInput: string,
): BookmarkCliGrepFilterResult => {
  const normalizedQuery = normalizeGrepText(queryInput);
  const matchingIndexes: number[] = [];
  const filteredItems: BookmarkCliResultItem[] = [];

  for (const [index, item] of resultItems.entries()) {
    if (doesResultItemMatchGrep(item, normalizedQuery)) {
      matchingIndexes.push(index);
      filteredItems.push(item);
    }
  }

  return {
    matchingIndexes,
    resultItems: filteredItems,
  };
};
