import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";
import { BookmarkCliScreen } from "../../presentation/cli/components/bookmark-cli-screen";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import type { BookmarkCliTranscriptEntry } from "../../presentation/cli/bookmark-cli-transcript";
import type { CompletionCursorIndex } from "../../domain/cli/completion-cursor";
import type { ReactElement } from "react";
import type { ResultCursorIndex } from "../../domain/bookmarks/result-cursor";
import type { UseBookmarkCliKeyboardValue } from "./use-bookmark-cli-keyboard";

/** 入力値変更handler。 */
type InputChangeHandler = (value: string) => void;

/** Bookmark CLI app screen props。 */
export interface BookmarkCliAppScreenProps {
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
  /** CLI入力値。 */
  readonly inputValue: string;
  /** Keyboard hook戻り値。 */
  readonly keyboard: UseBookmarkCliKeyboardValue;
  /** 入力値変更handler。 */
  readonly onInputChange: InputChangeHandler;
  /** 選択中result index。 */
  readonly selectedResultIndex: ResultCursorIndex;
  /** 選択中suggestion index。 */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
  /** 入力中commandのsuggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
  /** 実行済みcommand transcript。 */
  readonly transcriptEntries: readonly BookmarkCliTranscriptEntry[];
  /** Submit callback。 */
  readonly onSubmit: () => void;
}

/**
 * Bookmark CLI screenへapp stateを接続。
 * @param {BookmarkCliAppScreenProps} props Bookmark CLI app screen props。
 * @returns {ReactElement} Bookmark CLI screen element。
 */
export const BookmarkCliAppScreen = (props: BookmarkCliAppScreenProps): ReactElement => (
  <BookmarkCliScreen
    inputValue={props.inputValue}
    onInputChange={props.onInputChange}
    onInputKeyDown={props.keyboard.handleInputKeyDown}
    onSubmit={props.onSubmit}
    preferNerdFont={props.commandState.extensionState.settings.preferNerdFont}
    promptStyle={props.commandState.extensionState.settings.promptStyle}
    selectedResultIndex={props.selectedResultIndex}
    selectedSuggestionIndex={props.selectedSuggestionIndex}
    statusText={props.commandState.statusText}
    suggestionItems={props.suggestionItems}
    transcriptEntries={props.transcriptEntries}
  />
);
