import {
  type CompletionCursorIndex,
  completionCursorCleared,
} from "../../domain/cli/completion-cursor";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type ResultCursorIndex, resultCursorCleared } from "../../domain/bookmarks/result-cursor";

/** Result cursor setter。 */
type ResultCursorSetter = Dispatch<SetStateAction<ResultCursorIndex>>;

/** Suggestion cursor setter。 */
type SuggestionCursorSetter = Dispatch<SetStateAction<CompletionCursorIndex>>;

/** Bookmark CLI cursor state。 */
export interface BookmarkCliCursorState {
  /** 選択中result index。 */
  readonly selectedResultIndex: ResultCursorIndex;
  /** 選択中suggestion index。 */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
  /** Result cursor setter。 */
  readonly setSelectedResultIndex: ResultCursorSetter;
  /** Suggestion cursor setter。 */
  readonly setSelectedSuggestionIndex: SuggestionCursorSetter;
}

/** 初期result cursor。 */
const initialResultCursor: ResultCursorIndex = resultCursorCleared;

/** 初期suggestion cursor。 */
const initialSuggestionCursor: CompletionCursorIndex = completionCursorCleared;

/**
 * Bookmark CLI cursor stateを作成。
 * @returns {BookmarkCliCursorState} Bookmark CLI cursor state。
 */
export const useBookmarkCliCursorState = (): BookmarkCliCursorState => {
  const [selectedResultIndex, setSelectedResultIndex] =
    useState<ResultCursorIndex>(initialResultCursor);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<CompletionCursorIndex>(initialSuggestionCursor);

  return {
    selectedResultIndex,
    selectedSuggestionIndex,
    setSelectedResultIndex,
    setSelectedSuggestionIndex,
  };
};
