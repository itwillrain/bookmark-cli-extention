import { type Dispatch, type SetStateAction, useEffect } from "react";
import {
  type ResultCursorDirection,
  type ResultCursorIndex,
  moveResultCursor,
  normalizeResultCursor,
  resultCursorCleared,
} from "../../domain/bookmarks/result-cursor";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";
import type { CommandInputKeyEvent } from "../../presentation/cli/components/bookmark-cli-screen";
import { createBookmarkCliCompletionInput } from "../../presentation/cli/bookmark-cli-view-model";
import { resolveBookmarkCliKeyboardAction } from "../../presentation/cli/bookmark-cli-keyboard";
import { useCommandHistoryKeyboard } from "./use-command-history-keyboard";

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Result cursor setter。 */
type ResultCursorSetter = Dispatch<SetStateAction<ResultCursorIndex>>;

/** 空のitem count。 */
const emptyItemCount = 0;

/** 先頭result item index。 */
const firstResultItemIndex = 0;

/** Bookmark CLI keyboard hook入力。 */
export interface UseBookmarkCliKeyboardInput {
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
  /** 現在のCLI入力値。 */
  readonly inputValue: string;
  /** 選択中result index。 */
  readonly selectedResultIndex: ResultCursorIndex;
  /** 入力値setter。 */
  readonly setInputValue: InputValueSetter;
  /** Result cursor setter。 */
  readonly setSelectedResultIndex: ResultCursorSetter;
}

/** Bookmark CLI keyboard hook戻り値。 */
export interface UseBookmarkCliKeyboardValue {
  /** 入力欄key操作handler。 */
  readonly handleInputKeyDown: (event: CommandInputKeyEvent) => void;
}

/**
 * Result itemが表示されているかを判定。
 * @param {BookmarkCliCommandState} commandState 現在のcommand state。
 * @returns {boolean} 表示中ならtrue。
 */
const hasResultItems = (commandState: BookmarkCliCommandState): boolean =>
  commandState.resultItems.length > emptyItemCount;

/**
 * Result cursorを移動。
 * @param {ResultCursorSetter} setSelectedResultIndex Result cursor setter。
 * @param {ResultCursorDirection} direction 移動方向。
 * @param {number} itemCount Result item件数。
 * @returns {void} 返り値なし。
 */
const moveSelectedResultIndex = (
  setSelectedResultIndex: ResultCursorSetter,
  direction: ResultCursorDirection,
  itemCount: number,
): void => {
  setSelectedResultIndex((currentIndex) =>
    moveResultCursor({ currentIndex, direction, itemCount }),
  );
};

/**
 * 補完対象のresult item indexを解決。
 * @param {ResultCursorIndex} selectedResultIndex 選択中result index。
 * @returns {number} 補完対象index。
 */
const resolveCompletionTargetIndex = (selectedResultIndex: ResultCursorIndex): number => {
  if (selectedResultIndex === resultCursorCleared) {
    return firstResultItemIndex;
  }

  return selectedResultIndex;
};

/**
 * 選択中resultを補完へ使う。
 * @param {UseBookmarkCliKeyboardInput} input Bookmark CLI keyboard hook入力。
 * @returns {void} 返り値なし。
 */
const completeSelectedResult = (input: UseBookmarkCliKeyboardInput): void => {
  const targetIndex = resolveCompletionTargetIndex(input.selectedResultIndex);
  const selectedItem = input.commandState.resultItems[targetIndex];

  if (typeof selectedItem !== "object") {
    return;
  }

  input.setInputValue(createBookmarkCliCompletionInput(selectedItem));
};

/** 履歴系keyboard action実行入力。 */
interface ExecuteHistoryKeyboardActionInput {
  /** Command historyを入力欄へ反映する関数。 */
  readonly moveCommandHistoryInput: (direction: ResultCursorDirection) => boolean;
}

/**
 * 新しい履歴方向のkeyboard actionを実行。
 * @param {ExecuteHistoryKeyboardActionInput} input 履歴系keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeHistoryNextKeyboardAction = (input: ExecuteHistoryKeyboardActionInput): boolean =>
  input.moveCommandHistoryInput("next");

/**
 * 古い履歴方向のkeyboard actionを実行。
 * @param {ExecuteHistoryKeyboardActionInput} input 履歴系keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeHistoryPreviousKeyboardAction = (input: ExecuteHistoryKeyboardActionInput): boolean =>
  input.moveCommandHistoryInput("previous");

/** 移動系keyboard action実行入力。 */
interface ExecuteMoveKeyboardActionInput {
  /** Bookmark CLI keyboard hook入力。 */
  readonly input: UseBookmarkCliKeyboardInput;
}

