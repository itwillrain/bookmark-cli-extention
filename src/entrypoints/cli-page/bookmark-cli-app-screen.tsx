import type { Dispatch, ReactElement, SetStateAction } from "react";
import type { BookmarkCliCommandState } from "../../presentation/cli/bookmark-cli-controller";
import { BookmarkCliScreen } from "../../presentation/cli/components/bookmark-cli-screen";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import type { ResultCursorIndex } from "../../domain/bookmarks/result-cursor";
import type { UseBookmarkCliKeyboardValue } from "./use-bookmark-cli-keyboard";

/** 入力値setter。 */
type InputValueSetter = Dispatch<SetStateAction<string>>;

/** Bookmark CLI app screen props。 */
export interface BookmarkCliAppScreenProps {
  /** 現在のcommand state。 */
  readonly commandState: BookmarkCliCommandState;
  /** CLI入力値。 */
  readonly inputValue: string;
  /** Keyboard hook戻り値。 */
  readonly keyboard: UseBookmarkCliKeyboardValue;
  /** 入力値setter。 */
  readonly setInputValue: InputValueSetter;
  /** 選択中result index。 */
  readonly selectedResultIndex: ResultCursorIndex;
  /** 入力中commandのsuggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
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
    onInputChange={props.setInputValue}
    onInputKeyDown={props.keyboard.handleInputKeyDown}
    onSubmit={props.onSubmit}
    preferNerdFont={props.commandState.extensionState.settings.preferNerdFont}
    resultItems={props.commandState.resultItems}
    resultViewStyle={props.commandState.extensionState.settings.resultViewStyle}
    selectedResultIndex={props.selectedResultIndex}
    statusText={props.commandState.statusText}
    suggestionItems={props.suggestionItems}
  />
);
