import {
  type CompletionCursorIndex,
  completionCursorCleared,
} from "../../domain/cli/completion-cursor";
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";
import {
  type UseBookmarkCliKeyboardValue,
  useBookmarkCliKeyboard,
} from "./use-bookmark-cli-keyboard";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";
import type { BookmarkCliCursorState } from "./use-bookmark-cli-cursor-state";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import type { BookmarkRepositoryPort } from "../../application/bookmarks/bookmark-use-cases";
import { resultCursorCleared } from "../../domain/bookmarks/result-cursor";
import { suggestBookmarkCommandHistory } from "../../application/commands/bookmark-command-history-suggestion";
import { useBookmarkCliSuggestions } from "./use-bookmark-cli-suggestions";

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Command入力値を実行する関数。 */
type CommandInputExecutor = (inputValue: string) => Promise<void>;

/** CLI page close handler。 */
type CloseCliPageHandler = () => Promise<void>;

/** Command実行失敗handler。 */
type CommandExecutionErrorHandler = () => void;

/** 空のsuggestion item件数。 */
const emptySuggestionItemCount = 0;

/** 最初のsuggestion index。 */
const firstSuggestionIndex = 0;

/** Bookmark CLI app keyboard入力。 */
export interface UseBookmarkCliAppKeyboardInput {
  /** CLI pageを閉じる関数。 */
  readonly closeCliPage: CloseCliPageHandler;
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
  /** Cursor state。 */
  readonly cursors: BookmarkCliCursorState;
  /** Command入力値を実行する関数。 */
  readonly executeInputValue: CommandInputExecutor;
  /** Command実行失敗handler。 */
  readonly handleCommandExecutionError: CommandExecutionErrorHandler;
  /** 現在のCLI入力値。 */
  readonly inputValue: string;
  /** Bookmark Tree取得port。 */
  readonly repository: BookmarkRepositoryPort;
  /** 入力値setter。 */
  readonly setInputValue: InputValueSetter;
}

