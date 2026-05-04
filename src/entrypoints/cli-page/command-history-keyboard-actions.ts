import type { ResultCursorDirection } from "../../domain/bookmarks/result-cursor";

/** 履歴系keyboard action実行入力。 */
export interface ExecuteHistoryKeyboardActionInput {
  /** Command historyを入力欄へ反映する関数。 */
  readonly moveCommandHistoryInput: (direction: ResultCursorDirection) => boolean;
}

/** Command history一覧表示keyboard action入力。 */
export interface ExecuteShowHistoryListKeyboardActionInput {
  /** Command history一覧を表示する関数。 */
  readonly showCommandHistoryList: () => boolean;
}

/**
 * 新しい履歴方向のkeyboard actionを実行。
 * @param {ExecuteHistoryKeyboardActionInput} input 履歴系keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
export const executeHistoryNextKeyboardAction = (
  input: ExecuteHistoryKeyboardActionInput,
): boolean => input.moveCommandHistoryInput("next");

/**
 * 古い履歴方向のkeyboard actionを実行。
 * @param {ExecuteHistoryKeyboardActionInput} input 履歴系keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
export const executeHistoryPreviousKeyboardAction = (
  input: ExecuteHistoryKeyboardActionInput,
): boolean => input.moveCommandHistoryInput("previous");

/**
 * Command history一覧表示keyboard actionを実行。
 * @param {ExecuteShowHistoryListKeyboardActionInput} input keyboard action入力。
 * @returns {boolean} 処理済みならtrue。
 */
export const executeShowHistoryListKeyboardAction = (
  input: ExecuteShowHistoryListKeyboardActionInput,
): boolean => input.showCommandHistoryList();
