/* oxlint-disable typescript-eslint/prefer-readonly-parameter-types -- ReactのCSSProperties propsに合わせるため。 */

import { type CSSProperties, type ReactElement, type RefObject, useEffect, useRef } from "react";
import type { CompletionCursorIndex } from "../../../domain/cli/completion-cursor";
import { scrollSelectedBookmarkCliSuggestionIntoView } from "../bookmark-cli-suggestion-scroll";

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
 * Bookmark CLI suggestionを選択したときのhandler。
 */
export type BookmarkCliSuggestionClickHandler = (suggestionItem: BookmarkCliSuggestionItem) => void;

/**
 * Bookmark CLI suggestion list props。
 */
export interface BookmarkCliSuggestionListProps {
  /** 選択中suggestion index。 */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
  /** Suggestionをpointerで確定するhandler。 */
  readonly onSuggestionClick: BookmarkCliSuggestionClickHandler;
  /** 表示するsuggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
  /** Terminal body直下のoverlay位置。 */
  readonly style?: Readonly<CSSProperties>;
}

/**
 * Suggestionのmouse down eventとして扱う最小shape。
 */
export interface BookmarkCliSuggestionMouseDownEvent {
  /** Browser既定のfocus移動やsubmitを止める。 */
  readonly preventDefault: () => void;
}

/**
 * Suggestion mouse downの補完入力。
 */
export interface CompleteBookmarkCliSuggestionMouseDownInput {
  /** Mouse down event。 */
  readonly event: BookmarkCliSuggestionMouseDownEvent;
  /** Suggestion確定handler。 */
  readonly onSuggestionClick: BookmarkCliSuggestionClickHandler;
  /** 確定するsuggestion item。 */
  readonly suggestionItem: BookmarkCliSuggestionItem;
}

/** 空のitem count。 */
const emptyItemCount = 0;

/** Prompt直下にfloating表示するsuggestion wrapperのclassName。 */
const suggestionListWrapperClassName = "absolute z-20 mt-2";

/** Floatingだがterminal outputとして見せるsuggestion listのclassName。 */
const suggestionListClassName =
  "max-h-40 space-y-1 overflow-auto border-l border-zinc-800 bg-zinc-950/95 py-1 pl-3 shadow-2xl shadow-black/40";

/** 選択中suggestion itemのclassName。 */
const selectedSuggestionItemClassName =
  "grid cursor-pointer grid-cols-[minmax(0,8rem)_minmax(0,1fr)] items-center gap-3 bg-zinc-900/90 px-2 py-1 text-xs text-zinc-100";

/** 通常suggestion itemのclassName。 */
const suggestionItemClassName =
  "grid cursor-pointer grid-cols-[minmax(0,8rem)_minmax(0,1fr)] items-center gap-3 px-2 py-1 text-xs text-zinc-300";

/** 選択中suggestionをscroll対象として示す属性値。 */
const selectedSuggestionScrollTarget = "selected-suggestion";

/** Suggestion item keyの区切り文字。 */
const suggestionItemKeySeparator = "::";

/** Suggestion item描画入力。 */
interface SuggestionItemRenderInput {
  /** Suggestion item。 */
  readonly suggestionItem: BookmarkCliSuggestionItem;
  /** Suggestion item index。 */
  readonly suggestionItemIndex: number;
  /** 選択中suggestion index。 */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
  /** Suggestionをpointerで確定するhandler。 */
  readonly onSuggestionClick: BookmarkCliSuggestionClickHandler;
  /** 選択中suggestion item ref。 */
  readonly selectedSuggestionItemRef: RefObject<HTMLLIElement | null>;
}