/** Bookmark CLI app keyboard戻り値。 */
export interface UseBookmarkCliAppKeyboardValue {
  /** Keyboard hook戻り値。 */
  readonly keyboard: UseBookmarkCliKeyboardValue;
  /** 入力中commandのsuggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
}

/** Command history suggestion state。 */
interface CommandHistorySuggestionState {
  /** Command history一覧を閉じる関数。 */
  readonly closeCommandHistoryList: () => void;
  /** Command history一覧を表示する関数。 */
  readonly showCommandHistoryList: () => boolean;
  /** 表示するsuggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
}

/**
 * Suggestion itemが存在するかを判定。
 * @param {readonly BookmarkCliSuggestionItem[]} suggestionItems suggestion item一覧。
 * @returns {boolean} suggestion itemがあればtrue。
 */
const hasSuggestionItems = (suggestionItems: readonly BookmarkCliSuggestionItem[]): boolean =>
  suggestionItems.length > emptySuggestionItemCount;

/**
 * 表示するsuggestion item一覧を選ぶ。
 * @param {boolean} historyListOpen command history一覧表示中か。
 * @param {readonly BookmarkCliSuggestionItem[]} historySuggestionItems command history suggestion一覧。
 * @param {readonly BookmarkCliSuggestionItem[]} commandSuggestionItems 通常command suggestion一覧。
 * @returns {readonly BookmarkCliSuggestionItem[]} 表示するsuggestion item一覧。
 */
const resolveVisibleSuggestionItems = (
  historyListOpen: boolean,
  historySuggestionItems: readonly BookmarkCliSuggestionItem[],
  commandSuggestionItems: readonly BookmarkCliSuggestionItem[],
): readonly BookmarkCliSuggestionItem[] => {
  if (historyListOpen) {
    return historySuggestionItems;
  }

  return commandSuggestionItems;
};

/**
 * 履歴一覧表示時の初期suggestion indexを解決。
 * @param {readonly BookmarkCliSuggestionItem[]} suggestionItems suggestion item一覧。
 * @returns {CompletionCursorIndex} 初期suggestion index。
 */
const resolveInitialHistorySuggestionIndex = (
  suggestionItems: readonly BookmarkCliSuggestionItem[],
): CompletionCursorIndex => {
  if (hasSuggestionItems(suggestionItems)) {
    return firstSuggestionIndex;
  }

  return completionCursorCleared;
};

/**
 * Command history suggestion stateを作成。
 * @param {UseBookmarkCliAppKeyboardInput} input Bookmark CLI app keyboard入力。
 * @param {readonly BookmarkCliSuggestionItem[]} commandSuggestionItems 通常command suggestion一覧。
 * @returns {CommandHistorySuggestionState} Command history suggestion state。
 */
const useCommandHistorySuggestionState = (
  input: UseBookmarkCliAppKeyboardInput,
  commandSuggestionItems: readonly BookmarkCliSuggestionItem[],
): CommandHistorySuggestionState => {
  const [historyListOpen, setHistoryListOpen] = useState(false);
  const historySuggestionItems = useMemo(
    () =>
      suggestBookmarkCommandHistory({
        commandHistory: input.commandState.extensionState.commandHistory,
        inputValue: input.inputValue,
      }),
    [input.commandState.extensionState.commandHistory, input.inputValue],
  );
  const suggestionItems = resolveVisibleSuggestionItems(
    historyListOpen,
    historySuggestionItems,
    commandSuggestionItems,
  );

  useEffect((): void => {
    setHistoryListOpen(false);
  }, [input.commandState.extensionState.commandHistory]);

  /**
   * Command history一覧を閉じる。
   * @returns {void} 返り値なし。
   */
  const closeCommandHistoryList = (): void => {
    setHistoryListOpen(false);
  };

  /**
   * Command history一覧をfloating suggestionとして開く。
   * @returns {boolean} 処理済みならtrue。
   */
  const showCommandHistoryList = (): boolean => {
    setHistoryListOpen(true);
    input.cursors.setSelectedResultIndex(resultCursorCleared);
    input.cursors.setSelectedSuggestionIndex(
      resolveInitialHistorySuggestionIndex(historySuggestionItems),
    );

    return true;
  };

  return { closeCommandHistoryList, showCommandHistoryList, suggestionItems };
};

/**
 * Bookmark CLI app向けkeyboard stateを作成。
 * @param {UseBookmarkCliAppKeyboardInput} input Bookmark CLI app keyboard入力。
 * @returns {UseBookmarkCliAppKeyboardValue} Bookmark CLI app keyboard戻り値。
 */
export const useBookmarkCliAppKeyboard = (
  input: UseBookmarkCliAppKeyboardInput,
): UseBookmarkCliAppKeyboardValue => {
  const commandSuggestionItems = useBookmarkCliSuggestions({
    commandAliases: input.commandState.extensionState.settings.commandAliases,
    currentDirectory: input.commandState.currentDirectory,
    inputValue: input.inputValue,
    repository: input.repository,
  });
  const commandHistorySuggestionState = useCommandHistorySuggestionState(
    input,
    commandSuggestionItems,
  );

  const keyboard = useBookmarkCliKeyboard({
    closeCliPage: input.closeCliPage,
    closeCommandHistoryList: commandHistorySuggestionState.closeCommandHistoryList,
    commandState: input.commandState,
    executeInputValue: input.executeInputValue,
    handleCommandExecutionError: input.handleCommandExecutionError,
    inputValue: input.inputValue,
    selectedResultIndex: input.cursors.selectedResultIndex,
    selectedSuggestionIndex: input.cursors.selectedSuggestionIndex,
    setInputValue: input.setInputValue,
    setSelectedResultIndex: input.cursors.setSelectedResultIndex,
    setSelectedSuggestionIndex: input.cursors.setSelectedSuggestionIndex,
    showCommandHistoryList: commandHistorySuggestionState.showCommandHistoryList,
    suggestionItems: commandHistorySuggestionState.suggestionItems,
  });

  return { keyboard, suggestionItems: commandHistorySuggestionState.suggestionItems };
};
