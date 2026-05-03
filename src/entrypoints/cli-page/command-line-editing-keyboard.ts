import {
  type CommandLineEditState,
  deleteCommandLinePreviousWord,
  killCommandLineAfterCursor,
  killCommandLineBeforeCursor,
  moveCommandLineCursorToEnd,
  moveCommandLineCursorToStart,
} from "../../domain/cli/command-line-editing";
import type { Dispatch, SetStateAction } from "react";
import type { BookmarkCliKeyboardAction } from "../../presentation/cli/bookmark-cli-keyboard";
import type { CommandInputElement } from "../../presentation/cli/components/bookmark-cli-screen";

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Command line編集関数。 */
type CommandLineEditOperation = (state: CommandLineEditState) => CommandLineEditState;

/** Command line編集対象のkeyboard action。 */
type CommandLineEditingKeyboardAction = Extract<
  BookmarkCliKeyboardAction,
  "deletePreviousWord" | "killAfterCursor" | "killBeforeCursor" | "lineEnd" | "lineStart"
>;

/** 選択位置fallback。 */
const selectionFallback = 0;

/** Command line編集対象action一覧。 */
const commandLineEditingActions = new Set<BookmarkCliKeyboardAction>([
  "deletePreviousWord",
  "killAfterCursor",
  "killBeforeCursor",
  "lineEnd",
  "lineStart",
]);

/** Command line編集actionごとの関数。 */
const commandLineEditOperations = {
  deletePreviousWord: deleteCommandLinePreviousWord,
  killAfterCursor: killCommandLineAfterCursor,
  killBeforeCursor: killCommandLineBeforeCursor,
  lineEnd: moveCommandLineCursorToEnd,
  lineStart: moveCommandLineCursorToStart,
} satisfies Readonly<Record<CommandLineEditingKeyboardAction, CommandLineEditOperation>>;

/**
 * Selection indexを数値へ正規化。
 * @param {number | null} selectionIndex selection index。
 * @param {number} fallback fallback index。
 * @returns {number} 正規化済みselection index。
 */
const normalizeSelectionIndex = (selectionIndex: number | null, fallback: number): number =>
  selectionIndex ?? fallback;

/**
 * 入力要素から編集状態を作成。
 * @param {CommandInputElement} element 入力要素。
 * @returns {CommandLineEditState} 編集状態。
 */
const createCommandLineEditState = (element: CommandInputElement): CommandLineEditState => ({
  selectionEnd: normalizeSelectionIndex(element.selectionEnd, element.value.length),
  selectionStart: normalizeSelectionIndex(element.selectionStart, selectionFallback),
  value: element.value,
});

/**
 * Selection更新をbrowser描画後へ予約。
 * @param {CommandInputElement} element 入力要素。
 * @param {number} selectionStart 選択範囲の開始index。
 * @param {number} selectionEnd 選択範囲の終端index。
 * @returns {void} 返り値なし。
 */
const scheduleSelectionUpdate = (
  element: CommandInputElement,
  selectionStart: number,
  selectionEnd: number,
): void => {
  globalThis.requestAnimationFrame((): void => {
    element.setSelectionRange(selectionStart, selectionEnd);
  });
};

/**
 * Command line編集対象actionかどうかを判定。
 * @param {BookmarkCliKeyboardAction} action Keyboard action。
 * @returns {boolean} Command line編集対象ならtrue。
 */
const isCommandLineEditingKeyboardAction = (
  action: BookmarkCliKeyboardAction,
): action is CommandLineEditingKeyboardAction => commandLineEditingActions.has(action);

/**
 * Keyboard actionに対応するcommand line編集関数を取得。
 * @param {BookmarkCliKeyboardAction} action Keyboard action。
 * @returns {CommandLineEditOperation | false} 編集関数。
 */
const getCommandLineEditOperation = (
  action: BookmarkCliKeyboardAction,
): CommandLineEditOperation | false => {
  if (isCommandLineEditingKeyboardAction(action)) {
    return commandLineEditOperations[action];
  }

  return false;
};

/**
 * Command line編集を入力要素へ反映。
 * @param {CommandInputElement} element 入力要素。
 * @param {InputValueSetter} setInputValue 入力値setter。
 * @param {CommandLineEditState} editState 反映する編集状態。
 * @returns {void} 返り値なし。
 */
export const applyCommandLineEditState = (
  element: CommandInputElement,
  setInputValue: InputValueSetter,
  editState: CommandLineEditState,
): void => {
  setInputValue(editState.value);
  scheduleSelectionUpdate(element, editState.selectionStart, editState.selectionEnd);
};

/**
 * Command line編集keyboard actionを実行。
 * @param {BookmarkCliKeyboardAction} action Keyboard action。
 * @param {CommandInputElement} element 入力要素。
 * @param {InputValueSetter} setInputValue 入力値setter。
 * @returns {boolean} 処理済みならtrue。
 */
export const executeCommandLineEditingKeyboardAction = (
  action: BookmarkCliKeyboardAction,
  element: CommandInputElement,
  setInputValue: InputValueSetter,
): boolean => {
  const operation = getCommandLineEditOperation(action);

  if (operation === false) {
    return false;
  }

  applyCommandLineEditState(element, setInputValue, operation(createCommandLineEditState(element)));

  return true;
};
