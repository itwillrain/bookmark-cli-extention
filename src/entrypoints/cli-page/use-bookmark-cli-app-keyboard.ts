import type { Dispatch, SetStateAction } from "react";
import {
  type UseBookmarkCliKeyboardValue,
  useBookmarkCliKeyboard,
} from "./use-bookmark-cli-keyboard";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";
import type { BookmarkCliCursorState } from "./use-bookmark-cli-cursor-state";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import type { BookmarkRepositoryPort } from "../../application/bookmarks/bookmark-use-cases";
import { useBookmarkCliSuggestions } from "./use-bookmark-cli-suggestions";

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Command入力値を実行する関数。 */
type CommandInputExecutor = (inputValue: string) => Promise<void>;

/** CLI page close handler。 */
type CloseCliPageHandler = () => Promise<void>;

/** Command実行失敗handler。 */
type CommandExecutionErrorHandler = () => void;

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

/**
 * Bookmark CLI app向けkeyboard stateを作成。
 * @param {UseBookmarkCliAppKeyboardInput} input Bookmark CLI app keyboard入力。
 * @returns {UseBookmarkCliAppKeyboardValue} Bookmark CLI app keyboard戻り値。
 */
export const useBookmarkCliAppKeyboard = (
  input: UseBookmarkCliAppKeyboardInput,
): UseBookmarkCliAppKeyboardValue => {
  const suggestionItems = useBookmarkCliSuggestions({
    currentDirectory: input.commandState.currentDirectory,
    inputValue: input.inputValue,
    repository: input.repository,
  });
  const keyboard = useBookmarkCliKeyboard({
    closeCliPage: input.closeCliPage,
    commandState: input.commandState,
    executeInputValue: input.executeInputValue,
    handleCommandExecutionError: input.handleCommandExecutionError,
    inputValue: input.inputValue,
    selectedResultIndex: input.cursors.selectedResultIndex,
    selectedSuggestionIndex: input.cursors.selectedSuggestionIndex,
    setInputValue: input.setInputValue,
    setSelectedResultIndex: input.cursors.setSelectedResultIndex,
    setSelectedSuggestionIndex: input.cursors.setSelectedSuggestionIndex,
    suggestionItems,
  });

  return { keyboard, suggestionItems };
};
