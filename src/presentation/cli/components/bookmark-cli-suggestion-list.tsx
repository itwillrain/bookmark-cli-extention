/* oxlint-disable typescript-eslint/prefer-readonly-parameter-types -- ReactのCSSProperties propsに合わせるため。 */

import type { CSSProperties, ReactElement } from "react";
import type { CompletionCursorIndex } from "../../../domain/cli/completion-cursor";

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
  /** Terminal body直下のoverlay位置。 */
  readonly style?: Readonly<CSSProperties>;
}

/** 空のitem count。 */
const emptyItemCount = 0;

/** Prompt直下にfloating表示するsuggestion wrapperのclassName。 */
const suggestionListWrapperClassName = "pointer-events-none absolute z-20 mt-2";

/** Floatingだがterminal outputとして見せるsuggestion listのclassName。 */
const suggestionListClassName =
  "max-h-40 space-y-1 overflow-auto border-l border-zinc-800 bg-zinc-950/95 py-1 pl-3 shadow-2xl shadow-black/40";

/** 選択中suggestion itemのclassName。 */
const selectedSuggestionItemClassName =
  "grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] items-center gap-3 bg-zinc-900/90 px-2 py-1 text-xs text-zinc-100";

/** 通常suggestion itemのclassName。 */
const suggestionItemClassName =
  "grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] items-center gap-3 px-2 py-1 text-xs text-zinc-300";

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
  </li>
);

/**
 * Prompt直下にfloating command suggestion listを描画。
 * @param {BookmarkCliSuggestionListProps} props Suggestion list props。
 * @returns {ReactElement | null} Suggestion list element。
 */
export const BookmarkCliSuggestionList = (
  props: Readonly<BookmarkCliSuggestionListProps>,
): ReactElement | false => {
  if (props.suggestionItems.length === emptyItemCount) {
    return false;
  }

  return (
    <aside
      aria-label="Command suggestions"
      className={suggestionListWrapperClassName}
      data-layout="floating-below-prompt"
      style={props.style}
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
