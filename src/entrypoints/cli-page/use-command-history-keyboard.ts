import {
  type CommandHistoryCursorDirection,
  type CommandHistoryCursorIndex,
  commandHistoryCursorCleared,
  moveCommandHistoryCursor,
  normalizeCommandHistoryCursor,
} from "../../domain/storage/command-history-navigation";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** 空のitem count。 */
const emptyItemCount = 0;

/** Command history keyboardが参照する履歴entry。 */
interface CommandHistoryKeyboardEntry {
  /** 入力されたcommand文字列。 */
  readonly input: string;
}

/** Command history keyboard hook入力。 */
export interface UseCommandHistoryKeyboardInput {
  /** Command history一覧。 */
  readonly commandHistory: readonly CommandHistoryKeyboardEntry[];
  /** 現在のCLI入力値。 */
  readonly inputValue: string;
  /** 入力値setter。 */
  readonly setInputValue: InputValueSetter;
}

/** Command history keyboard hook戻り値。 */
export interface UseCommandHistoryKeyboardValue {
  /** Command history cursorを解除。 */
  readonly clearHistoryCursor: () => void;
  /** Command historyを入力欄へ反映。 */
  readonly moveCommandHistoryInput: (direction: CommandHistoryCursorDirection) => boolean;
}

/**
 * Command history item数を取得。
 * @param {readonly CommandHistoryKeyboardEntry[]} commandHistory Command history一覧。
 * @returns {number} command history item数。
 */
const getCommandHistoryItemCount = (
  commandHistory: readonly CommandHistoryKeyboardEntry[],
): number => commandHistory.length;

/**
 * Command history itemが存在するかを判定。
 * @param {number} itemCount Command history item数。
 * @returns {boolean} itemがあればtrue。
 */
const hasCommandHistoryItems = (itemCount: number): boolean => itemCount > emptyItemCount;

/**
 * Command history cursorに対応する入力値を取得。
 * @param {UseCommandHistoryKeyboardInput} input Command history keyboard hook入力。
 * @param {CommandHistoryCursorIndex} cursorIndex Command history cursor index。
 * @param {string} fallbackInput 履歴未選択時の入力値。
 * @returns {string} 入力欄へ反映する値。
 */
const getCommandHistoryInput = (
  input: UseCommandHistoryKeyboardInput,
  cursorIndex: CommandHistoryCursorIndex,
  fallbackInput: string,
): string => {
  if (cursorIndex === commandHistoryCursorCleared) {
    return fallbackInput;
  }

  return input.commandHistory[cursorIndex]?.input ?? fallbackInput;
};

/**
 * 履歴未選択へ戻るときの入力値を解決。
 * @param {UseCommandHistoryKeyboardInput} input Command history keyboard hook入力。
 * @param {CommandHistoryCursorIndex} historyCursorIndex 現在のcommand history cursor index。
 * @param {string} historyDraftInput 履歴選択前の入力値。
 * @returns {string} fallback入力値。
 */
const resolveFallbackInput = (
  input: UseCommandHistoryKeyboardInput,
  historyCursorIndex: CommandHistoryCursorIndex,
  historyDraftInput: string,
): string => {
  if (historyCursorIndex === commandHistoryCursorCleared) {
    return input.inputValue;
  }

  return historyDraftInput;
};

/**
 * Command history cursorを現在の件数へ正規化。
 * @param {UseCommandHistoryKeyboardInput} input Command history keyboard hook入力。
 * @param {Dispatch<SetStateAction<CommandHistoryCursorIndex>>} setHistoryCursorIndex command history cursor setter。
 * @returns {void} 返り値なし。
 */
const useNormalizedCommandHistoryCursor = (
  input: UseCommandHistoryKeyboardInput,
  setHistoryCursorIndex: Dispatch<SetStateAction<CommandHistoryCursorIndex>>,
): void => {
  useEffect((): void => {
    setHistoryCursorIndex((currentIndex) =>
      normalizeCommandHistoryCursor(currentIndex, getCommandHistoryItemCount(input.commandHistory)),
    );
  }, [input.commandHistory, setHistoryCursorIndex]);
};

/**
 * 履歴未選択時の入力値をdraftへ同期。
 * @param {string} inputValue 現在のCLI入力値。
 * @param {CommandHistoryCursorIndex} historyCursorIndex command history cursor index。
 * @param {Dispatch<SetStateAction<string>>} setHistoryDraftInput 履歴選択前入力値setter。
 * @returns {void} 返り値なし。
 */
const useSyncedHistoryDraftInput = (
  inputValue: string,
  historyCursorIndex: CommandHistoryCursorIndex,
  setHistoryDraftInput: Dispatch<SetStateAction<string>>,
): void => {
  useEffect((): void => {
    if (historyCursorIndex !== commandHistoryCursorCleared) {
      return;
    }

    setHistoryDraftInput(inputValue);
  }, [historyCursorIndex, inputValue, setHistoryDraftInput]);
};

