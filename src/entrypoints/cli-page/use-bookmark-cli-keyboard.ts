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

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Result cursor setter。 */
type ResultCursorSetter = Dispatch<SetStateAction<ResultCursorIndex>>;

/** Bookmark CLI keyboard hook入力。 */
export interface UseBookmarkCliKeyboardInput {
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
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
 * 選択中resultを補完へ使う。
 * @param {UseBookmarkCliKeyboardInput} input Bookmark CLI keyboard hook入力。
 * @returns {void} 返り値なし。
 */
const completeSelectedResult = (input: UseBookmarkCliKeyboardInput): void => {
  if (input.selectedResultIndex === resultCursorCleared) {
    return;
  }

  const selectedItem = input.commandState.resultItems[input.selectedResultIndex];

  if (typeof selectedItem !== "object") {
    return;
  }

  input.setInputValue(createBookmarkCliCompletionInput(selectedItem));
};

/**
 * 移動系keyboard actionを実行。
 * @param {UseBookmarkCliKeyboardInput} input Bookmark CLI keyboard hook入力。
 * @param {ReturnType<typeof resolveBookmarkCliKeyboardAction>} action keyboard action。
 * @returns {boolean} 処理済みならtrue。
 */
const executeMoveKeyboardAction = (
  input: UseBookmarkCliKeyboardInput,
  action: ReturnType<typeof resolveBookmarkCliKeyboardAction>,
): boolean => {
  if (action === "moveNext") {
    moveSelectedResultIndex(
      input.setSelectedResultIndex,
      "next",
      input.commandState.resultItems.length,
    );
    return true;
  }

  if (action === "movePrevious") {
    moveSelectedResultIndex(
      input.setSelectedResultIndex,
      "previous",
      input.commandState.resultItems.length,
    );
    return true;
  }

  return false;
};

/**
 * Keyboard actionを実行。
 * @param {UseBookmarkCliKeyboardInput} input Bookmark CLI keyboard hook入力。
 * @param {ReturnType<typeof resolveBookmarkCliKeyboardAction>} action keyboard action。
 * @returns {boolean} 処理済みならtrue。
 */
const executeKeyboardAction = (
  input: UseBookmarkCliKeyboardInput,
  action: ReturnType<typeof resolveBookmarkCliKeyboardAction>,
): boolean => {
  if (executeMoveKeyboardAction(input, action)) {
    return true;
  }

  if (action === "complete") {
    completeSelectedResult(input);
    return true;
  }

  if (action === "clear") {
    input.setSelectedResultIndex(resultCursorCleared);
    return true;
  }

  return false;
};

/**
 * Bookmark CLI keyboard hook。
 * @param {UseBookmarkCliKeyboardInput} input Bookmark CLI keyboard hook入力。
 * @returns {UseBookmarkCliKeyboardValue} Bookmark CLI keyboard hook戻り値。
 */
export const useBookmarkCliKeyboard = (
  input: UseBookmarkCliKeyboardInput,
): UseBookmarkCliKeyboardValue => {
  useEffect((): void => {
    input.setSelectedResultIndex((currentIndex) =>
      normalizeResultCursor(currentIndex, input.commandState.resultItems.length),
    );
  }, [input.commandState.resultItems.length, input.setSelectedResultIndex]);

  /**
   * 入力欄key操作をCLI keyboard actionへ変換。
   * @param {CommandInputKeyEvent} event 入力欄key event。
   * @returns {void} 返り値なし。
   */
  const handleInputKeyDown = (event: CommandInputKeyEvent): void => {
    const action = resolveBookmarkCliKeyboardAction(event);
    const handled = executeKeyboardAction(input, action);

    if (!handled) {
      return;
    }

    event.preventDefault();
  };

  return { handleInputKeyDown };
};
