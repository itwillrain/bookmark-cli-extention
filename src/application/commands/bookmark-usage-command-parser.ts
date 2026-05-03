import type {
  FrequentBookmarksCommand,
  RecentBookmarksCommand,
} from "./bookmark-usage-command-types";

/** Limit option名。 */
const limitOptionName = "--limit";

/** Option値を読むoffset。 */
const optionValueOffset = 1;

/** 見つからないindex。 */
const missingIndex = -1;

/** 10進数parseに使うradix。 */
const decimalRadix = 10;

/** 最小limit値。 */
const minimumLimit = 1;

/**
 * Limit optionのindexを取得。
 * @param {readonly string[]} queryParts command query token一覧。
 * @returns {number} limit option index。
 */
const findLimitOptionIndex = (queryParts: readonly string[]): number =>
  queryParts.indexOf(limitOptionName);

/**
 * Limit option値を解析。
 * @param {readonly string[]} queryParts command query token一覧。
 * @returns {number | false} limit値。
 */
const parseLimitOption = (queryParts: readonly string[]): number | false => {
  const optionIndex = findLimitOptionIndex(queryParts);

  if (optionIndex === missingIndex) {
    return false;
  }

  const parsedLimit = Number.parseInt(
    queryParts[optionIndex + optionValueOffset] ?? "",
    decimalRadix,
  );

  if (parsedLimit < minimumLimit || Number.isNaN(parsedLimit)) {
    return false;
  }

  return parsedLimit;
};

/**
 * Limit optionをcommandへ反映。
 * @param {TCommand} command 利用統計command。
 * @param {number | false} limit limit値。
 * @returns {TCommand} limit反映済みcommand。
 */
const applyLimitOption = <TCommand extends RecentBookmarksCommand | FrequentBookmarksCommand>(
  command: TCommand,
  limit: number | false,
): TCommand => {
  if (limit === false) {
    return command;
  }

  return { ...command, limit };
};

/**
 * Recent commandを解析。
 * @param {readonly string[]} queryParts command query token一覧。
 * @returns {RecentBookmarksCommand} Recent command。
 */
export const parseRecentBookmarksCommand = (
  queryParts: readonly string[],
): RecentBookmarksCommand => applyLimitOption({ kind: "recent" }, parseLimitOption(queryParts));

/**
 * Freq commandを解析。
 * @param {readonly string[]} queryParts command query token一覧。
 * @returns {FrequentBookmarksCommand} Freq command。
 */
export const parseFrequentBookmarksCommand = (
  queryParts: readonly string[],
): FrequentBookmarksCommand => applyLimitOption({ kind: "freq" }, parseLimitOption(queryParts));