/**
 * 履歴選択後に手入力された場合はhistory cursorを解除。
 * @param {UseCommandHistoryKeyboardInput} input Command history keyboard hook入力。
 * @param {CommandHistoryCursorIndex} historyCursorIndex command history cursor index。
 * @param {Dispatch<SetStateAction<CommandHistoryCursorIndex>>} setHistoryCursorIndex command history cursor setter。
 * @returns {void} 返り値なし。
 */
const useClearedEditedHistoryCursor = (
  input: UseCommandHistoryKeyboardInput,
  historyCursorIndex: CommandHistoryCursorIndex,
  setHistoryCursorIndex: Dispatch<SetStateAction<CommandHistoryCursorIndex>>,
): void => {
  useEffect((): void => {
    if (historyCursorIndex === commandHistoryCursorCleared) {
      return;
    }

    const historyInput = getCommandHistoryInput(input, historyCursorIndex, input.inputValue);

    if (historyInput !== input.inputValue) {
      setHistoryCursorIndex(commandHistoryCursorCleared);
    }
  }, [historyCursorIndex, input, input.inputValue, setHistoryCursorIndex]);
};

/** Command history移動入力。 */
interface MoveCommandHistoryInput {
  /** 移動方向。 */
  readonly direction: CommandHistoryCursorDirection;
  /** 現在のcommand history cursor index。 */
  readonly historyCursorIndex: CommandHistoryCursorIndex;
  /** 履歴選択前の入力値。 */
  readonly historyDraftInput: string;
  /** Command history keyboard hook入力。 */
  readonly input: UseCommandHistoryKeyboardInput;
  /** Command history cursor setter。 */
  readonly setHistoryCursorIndex: Dispatch<SetStateAction<CommandHistoryCursorIndex>>;
  /** 履歴選択前入力値setter。 */
  readonly setHistoryDraftInput: Dispatch<SetStateAction<string>>;
}

/**
 * Command historyを入力欄へ反映。
 * @param {MoveCommandHistoryInput} moveInput Command history移動入力。
 * @returns {boolean} 処理済みならtrue。
 */
const moveCommandHistoryInput = (moveInput: MoveCommandHistoryInput): boolean => {
  const itemCount = getCommandHistoryItemCount(moveInput.input.commandHistory);

  if (!hasCommandHistoryItems(itemCount)) {
    return false;
  }

  const nextCursorIndex = moveCommandHistoryCursor({
    currentIndex: moveInput.historyCursorIndex,
    direction: moveInput.direction,
    itemCount,
  });
  const fallbackInput = resolveFallbackInput(
    moveInput.input,
    moveInput.historyCursorIndex,
    moveInput.historyDraftInput,
  );

  if (moveInput.historyCursorIndex === commandHistoryCursorCleared) {
    moveInput.setHistoryDraftInput(moveInput.input.inputValue);
  }

  moveInput.setHistoryCursorIndex(nextCursorIndex);
  moveInput.input.setInputValue(
    getCommandHistoryInput(moveInput.input, nextCursorIndex, fallbackInput),
  );

  return true;
};

/**
 * Command history keyboard hook。
 * @param {UseCommandHistoryKeyboardInput} input Command history keyboard hook入力。
 * @returns {UseCommandHistoryKeyboardValue} Command history keyboard hook戻り値。
 */
export const useCommandHistoryKeyboard = (
  input: UseCommandHistoryKeyboardInput,
): UseCommandHistoryKeyboardValue => {
  const [historyCursorIndex, setHistoryCursorIndex] = useState<CommandHistoryCursorIndex>(
    commandHistoryCursorCleared,
  );
  const [historyDraftInput, setHistoryDraftInput] = useState(input.inputValue);

  useNormalizedCommandHistoryCursor(input, setHistoryCursorIndex);
  useSyncedHistoryDraftInput(input.inputValue, historyCursorIndex, setHistoryDraftInput);
  useClearedEditedHistoryCursor(input, historyCursorIndex, setHistoryCursorIndex);

  /**
   * Command history移動を入力値へ反映。
   * @param {CommandHistoryCursorDirection} direction 移動方向。
   * @returns {boolean} 処理済みならtrue。
   */
  const applyCommandHistoryInput = (direction: CommandHistoryCursorDirection): boolean =>
    moveCommandHistoryInput({
      direction,
      historyCursorIndex,
      historyDraftInput,
      input,
      setHistoryCursorIndex,
      setHistoryDraftInput,
    });

  /**
   * Command history cursorを解除。
   * @returns {void} 返り値なし。
   */
  const clearHistoryCursor = (): void => {
    setHistoryCursorIndex(commandHistoryCursorCleared);
  };

  return {
    clearHistoryCursor,
    moveCommandHistoryInput: applyCommandHistoryInput,
  };
};