/** 選択中suggestion itemにだけ付与するref props。 */
interface SuggestionItemRefProps {
  /** 選択中suggestion item ref。 */
  readonly ref: RefObject<HTMLLIElement | null>;
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
 * 選択中suggestion itemのscroll target属性を返す。
 * @param {SuggestionItemRenderInput} input Suggestion item描画入力。
 * @returns {string | undefined} Scroll target属性値。
 */
const resolveSuggestionScrollTarget = (input: SuggestionItemRenderInput): string => {
  if (isSelectedSuggestionItem(input)) {
    return selectedSuggestionScrollTarget;
  }

  return "";
};

/**
 * 選択中suggestion itemへだけref propsを作る。
 * @param {SuggestionItemRenderInput} input Suggestion item描画入力。
 * @returns {Partial<SuggestionItemRefProps>} 選択中item ref props。
 */
const createSuggestionItemRefProps = (
  input: SuggestionItemRenderInput,
): Partial<SuggestionItemRefProps> => {
  if (isSelectedSuggestionItem(input)) {
    return { ref: input.selectedSuggestionItemRef };
  }

  return {};
};

/**
 * Suggestion itemのReact keyを作る。
 * @param {BookmarkCliSuggestionItem} suggestionItem Suggestion item。
 * @returns {string} React key。
 */
const createSuggestionItemKey = (suggestionItem: BookmarkCliSuggestionItem): string =>
  [suggestionItem.commandName, suggestionItem.completion, suggestionItem.description].join(
    suggestionItemKeySeparator,
  );

/**
 * Suggestion itemのmouse downを入力補完として処理。
 * @param {CompleteBookmarkCliSuggestionMouseDownInput} input Suggestion mouse downの補完入力。
 * @returns {void} 返り値なし。
 * @example
 * ```ts
 * completeBookmarkCliSuggestionMouseDown({ event, onSuggestionClick, suggestionItem });
 * ```
 */
export const completeBookmarkCliSuggestionMouseDown = (
  input: CompleteBookmarkCliSuggestionMouseDownInput,
): void => {
  input.event.preventDefault();
  input.onSuggestionClick(input.suggestionItem);
};

/**
 * Suggestion itemを描画。
 * @param {SuggestionItemRenderInput} input Suggestion item描画入力。
 * @returns {ReactElement} Suggestion item element。
 */
const renderSuggestionItem = (input: SuggestionItemRenderInput): ReactElement => {
  const selected = isSelectedSuggestionItem(input);

  return (
    <li
      aria-selected={selected}
      className={createSuggestionItemClassName(input)}
      data-scroll-target={resolveSuggestionScrollTarget(input)}
      key={createSuggestionItemKey(input.suggestionItem)}
      onMouseDown={(event) => {
        completeBookmarkCliSuggestionMouseDown({
          event,
          onSuggestionClick: input.onSuggestionClick,
          suggestionItem: input.suggestionItem,
        });
      }}
      role="option"
      {...createSuggestionItemRefProps(input)}
    >
      <span className="truncate font-semibold text-emerald-300">
        {input.suggestionItem.commandName}
      </span>
      <span className="truncate text-zinc-400">{input.suggestionItem.description}</span>
    </li>
  );
};

/**
 * Prompt直下にfloating command suggestion listを描画。
 * @param {BookmarkCliSuggestionListProps} props Suggestion list props。
 * @returns {ReactElement | null} Suggestion list element。
 */
export const BookmarkCliSuggestionList = (
  props: Readonly<BookmarkCliSuggestionListProps>,
): ReactElement | false => {
  const selectedSuggestionItemRef = useRef<HTMLLIElement>(null);

  useEffect((): void => {
    scrollSelectedBookmarkCliSuggestionIntoView({
      selectedSuggestionIndex: props.selectedSuggestionIndex,
      target: selectedSuggestionItemRef.current,
    });
  }, [props.selectedSuggestionIndex, props.suggestionItems.length]);

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
            onSuggestionClick: props.onSuggestionClick,
            selectedSuggestionIndex: props.selectedSuggestionIndex,
            selectedSuggestionItemRef,
            suggestionItem,
            suggestionItemIndex,
          }),
        )}
      </ol>
    </aside>
  );
};
