import {
  type CompletionCursorIndex,
  completionCursorCleared,
} from "../../domain/cli/completion-cursor";

/**
 * Suggestion scrollIntoView options。
 */
export type BookmarkCliSuggestionScrollOptions = Readonly<ScrollIntoViewOptions>;

/**
 * Suggestion scroll対象の最小shape。
 */
export interface BookmarkCliSuggestionScrollTarget {
  /** 対象要素を表示範囲へscrollする。 */
  readonly scrollIntoView: (options: BookmarkCliSuggestionScrollOptions) => void;
}

/**
 * 選択中suggestion scroll入力。
 */
export interface ScrollSelectedBookmarkCliSuggestionInput {
  /** 選択中suggestion index。 */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
  /** Scroll対象要素。 */
  readonly target: BookmarkCliSuggestionScrollTarget | null;
}

/** 選択中候補を表示範囲へ入れるblock指定。 */
const suggestionScrollBlock = "nearest";

/** 選択中候補を表示範囲へ入れるinline指定。 */
const suggestionScrollInline = "nearest";

/** Suggestion scroll option。 */
const suggestionScrollOptions = {
  block: suggestionScrollBlock,
  inline: suggestionScrollInline,
} as const satisfies ScrollIntoViewOptions;

/**
 * 選択中suggestionを表示範囲へscrollする。
 * @param {ScrollSelectedBookmarkCliSuggestionInput} input 選択中suggestion scroll入力。
 * @returns {boolean} scrollした場合はtrue。
 */
export const scrollSelectedBookmarkCliSuggestionIntoView = (
  input: ScrollSelectedBookmarkCliSuggestionInput,
): boolean => {
  if (input.selectedSuggestionIndex === completionCursorCleared || input.target === null) {
    return false;
  }

  input.target.scrollIntoView(suggestionScrollOptions);

  return true;
};