/**
 * 次方向のkeyboard actionを実行。
 * @param {ExecuteMoveKeyboardActionInput} input 移動系keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeMoveNextKeyboardAction = (input: ExecuteMoveKeyboardActionInput): boolean => {
  if (!hasResultItems(input.input.commandState)) {
    return false;
  }

  moveSelectedResultIndex(
    input.input.setSelectedResultIndex,
    "next",
    input.input.commandState.resultItems.length,
  );

  return true;
};

/**
 * 前方向のkeyboard actionを実行。
 * @param {ExecuteMoveKeyboardActionInput} input 移動系keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeMovePreviousKeyboardAction = (input: ExecuteMoveKeyboardActionInput): boolean => {
  if (!hasResultItems(input.input.commandState)) {
    return false;
  }

  moveSelectedResultIndex(
    input.input.setSelectedResultIndex,
    "previous",
    input.input.commandState.resultItems.length,
  );

  return true;
};

/** Keyboard action実行入力。 */
interface ExecuteKeyboardActionInput {
  /** Bookmark CLI keyboard hook入力。 */
  readonly input: UseBookmarkCliKeyboardInput;
  /** Command history cursorを解除する関数。 */
  readonly clearHistoryCursor: () => void;
  /** Command historyを入力欄へ反映する関数。 */
  readonly moveCommandHistoryInput: (direction: ResultCursorDirection) => boolean;
}

/**
 * 補完keyboard actionを実行。
 * @param {ExecuteKeyboardActionInput} input Keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeCompleteKeyboardAction = (input: ExecuteKeyboardActionInput): boolean => {
  completeSelectedResult(input.input);

  return true;
};

/**
 * 解除keyboard actionを実行。
 * @param {ExecuteKeyboardActionInput} input Keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeClearKeyboardAction = (input: ExecuteKeyboardActionInput): boolean => {
  input.clearHistoryCursor();
  input.input.setSelectedResultIndex(resultCursorCleared);

  return true;
};

/**
 * 未処理keyboard actionを実行。
 * @returns {boolean} 処理しないためfalse。
 */
const executeNoneKeyboardAction = (): boolean => false;

/**
 * Keyboard action executorです。
 */
type KeyboardActionExecutor = (input: ExecuteKeyboardActionInput) => boolean;

/**
 * Keyboard actionごとのexecutorです。
 */
const keyboardActionExecutors = {
  clear: executeClearKeyboardAction,
  complete: executeCompleteKeyboardAction,
  historyNext: executeHistoryNextKeyboardAction,
  historyPrevious: executeHistoryPreviousKeyboardAction,
  none: executeNoneKeyboardAction,
  resultNext: executeMoveNextKeyboardAction,
  resultPrevious: executeMovePreviousKeyboardAction,
} satisfies Readonly<
  Record<ReturnType<typeof resolveBookmarkCliKeyboardAction>, KeyboardActionExecutor>
>;

/**
 * Keyboard actionを実行。
 * @param {ExecuteKeyboardActionInput} input Keyboard action実行入力。
 * @param {ReturnType<typeof resolveBookmarkCliKeyboardAction>} action keyboard action。
 * @returns {boolean} 処理済みならtrue。
 */
const executeKeyboardAction = (
  input: ExecuteKeyboardActionInput,
  action: ReturnType<typeof resolveBookmarkCliKeyboardAction>,
): boolean => keyboardActionExecutors[action](input);

/**
 * Result cursorを現在の件数へ正規化。
 * @param {UseBookmarkCliKeyboardInput} input Bookmark CLI keyboard hook入力。
 * @returns {void} 返り値なし。
 */
const useNormalizedResultCursor = (input: UseBookmarkCliKeyboardInput): void => {
  useEffect((): void => {
    input.setSelectedResultIndex((currentIndex) =>
      normalizeResultCursor(currentIndex, input.commandState.resultItems.length),
    );
  }, [input.commandState.resultItems.length, input.setSelectedResultIndex]);
};

/**
 * Bookmark CLI keyboard hook。
 * @param {UseBookmarkCliKeyboardInput} input Bookmark CLI keyboard hook入力。
 * @returns {UseBookmarkCliKeyboardValue} Bookmark CLI keyboard hook戻り値。
 */
export const useBookmarkCliKeyboard = (
  input: UseBookmarkCliKeyboardInput,
): UseBookmarkCliKeyboardValue => {
  const commandHistoryKeyboard = useCommandHistoryKeyboard({
    commandHistory: input.commandState.extensionState.commandHistory,
    inputValue: input.inputValue,
    setInputValue: input.setInputValue,
  });

  useNormalizedResultCursor(input);

  /**
   * 入力欄key操作をCLI keyboard actionへ変換。
   * @param {CommandInputKeyEvent} event 入力欄key event。
   * @returns {void} 返り値なし。
   */
  const handleInputKeyDown = (event: CommandInputKeyEvent): void => {
    const action = resolveBookmarkCliKeyboardAction(event);
    const handled = executeKeyboardAction(
      {
        clearHistoryCursor: commandHistoryKeyboard.clearHistoryCursor,
        input,
        moveCommandHistoryInput: commandHistoryKeyboard.moveCommandHistoryInput,
      },
      action,
    );

    if (!handled) {
      return;
    }

    event.preventDefault();
  };

  return { handleInputKeyDown };
};
