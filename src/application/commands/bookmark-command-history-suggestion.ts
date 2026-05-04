import type { BookmarkCommandSuggestion } from "./bookmark-command-suggestion";

/** Command history suggestionが参照する履歴entry。 */
export interface BookmarkCommandHistorySuggestionEntry {
  /** 入力されたcommand文字列。 */
  readonly input: string;
  /** 実行日時ISO文字列。 */
  readonly executedAt: string;
}

/** Command history suggestion入力。 */
export interface SuggestBookmarkCommandHistoryInput {
  /** Command history一覧。 */
  readonly commandHistory: readonly BookmarkCommandHistorySuggestionEntry[];
  /** 現在のCLI入力値。 */
  readonly inputValue: string;
}

/** 空文字。 */
const emptyString = "";

/** History suggestion表示番号の開始値。 */
const firstHistorySuggestionNumber = 1;

/** History suggestion label prefix。 */
const historySuggestionLabelPrefix = "#";

/** 履歴一覧に表示する最大件数。 */
const maxHistorySuggestionCount = 12;

/** Slice開始index。 */
const sliceStartIndex = 0;

/**
 * 履歴検索queryを正規化。
 * @param {string} inputValue 現在のCLI入力値。
 * @returns {string} 正規化済みquery。
 */
const normalizeHistorySuggestionQuery = (inputValue: string): string =>
  inputValue.trim().toLowerCase();

/**
 * 履歴entryがqueryに一致するか判定。
 * @param {BookmarkCommandHistorySuggestionEntry} entry Command history entry。
 * @param {string} query 正規化済みquery。
 * @returns {boolean} 一致するならtrue。
 */
const historyEntryMatchesQuery = (
  entry: BookmarkCommandHistorySuggestionEntry,
  query: string,
): boolean => query === emptyString || entry.input.toLowerCase().includes(query);

/**
 * 履歴候補labelを作成。
 * @param {number} index 表示順index。
 * @returns {string} 履歴候補label。
 */
const createHistorySuggestionLabel = (index: number): string =>
  `${historySuggestionLabelPrefix}${String(index + firstHistorySuggestionNumber)}`;

/**
 * Command history entryをsuggestionへ変換。
 * @param {BookmarkCommandHistorySuggestionEntry} entry Command history entry。
 * @param {number} index 表示順index。
 * @returns {BookmarkCommandSuggestion} Command history suggestion。
 */
const createHistorySuggestion = (
  entry: BookmarkCommandHistorySuggestionEntry,
  index: number,
): BookmarkCommandSuggestion => ({
  commandName: createHistorySuggestionLabel(index),
  completion: entry.input,
  description: entry.input,
});

/**
 * Command historyをfloating suggestion向けに変換。
 * @param {SuggestBookmarkCommandHistoryInput} input Command history suggestion入力。
 * @returns {readonly BookmarkCommandSuggestion[]} Command history suggestion一覧。
 * @example
 * ```ts
 * const result = suggestBookmarkCommandHistory({
 *   commandHistory: [{ input: "go Stripe", executedAt: "2026-05-05T00:00:00.000Z" }],
 *   inputValue: "stripe",
 * });
 * ```
 */
export const suggestBookmarkCommandHistory = (
  input: SuggestBookmarkCommandHistoryInput,
): readonly BookmarkCommandSuggestion[] => {
  const query = normalizeHistorySuggestionQuery(input.inputValue);

  return input.commandHistory
    .toReversed()
    .filter((entry) => historyEntryMatchesQuery(entry, query))
    .slice(sliceStartIndex, maxHistorySuggestionCount)
    .map((entry, index) => createHistorySuggestion(entry, index));
};
