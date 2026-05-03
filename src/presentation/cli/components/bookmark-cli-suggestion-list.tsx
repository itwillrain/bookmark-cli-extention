import type { CompletionCursorIndex } from "../../../domain/cli/completion-cursor";
import type { ReactElement } from "react";

/**
 * Bookmark CLI suggestion item。
 */
export interface BookmarkCliSuggestionItem {
  /** Command名。 */
  readonly commandName: string;
  /** 補完後の入力値。 */
  readonly completion: string;
  /** Command説明。 */
  readonly description: string;
}

/**
 * Bookmark CLI suggestion list props。
 */
export interface BookmarkCliSuggestionListProps {
  /** 選択中suggestion index。 */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
  /** 表示するsuggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
}

/** 空のitem count。 */
const emptyItemCount = 0;

/** Floating suggestion popoverのclassName。 */
const suggestionListPopoverClassName = "pointer-events-none absolute inset-x-4 bottom-14 z-20";

/** Floating suggestion listのclassName。 */
const suggestionListClassName =
  "max-h-56 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950/95 p-1 shadow-2xl shadow-black/50 backdrop-blur";

/** 選択中suggestion itemのclassName。 */
const selectedSuggestionItemClassName =
  "grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_auto] items-center gap-3 rounded-sm bg-zinc-800/80 px-2 py-1 text-xs text-zinc-100 ring-1 ring-emerald-700/50";

/** 通常suggestion itemのclassName。 */
const suggestionItemClassName =
  "grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_auto] items-center gap-3 rounded-sm px-2 py-1 text-xs text-zinc-300";

/** Suggestion item描画入力。 */
interface SuggestionItemRenderInput {
  /** Suggestion item。 */
  readonly suggestionItem: BookmarkCliSuggestionItem;
  /** Suggestion item index。 */
  readonly suggestionItemIndex: number;
  /** 選択中suggestion index。 */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
}

/**
 * Suggestion itemが選択中かを判定。
 * @param {SuggestionItemRenderInput} input Suggestion item描画入力。
 * @returns {boolean} 選択中ならtrue。
 */
const isSelectedSuggestionItem = (input: SuggestionItemRenderInput): boolean =>
  input.selectedSuggestionIndex !== false &&
  input.selectedSuggestionIndex === input.suggestionItemIndex;

/**
 * Suggestion itemのclassNameを作る。
 * @param {SuggestionItemRenderInput} input Suggestion item描画入力。
 * @returns {string} Suggestion item className。
 */
const createSuggestionItemClassName = (input: SuggestionItemRenderInput): string => {
  if (isSelectedSuggestionItem(input)) {
    return selectedSuggestionItemClassName;
  }

  return suggestionItemClassName;
};

/**
 * Suggestion itemを描画。
 * @param {SuggestionItemRenderInput} input Suggestion item描画入力。
 * @returns {ReactElement} Suggestion item element。
 */
const renderSuggestionItem = (input: SuggestionItemRenderInput): ReactElement => (
  <li
    aria-selected={isSelectedSuggestionItem(input)}
    className={createSuggestionItemClassName(input)}
    key={input.suggestionItem.commandName}
    role="option"
  >
    <span className="truncate font-semibold text-emerald-300">
      {input.suggestionItem.commandName}
    </span>
    <span className="truncate text-zinc-400">{input.suggestionItem.description}</span>
    <kbd className="rounded border border-zinc-700 px-1.5 py-0.5 text-[0.6875rem] text-zinc-500">
      Tab
    </kbd>
  </li>
);

/**
 * Floating command suggestion listを描画。
 * @param {BookmarkCliSuggestionListProps} props Suggestion list props。
 * @returns {ReactElement | null} Suggestion list element。
 */
export const BookmarkCliSuggestionList = (
  props: BookmarkCliSuggestionListProps,
): ReactElement | false => {
  if (props.suggestionItems.length === emptyItemCount) {
    return false;
  }

  return (
    <aside
      aria-label="Command suggestions"
      className={suggestionListPopoverClassName}
      data-layout="floating"
    >
      <ol className={suggestionListClassName} role="listbox">
        {props.suggestionItems.map((suggestionItem, suggestionItemIndex) =>
          renderSuggestionItem({
            selectedSuggestionIndex: props.selectedSuggestionIndex,
            suggestionItem,
            suggestionItemIndex,
          }),
        )}
      </ol>
    </aside>
  );
};
