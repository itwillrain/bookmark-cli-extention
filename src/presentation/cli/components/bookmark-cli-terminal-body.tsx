import {
  type BookmarkCliSuggestionItem,
  BookmarkCliSuggestionList,
} from "./bookmark-cli-suggestion-list";
import { CommandForm, type CommandInputKeyEvent } from "./bookmark-cli-command-form";
import { type ReactElement, type RefCallback, useCallback, useEffect, useState } from "react";
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

/**
 * 最新transcript entry idを取得します。
 * @param {readonly BookmarkCliTranscriptEntry[]} transcriptEntries transcript entry一覧です。
 * @returns {string} 最新entry idです。
 */
const getLatestTranscriptEntryId = (
  transcriptEntries: readonly BookmarkCliTranscriptEntry[],
): string => transcriptEntries.at(-latestTranscriptEntryOffset)?.id ?? emptyTranscriptEntryId;

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
  }, [
    latestTranscriptEntryId,
    props.inputValue,
    props.suggestionItems.length,
    props.transcriptEntries.length,
    scrollElement,
  ]);

  return handleScrollElementRef;
};

/**
 * Terminal bodyを描画します。
 * @param {BookmarkCliTerminalBodyProps} props Terminal body propsです。
 * @returns {ReactElement} Terminal body elementです。
 */
export const BookmarkCliTerminalBody = (props: BookmarkCliTerminalBodyProps): ReactElement => {
  const handleScrollElementRef = useTerminalAutoScroll(props);

  return (
    <section className="flex min-h-0 flex-1 flex-col px-4 py-4 font-mono text-sm leading-6 sm:px-5">
      <section ref={handleScrollElementRef} className="min-h-0 flex-1 overflow-auto">
        <BookmarkCliTranscriptList
          preferNerdFont={props.preferNerdFont}
          promptStyle={props.promptStyle}
          selectedResultIndex={props.selectedResultIndex}
          transcriptEntries={props.transcriptEntries}
        />
        <CommandForm
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
  );
};
