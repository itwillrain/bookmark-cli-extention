import {
  type CompletionCursorIndex,
  completionCursorCleared,
  normalizeCompletionCursor,
} from "../../domain/cli/completion-cursor";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import {
  type ResultCursorDirection,
  type ResultCursorIndex,
  normalizeResultCursor,
  resultCursorCleared,
} from "../../domain/bookmarks/result-cursor";
import {
  executeConfirmCompletionKeyboardAction,
  executeSelectNextCompletionKeyboardAction,
} from "./completion-keyboard";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import type { CommandInputKeyEvent } from "../../presentation/cli/components/bookmark-cli-screen";
import { executeCommandLineEditingKeyboardAction } from "./command-line-editing-keyboard";
import { resolveBookmarkCliKeyboardAction } from "../../presentation/cli/bookmark-cli-keyboard";
import { useCommandHistoryKeyboard } from "./use-command-history-keyboard";

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Result cursor setter。 */
type ResultCursorSetter = Dispatch<SetStateAction<ResultCursorIndex>>;

/** Suggestion cursor setter。 */
type SuggestionCursorSetter = Dispatch<SetStateAction<CompletionCursorIndex>>;

/** Bookmark CLI keyboard hook入力。 */
export interface UseBookmarkCliKeyboardInput {
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
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

/** Bookmark CLI keyboard hook戻り値。 */
export interface UseBookmarkCliKeyboardValue {
  /** 入力欄key操作handler。 */
  readonly handleInputKeyDown: (event: CommandInputKeyEvent) => void;
}

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

/** Context付きkeyboard action実行入力。 */
interface ExecuteContextKeyboardActionInput {
  /** Bookmark CLI keyboard hook入力。 */
  readonly input: UseBookmarkCliKeyboardInput;
  /** 入力欄key event。 */
  readonly event: CommandInputKeyEvent;
}

/** Keyboard action実行入力。 */
interface ExecuteKeyboardActionInput extends ExecuteContextKeyboardActionInput {
  /** Command history cursorを解除する関数。 */
  readonly clearHistoryCursor: () => void;
  /** Command historyを入力欄へ反映する関数。 */
  readonly moveCommandHistoryInput: (direction: ResultCursorDirection) => boolean;
}

/**
 * 補完候補確定keyboard actionを実行。
 * @param {ExecuteKeyboardActionInput} input Keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeConfirmCompletionKeyboardActionAdapter = (
  input: ExecuteKeyboardActionInput,
): boolean => executeConfirmCompletionKeyboardAction({ ...input.input, event: input.event });

/**
 * 次補完候補選択keyboard actionを実行。
 * @param {ExecuteKeyboardActionInput} input Keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeSelectNextCompletionKeyboardActionAdapter = (
  input: ExecuteKeyboardActionInput,
): boolean => executeSelectNextCompletionKeyboardAction({ ...input.input, event: input.event });

/**
 * 解除keyboard actionを実行。
 * @param {ExecuteKeyboardActionInput} input Keyboard action実行入力。
 * @returns {boolean} 処理済みならtrue。
 */
const executeClearKeyboardAction = (input: ExecuteKeyboardActionInput): boolean => {
  input.clearHistoryCursor();
  input.input.setSelectedResultIndex(resultCursorCleared);
  input.input.setSelectedSuggestionIndex(completionCursorCleared);

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
  confirmCompletion: executeConfirmCompletionKeyboardActionAdapter,
  deletePreviousWord: executeNoneKeyboardAction,
  historyNext: executeHistoryNextKeyboardAction,
  historyPrevious: executeHistoryPreviousKeyboardAction,
  killAfterCursor: executeNoneKeyboardAction,
  killBeforeCursor: executeNoneKeyboardAction,
  lineEnd: executeNoneKeyboardAction,
  lineStart: executeNoneKeyboardAction,
  none: executeNoneKeyboardAction,
  selectNextCompletion: executeSelectNextCompletionKeyboardActionAdapter,
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
 * Suggestion cursorを現在の件数へ正規化。
 * @param {UseBookmarkCliKeyboardInput} input Bookmark CLI keyboard hook入力。
 * @returns {void} 返り値なし。
 */
const useNormalizedSuggestionCursor = (input: UseBookmarkCliKeyboardInput): void => {
  useEffect((): void => {
    input.setSelectedSuggestionIndex((currentIndex) =>
      normalizeCompletionCursor(currentIndex, input.suggestionItems.length),
    );
  }, [input.setSelectedSuggestionIndex, input.suggestionItems.length]);
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
  useNormalizedSuggestionCursor(input);

  /**
   * 入力欄key操作をCLI keyboard actionへ変換。
   * @param {CommandInputKeyEvent} event 入力欄key event。
   * @returns {void} 返り値なし。
   */
  const handleInputKeyDown = (event: CommandInputKeyEvent): void => {
    const action = resolveBookmarkCliKeyboardAction(event);
    const edited = executeCommandLineEditingKeyboardAction(
      action,
      event.currentTarget,
      input.setInputValue,
    );

    if (edited) {
      event.preventDefault();

      return;
    }

    const handled = executeKeyboardAction(
      {
        clearHistoryCursor: commandHistoryKeyboard.clearHistoryCursor,
        event,
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
