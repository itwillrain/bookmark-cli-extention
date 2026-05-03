import {
  type BookmarkCliSuggestionItem,
  BookmarkCliSuggestionList,
} from "./bookmark-cli-suggestion-list";
import { CommandForm, type CommandInputKeyEvent } from "./bookmark-cli-command-form";
import {
  type CommandInputFocusValue,
  useCommandInputFocus,
  useTerminalAutoScroll,
} from "./bookmark-cli-terminal-body-hooks";
import { type ReactElement, type RefCallback, type RefObject, useRef } from "react";
import type { BookmarkCliTranscriptEntry } from "../bookmark-cli-transcript";
import { BookmarkCliTranscriptList } from "./bookmark-cli-transcript-list";
import type { CompletionCursorIndex } from "../../../domain/cli/completion-cursor";
import type { PromptStyle } from "../../../domain/storage/extension-state";
import type { ResultCursorIndex } from "../../../domain/bookmarks/result-cursor";
import { useBookmarkCliSuggestionOverlayStyle } from "./bookmark-cli-suggestion-overlay-style";

/**
 * Bookmark CLI terminal bodyのpropsです。
 */
export interface BookmarkCliTerminalBodyProps {
  /**
   * CLI入力値です。
   */
  readonly inputValue: string;
  /**
   * 入力値を更新するcallbackです。
   */
  readonly onInputChange: (value: string) => void;
  /**
   * 入力欄のkey操作callbackです。
   */
  readonly onInputKeyDown: (event: CommandInputKeyEvent) => void;
  /**
   * Commandを実行するcallbackです。
   */
  readonly onSubmit: () => void;
  /**
   * Nerd Font iconを優先するかです。
   */
  readonly preferNerdFont: boolean;
  /**
   * Prompt表示styleです。
   */
  readonly promptStyle: PromptStyle;
  /**
   * 選択中result indexです。
   */
  readonly selectedResultIndex: ResultCursorIndex;
  /**
   * 選択中suggestion indexです。
   */
  readonly selectedSuggestionIndex: CompletionCursorIndex;
  /**
   * 入力中commandのsuggestion一覧です。
   */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
  /**
   * 実行済みcommand transcriptです。
   */
  readonly transcriptEntries: readonly BookmarkCliTranscriptEntry[];
}

/** 空のsuggestion item件数です。 */
const emptySuggestionItemCount = 0;

/** 入力中command lineのbase classNameです。 */
const commandLineReserveClassName = "pt-2";

/** Suggestion表示中の入力中command line classNameです。 */
const commandLineReserveWithSuggestionsClassName = `${commandLineReserveClassName} pb-40`;

/** 入力中command lineをfloating suggestionの基準にするclassNameです。 */
const commandLineAnchorClassName = "relative";

/** Scrollbarを隠すscrollback classNameです。 */
const scrollbackClassName = "bookmark-cli-scrollback min-h-0 flex-1 overflow-auto";

/** Terminal focus保持のdata属性値です。 */
const terminalFocusBehavior = "retain-command-input";

/** Suggestion非表示状態です。 */
const suggestionHiddenState = "hidden";

/** Suggestion表示状態です。 */
const suggestionVisibleState = "visible";

/**
 * Suggestionが表示されているか判定します。
 * @param {readonly BookmarkCliSuggestionItem[]} suggestionItems Suggestion item一覧です。
 * @returns {boolean} Suggestionが表示されていればtrueです。
 */
const hasVisibleSuggestions = (suggestionItems: readonly BookmarkCliSuggestionItem[]): boolean =>
  suggestionItems.length !== emptySuggestionItemCount;

/**
 * 入力中command lineの余白classNameを作ります。
 * @param {readonly BookmarkCliSuggestionItem[]} suggestionItems Suggestion item一覧です。
 * @returns {string} Command line reserve classNameです。
 */
const createCommandLineReserveClassName = (
  suggestionItems: readonly BookmarkCliSuggestionItem[],
): string => {
  if (hasVisibleSuggestions(suggestionItems)) {
    return commandLineReserveWithSuggestionsClassName;
  }

  return commandLineReserveClassName;
};

/**
 * Suggestion表示状態を作ります。
 * @param {readonly BookmarkCliSuggestionItem[]} suggestionItems Suggestion item一覧です。
 * @returns {string} Suggestion表示状態です。
 */
