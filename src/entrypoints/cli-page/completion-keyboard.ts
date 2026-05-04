import {
  type CompletionCursorDirection,
  type CompletionCursorIndex,
  completionCursorCleared,
  moveCompletionCursor,
} from "../../domain/cli/completion-cursor";
import type { Dispatch, SetStateAction } from "react";
import { type ResultCursorIndex, resultCursorCleared } from "../../domain/bookmarks/result-cursor";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import type { CommandInputKeyEvent } from "../../presentation/cli/components/bookmark-cli-screen";
import { applyCommandLineEditState } from "./command-line-editing-keyboard";
import { createBookmarkCliCompletionInput } from "../../presentation/cli/bookmark-cli-view-model";
import { createBookmarkCliResultDefaultCommand } from "../../presentation/cli/bookmark-cli-result-default-command";

/** Command入力値を実行する関数。 */
type CommandInputExecutor = (inputValue: string) => Promise<void>;

/** Command実行失敗handler。 */
type CommandExecutionErrorHandler = () => void;

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Result cursor setter。 */
type ResultCursorSetter = Dispatch<SetStateAction<ResultCursorIndex>>;

/** Suggestion cursor setter。 */
type SuggestionCursorSetter = Dispatch<SetStateAction<CompletionCursorIndex>>;

/** 空のitem count。 */
const emptyItemCount = 0;

/** 空のinput value。 */
const emptyInputValue = "";

