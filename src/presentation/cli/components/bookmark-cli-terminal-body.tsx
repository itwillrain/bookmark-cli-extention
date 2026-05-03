import {
  type BookmarkCliSuggestionItem,
  BookmarkCliSuggestionList,
} from "./bookmark-cli-suggestion-list";
import { CommandForm, type CommandInputKeyEvent } from "./bookmark-cli-command-form";
import {
  type MouseEventHandler,
  type ReactElement,
  type RefCallback,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { BookmarkCliTranscriptEntry } from "../bookmark-cli-transcript";
import { BookmarkCliTranscriptList } from "./bookmark-cli-transcript-list";
import type { CompletionCursorIndex } from "../../../domain/cli/completion-cursor";
import type { PromptStyle } from "../../../domain/storage/extension-state";
import type { ResultCursorIndex } from "../../../domain/bookmarks/result-cursor";
import { resolveBookmarkCliBottomScrollTop } from "../bookmark-cli-scroll";

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

/** 空のtranscript entry idです。 */
const emptyTranscriptEntryId = "";

/** 最新transcript entryを指す末尾offsetです。 */
const latestTranscriptEntryOffset = 1;

/** Scroll対象が未mountであることを表す値です。 */
const missingScrollElement = false;

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

/** Focus時にscroll位置を変えない値です。 */
const preventFocusScroll = true;

/** Suggestion非表示状態です。 */
const suggestionHiddenState = "hidden";

/** Suggestion表示状態です。 */
const suggestionVisibleState = "visible";

/**
 * 最新transcript entry idを取得します。
 * @param {readonly BookmarkCliTranscriptEntry[]} transcriptEntries transcript entry一覧です。
 * @returns {string} 最新entry idです。
 */
const getLatestTranscriptEntryId = (
  transcriptEntries: readonly BookmarkCliTranscriptEntry[],
): string => transcriptEntries.at(-latestTranscriptEntryOffset)?.id ?? emptyTranscriptEntryId;

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
 * Command input focus hookの戻り値です。
 */
interface CommandInputFocusValue {
  /**
   * Command input refです。
   */
  readonly commandInputRef: RefObject<HTMLInputElement | null>;
  /**
   * Terminal面のmouse down handlerです。
   */
  readonly handleTerminalMouseDown: MouseEventHandler<HTMLElement>;
}

/**
 * Pointer操作対象がcommand input自身か判定します。
 * @param {Readonly<EventTarget> | null} target Pointer操作対象です。
 * @returns {boolean} command input自身ならtrueです。
 */
const isCommandInputTarget = (target: Readonly<EventTarget> | null): boolean =>
  target instanceof HTMLInputElement;

/**
 * Command input focus保持のための値を作ります。
 * @param {readonly BookmarkCliTranscriptEntry[]} transcriptEntries transcript entry一覧です。
 * @returns {CommandInputFocusValue} command input focus hookの戻り値です。
 */
const useCommandInputFocus = (
  transcriptEntries: readonly BookmarkCliTranscriptEntry[],
): CommandInputFocusValue => {
  const commandInputRef = useRef<HTMLInputElement>(null);
  const transcriptEntryCount = transcriptEntries.length;

  /**
   * Terminal面のpointer操作でcommand inputへfocusを戻します。
   * @param {React.MouseEvent<HTMLElement>} event Mouse down eventです。
   * @returns {void} 返り値なし。
   */
  // oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- React mouse eventはmutable synthetic eventです。
  const handleTerminalMouseDown = useCallback<MouseEventHandler<HTMLElement>>((event): void => {
    if (isCommandInputTarget(event.target)) {
      return;
    }

    event.preventDefault();
    commandInputRef.current?.focus({ preventScroll: preventFocusScroll });
  }, []);

  useEffect((): void => {
    commandInputRef.current?.focus({ preventScroll: preventFocusScroll });
  }, [transcriptEntryCount]);

  return { commandInputRef, handleTerminalMouseDown };
};

/**
 * Terminal bodyを最新promptが見える位置へ追従させます。
 * @param {BookmarkCliTerminalBodyProps} props Terminal body propsです。
 * @returns {RefCallback<HTMLElement>} Scroll対象ref callbackです。
 */
const useTerminalAutoScroll = (props: BookmarkCliTerminalBodyProps): RefCallback<HTMLElement> => {
  const [scrollElement, setScrollElement] = useState<HTMLElement | false>(missingScrollElement);
  const latestTranscriptEntryId = getLatestTranscriptEntryId(props.transcriptEntries);

  /**
   * Scroll対象elementをReact stateへ反映します。
   * @param {HTMLElement | null} element Scroll対象elementです。
   * @returns {void} 返り値なし。
   */
  // oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- React ref callbackはmutable DOM elementを受け取ります。
  const handleScrollElementRef = useCallback<RefCallback<HTMLElement>>(
    // oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- React ref callbackはmutable DOM elementを受け取ります。
    (element): void => {
      setScrollElement(element ?? missingScrollElement);
    },
    [],
  );

  useEffect((): void => {
    const bottomScrollTop = resolveBookmarkCliBottomScrollTop(scrollElement);

    if (scrollElement === missingScrollElement || bottomScrollTop === missingScrollElement) {
      return;
    }

    scrollElement.scrollTop = bottomScrollTop;
  }, [latestTranscriptEntryId, props.transcriptEntries.length, scrollElement]);

  return handleScrollElementRef;
};

/**
 * Terminal bodyを描画します。
 * @param {BookmarkCliTerminalBodyProps} props Terminal body propsです。
 * @returns {ReactElement} Terminal body elementです。
 */
export const BookmarkCliTerminalBody = (props: BookmarkCliTerminalBodyProps): ReactElement => {
  const handleScrollElementRef = useTerminalAutoScroll(props);
  const commandInputFocus = useCommandInputFocus(props.transcriptEntries);
  const commandLineReserveClassNameValue = createCommandLineReserveClassName(props.suggestionItems);
  const suggestionState = createSuggestionState(props.suggestionItems);

  return (
    <section
      className="flex min-h-0 flex-1 flex-col px-4 py-4 font-mono text-sm leading-6 sm:px-5"
      data-focus-behavior={terminalFocusBehavior}
      onMouseDown={commandInputFocus.handleTerminalMouseDown}
    >
      <section ref={handleScrollElementRef} className={scrollbackClassName}>
        <BookmarkCliTranscriptList
          preferNerdFont={props.preferNerdFont}
          promptStyle={props.promptStyle}
          selectedResultIndex={props.selectedResultIndex}
          transcriptEntries={props.transcriptEntries}
        />
        <section className={commandLineReserveClassNameValue} data-suggestions={suggestionState}>
          <section className={commandLineAnchorClassName} data-layout="active-command-anchor">
            <CommandForm
              commandInputRef={commandInputFocus.commandInputRef}
              inputValue={props.inputValue}
              onInputChange={props.onInputChange}
              onInputKeyDown={props.onInputKeyDown}
              onSubmit={props.onSubmit}
              preferNerdFont={props.preferNerdFont}
              promptStyle={props.promptStyle}
            />
            <BookmarkCliSuggestionList
              selectedSuggestionIndex={props.selectedSuggestionIndex}
              suggestionItems={props.suggestionItems}
            />
          </section>
        </section>
      </section>
    </section>
  );
};