const createSuggestionState = (suggestionItems: readonly BookmarkCliSuggestionItem[]): string => {
  if (hasVisibleSuggestions(suggestionItems)) {
    return suggestionVisibleState;
  }

  return suggestionHiddenState;
};

/**
 * Scrollback描画入力です。
 */
interface ScrollbackRenderInput extends BookmarkCliTerminalBodyProps {
  /** Command input focus制御値です。 */
  readonly commandInputFocus: CommandInputFocusValue;
  /** 入力中command lineのclassNameです。 */
  readonly commandLineReserveClassNameValue: string;
  /** 現在prompt anchorのrefです。 */
  readonly commandLineAnchorRef: RefObject<HTMLElement | null>;
  /** Scrollback elementのref callbackです。 */
  readonly scrollElementRef: RefCallback<HTMLElement>;
  /** Suggestion表示状態です。 */
  readonly suggestionState: string;
}

/**
 * Scrollback内のtranscriptと入力中command lineを描画します。
 * @param {ScrollbackRenderInput} input Scrollback描画入力です。
 * @returns {ReactElement} Scrollback elementです。
 */
// oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- React refsはmutable境界です。
const renderScrollback = (input: ScrollbackRenderInput): ReactElement => (
  <section
    ref={input.scrollElementRef}
    className={scrollbackClassName}
    data-layout="terminal-scrollback"
  >
    <BookmarkCliTranscriptList
      preferNerdFont={input.preferNerdFont}
      promptStyle={input.promptStyle}
      selectedResultIndex={input.selectedResultIndex}
      transcriptEntries={input.transcriptEntries}
    />
    <section
      className={input.commandLineReserveClassNameValue}
      data-suggestions={input.suggestionState}
    >
      <section
        ref={input.commandLineAnchorRef}
        className={commandLineAnchorClassName}
        data-layout="active-command-anchor"
      >
        <CommandForm
          commandInputRef={input.commandInputFocus.commandInputRef}
          inputValue={input.inputValue}
          onInputChange={input.onInputChange}
          onInputKeyDown={input.onInputKeyDown}
          onSubmit={input.onSubmit}
          preferNerdFont={input.preferNerdFont}
          promptStyle={input.promptStyle}
        />
      </section>
    </section>
  </section>
);

/**
 * Terminal bodyを描画します。
 * @param {BookmarkCliTerminalBodyProps} props Terminal body propsです。
 * @returns {ReactElement} Terminal body elementです。
 */
export const BookmarkCliTerminalBody = (props: BookmarkCliTerminalBodyProps): ReactElement => {
  const terminalBodyRef = useRef<HTMLElement>(null);
  const commandLineAnchorRef = useRef<HTMLElement>(null);
  const terminalAutoScroll = useTerminalAutoScroll(props.transcriptEntries);
  const commandInputFocus = useCommandInputFocus(props.transcriptEntries);
  const commandLineReserveClassNameValue = createCommandLineReserveClassName(props.suggestionItems);
  const suggestionState = createSuggestionState(props.suggestionItems);
  const suggestionOverlayStyle = useBookmarkCliSuggestionOverlayStyle({
    anchorRef: commandLineAnchorRef,
    containerRef: terminalBodyRef,
    inputValue: props.inputValue,
    scrollElement: terminalAutoScroll.scrollElement,
    suggestionItems: props.suggestionItems,
    transcriptEntries: props.transcriptEntries,
  });

  return (
    <section
      ref={terminalBodyRef}
      className="relative flex min-h-0 flex-1 flex-col px-4 py-4 font-mono text-sm leading-6 sm:px-5"
      data-focus-behavior={terminalFocusBehavior}
      onMouseDown={commandInputFocus.handleTerminalMouseDown}
    >
      {renderScrollback({
        ...props,
        commandInputFocus,
        commandLineAnchorRef,
        commandLineReserveClassNameValue,
        scrollElementRef: terminalAutoScroll.scrollElementRef,
        suggestionState,
      })}
      <BookmarkCliSuggestionList
        selectedSuggestionIndex={props.selectedSuggestionIndex}
        style={suggestionOverlayStyle}
        suggestionItems={props.suggestionItems}
      />
    </section>
  );
};
