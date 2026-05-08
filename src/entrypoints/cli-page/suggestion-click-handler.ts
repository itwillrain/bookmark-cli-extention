import type {
  BookmarkCliSuggestionClickHandler,
  BookmarkCliSuggestionItem,
} from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import { completionCursorCleared } from "../../domain/cli/completion-cursor";
import { resultCursorCleared } from "../../domain/bookmarks/result-cursor";

/** 入力値setter。 */
type InputValueSetter = (value: string) => void;

/** Result cursor setter。 */
type ResultCursorSetter = (value: typeof resultCursorCleared) => void;

/** Suggestion cursor setter。 */
type SuggestionCursorSetter = (value: typeof completionCursorCleared) => void;

/** Suggestion click handler作成入力。 */
export interface CreateBookmarkCliSuggestionClickHandlerInput {
  /** 入力値setter。 */
  readonly setInputValue: InputValueSetter;
  /** Result cursor setter。 */
  readonly setSelectedResultIndex: ResultCursorSetter;
  /** Suggestion cursor setter。 */
  readonly setSelectedSuggestionIndex: SuggestionCursorSetter;
}

/**
 * Suggestion itemから入力へ反映する値を取り出す。
 * @param {BookmarkCliSuggestionItem} suggestionItem Suggestion item。
 * @returns {string} 入力へ反映する補完値。
 * @example
 * ```ts
 * const value = resolveSuggestionCompletionValue({
 *   commandName: "./Admin",
 *   completion: "rm ./Admin",
 *   description: "/Work/Admin",
 * });
 * ```
 */
export const resolveSuggestionCompletionValue = (
  suggestionItem: BookmarkCliSuggestionItem,
): string => suggestionItem.completion;

/**
 * Pointerで選ばれたsuggestionを入力へ確定するhandlerを作成。
 * @param {CreateBookmarkCliSuggestionClickHandlerInput} input Suggestion click handler作成入力。
 * @returns {BookmarkCliSuggestionClickHandler} Suggestion click handler。
 * @example
 * ```ts
 * const handleSuggestionClick = createBookmarkCliSuggestionClickHandler({
 *   setInputValue,
 *   setSelectedResultIndex,
 *   setSelectedSuggestionIndex,
 * });
 * ```
 */
export const createBookmarkCliSuggestionClickHandler =
  (input: CreateBookmarkCliSuggestionClickHandlerInput): BookmarkCliSuggestionClickHandler =>
  (suggestionItem: BookmarkCliSuggestionItem): void => {
    input.setInputValue(resolveSuggestionCompletionValue(suggestionItem));
    input.setSelectedResultIndex(resultCursorCleared);
    input.setSelectedSuggestionIndex(completionCursorCleared);
  };