/** Completion keyboard action入力。 */
export interface CompletionKeyboardActionInput {
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
  /** Command入力値を実行する関数。 */
  readonly executeInputValue: CommandInputExecutor;
  /** 入力欄key event。 */
  readonly event: CommandInputKeyEvent;
  /** Command実行失敗handler。 */
  readonly handleCommandExecutionError: CommandExecutionErrorHandler;
  /** 現在のCLI入力値。 */
  readonly inputValue: string;
  /** 選択中result index。 */
  readonly selectedResultIndex: ResultCursorIndex;
  /** 選択中suggestion index。 */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
  /** 入力値setter。 */
  readonly setInputValue: InputValueSetter;
  /** Result cursor setter。 */
  readonly setSelectedResultIndex: ResultCursorSetter;
  /** Suggestion cursor setter。 */
  readonly setSelectedSuggestionIndex: SuggestionCursorSetter;
  /** 入力中commandのsuggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
}

/**
 * 候補itemが存在するかを判定。
 * @param {number} itemCount 候補件数。
 * @returns {boolean} 候補があればtrue。
 */
const hasItems = (itemCount: number): boolean => itemCount > emptyItemCount;

/**
 * Promptが空かを判定。
 * @param {string} inputValue 現在のCLI入力値。
 * @returns {boolean} 空ならtrue。
 */
const isEmptyInputValue = (inputValue: string): boolean => inputValue.trim() === emptyInputValue;

/**
 * Command suggestionを入力へ補完する。
 * @param {CommandInputKeyEvent} event 入力欄key event。
 * @param {InputValueSetter} setInputValue 入力値setter。
 * @param {BookmarkCliSuggestionItem} suggestionItem Command suggestion。
 * @returns {void} 返り値なし。
 */
const completeCommandSuggestion = (
  event: CommandInputKeyEvent,
  setInputValue: InputValueSetter,
  suggestionItem: BookmarkCliSuggestionItem,
): void => {
  applyCommandLineEditState(event.currentTarget, setInputValue, {
    selectionEnd: suggestionItem.completion.length,
    selectionStart: suggestionItem.completion.length,
    value: suggestionItem.completion,
  });
};

/**
 * 選択中suggestion itemを取得。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @returns {BookmarkCliSuggestionItem | false} 選択中suggestion item。
 */
const getSelectedSuggestionItem = (
  input: CompletionKeyboardActionInput,
): BookmarkCliSuggestionItem | false => {
  if (input.selectedSuggestionIndex === completionCursorCleared) {
    return false;
  }

  return input.suggestionItems[input.selectedSuggestionIndex] ?? false;
};

/**
 * 選択中result itemを取得。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @returns {BookmarkCliCommandState["resultItems"][number] | false} 選択中result item。
 */
const getSelectedResultItem = (
  input: CompletionKeyboardActionInput,
): BookmarkCliCommandState["resultItems"][number] | false => {
  if (input.selectedResultIndex === resultCursorCleared) {
    return false;
  }

  const selectedItem = input.commandState.resultItems[input.selectedResultIndex];

  if (typeof selectedItem !== "object") {
    return false;
  }

  return selectedItem;
};

/**
 * 選択中result itemの既定commandを取得する。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @returns {string | false} 既定command。存在しない場合はfalse。
 */
const resolveSelectedResultDefaultCommand = (
  input: CompletionKeyboardActionInput,
): string | false => {
  if (!isEmptyInputValue(input.inputValue) || input.selectedResultIndex === resultCursorCleared) {
    return false;
  }

  const selectedItem = getSelectedResultItem(input);

  if (selectedItem === false) {
    return false;
  }

  return createBookmarkCliResultDefaultCommand({
    item: selectedItem,
    resultIndex: input.selectedResultIndex,
  });
};

/**
 * 選択中result itemの既定commandを実行する。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @returns {boolean} 実行したならtrue。
 */
const executeSelectedResultDefaultCommand = (input: CompletionKeyboardActionInput): boolean => {
  const defaultCommand = resolveSelectedResultDefaultCommand(input);

  if (defaultCommand === false) {
    return false;
  }

  input.executeInputValue(defaultCommand).catch(input.handleCommandExecutionError);
  input.setSelectedResultIndex(resultCursorCleared);

  return true;
};

/**
 * 選択中result itemを入力へ補完する。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @returns {boolean} 補完したならtrue。
 */
const completeSelectedResult = (input: CompletionKeyboardActionInput): boolean => {
  const selectedItem = getSelectedResultItem(input);

  if (selectedItem === false) {
    return false;
  }

  input.setInputValue(createBookmarkCliCompletionInput(selectedItem, input.inputValue));
  input.setSelectedResultIndex(resultCursorCleared);

  return true;
};

/**
 * Suggestion cursorを指定方向の候補へ移動。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @param {CompletionCursorDirection} direction Completion cursor移動方向。
 * @returns {boolean} 処理済みならtrue。
 */
const selectSuggestion = (
  input: CompletionKeyboardActionInput,
  direction: CompletionCursorDirection,
): boolean => {
  if (!hasItems(input.suggestionItems.length)) {
    return false;
  }

  input.setSelectedSuggestionIndex((currentIndex) =>
    moveCompletionCursor({
      currentIndex,
      direction,
      itemCount: input.suggestionItems.length,
    }),
  );
  input.setSelectedResultIndex(resultCursorCleared);

  return true;
};

/**
 * Result cursorを指定方向の候補へ移動。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @param {CompletionCursorDirection} direction Completion cursor移動方向。
 * @returns {boolean} 処理済みならtrue。
 */
const selectResult = (
  input: CompletionKeyboardActionInput,
  direction: CompletionCursorDirection,
): boolean => {
  if (!hasItems(input.commandState.resultItems.length)) {
    return false;
  }

  input.setSelectedResultIndex((currentIndex) =>
    moveCompletionCursor({
      currentIndex,
      direction,
      itemCount: input.commandState.resultItems.length,
    }),
  );
  input.setSelectedSuggestionIndex(completionCursorCleared);

  return true;
};

/**
 * 補完候補を指定方向へ選択。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @param {CompletionCursorDirection} direction Completion cursor移動方向。
 * @returns {boolean} 処理済みならtrue。
 */
const selectCompletion = (
  input: CompletionKeyboardActionInput,
  direction: CompletionCursorDirection,
): boolean => {
  if (selectSuggestion(input, direction)) {
    return true;
  }

  return selectResult(input, direction);
};
/**
 * Tabで次の補完候補を選択。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @returns {boolean} 処理済みならtrue。
 */
export const executeSelectNextCompletionKeyboardAction = (
  input: CompletionKeyboardActionInput,
): boolean => selectCompletion(input, "next");

/**
 * Shift+Tabで前の補完候補を選択。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @returns {boolean} 処理済みならtrue。
 */
export const executeSelectPreviousCompletionKeyboardAction = (
  input: CompletionKeyboardActionInput,
): boolean => selectCompletion(input, "previous");

/**
 * Enterで選択中補完候補を確定。
 * @param {CompletionKeyboardActionInput} input Completion keyboard action入力。
 * @returns {boolean} 処理済みならtrue。
 */
export const executeConfirmCompletionKeyboardAction = (
  input: CompletionKeyboardActionInput,
): boolean => {
  const suggestionItem = getSelectedSuggestionItem(input);

  if (typeof suggestionItem === "object") {
    completeCommandSuggestion(input.event, input.setInputValue, suggestionItem);
    input.setSelectedSuggestionIndex(completionCursorCleared);

    return true;
  }

  if (executeSelectedResultDefaultCommand(input)) {
    return true;
  }

  return completeSelectedResult(input);
};
