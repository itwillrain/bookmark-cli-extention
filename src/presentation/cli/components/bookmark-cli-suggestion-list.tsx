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
  /** 表示するsuggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
}

/** 空のitem count。 */
const emptyItemCount = 0;

/**
 * Suggestion itemを描画。
 * @param {BookmarkCliSuggestionItem} suggestionItem Suggestion item。
 * @returns {ReactElement} Suggestion item element。
 */
const renderSuggestionItem = (suggestionItem: BookmarkCliSuggestionItem): ReactElement => (
  <li
    className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_auto] items-center gap-3 rounded-sm px-2 py-1 text-xs text-zinc-300 first:bg-zinc-800/70 first:text-zinc-100"
    key={suggestionItem.commandName}
  >
    <span className="truncate font-semibold text-emerald-300">{suggestionItem.commandName}</span>
    <span className="truncate text-zinc-400">{suggestionItem.description}</span>
    <kbd className="rounded border border-zinc-700 px-1.5 py-0.5 text-[0.6875rem] text-zinc-500">
      Tab
    </kbd>
  </li>
);

/**
 * Fig風のcommand suggestion listを描画。
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
    <ol className="mt-3 space-y-1 border-b border-zinc-900 pb-3">
      {props.suggestionItems.map(renderSuggestionItem)}
    </ol>
  );
};
