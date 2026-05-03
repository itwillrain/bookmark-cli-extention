import {
  type MouseEventHandler,
  type RefCallback,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { BookmarkCliTranscriptEntry } from "../bookmark-cli-transcript";
import { resolveBookmarkCliBottomScrollTop } from "../bookmark-cli-scroll";

/** 空のtranscript entry id。 */
const emptyTranscriptEntryId = "";

/** 最新transcript entryを指す末尾offset。 */
const latestTranscriptEntryOffset = 1;

/** Scroll対象が未mountであることを表す値。 */
const missingScrollElement = false;

/** Focus時にscroll位置を変えない値。 */
const preventFocusScroll = true;

/**
 * Command input focus hookの戻り値。
 */
export interface CommandInputFocusValue {
  /** Command input ref。 */
  readonly commandInputRef: RefObject<HTMLInputElement | null>;
  /** Terminal面のmouse down handler。 */
  readonly handleTerminalMouseDown: MouseEventHandler<HTMLElement>;
}

/**
 * Terminal auto scroll hookの戻り値。
 */
export interface TerminalAutoScrollValue {
  /** Scroll対象element、または未mount状態。 */
  readonly scrollElement: HTMLElement | false;
  /** Scroll対象ref callback。 */
  readonly scrollElementRef: RefCallback<HTMLElement>;
}

/**
 * 最新transcript entry idを取得する。
 * @param {readonly BookmarkCliTranscriptEntry[]} transcriptEntries transcript entry一覧。
 * @returns {string} 最新entry id。
 */
const getLatestTranscriptEntryId = (
  transcriptEntries: readonly BookmarkCliTranscriptEntry[],
): string => transcriptEntries.at(-latestTranscriptEntryOffset)?.id ?? emptyTranscriptEntryId;

/**
 * Pointer操作対象がcommand input自身か判定する。
 * @param {Readonly<EventTarget> | null} target Pointer操作対象。
 * @returns {boolean} command input自身ならtrue。
 */
const isCommandInputTarget = (target: Readonly<EventTarget> | null): boolean =>
  target instanceof HTMLInputElement;

/**
 * Command input focus保持のための値を作る。
 * @param {readonly BookmarkCliTranscriptEntry[]} transcriptEntries transcript entry一覧。
 * @returns {CommandInputFocusValue} command input focus hookの戻り値。
 */
export const useCommandInputFocus = (
  transcriptEntries: readonly BookmarkCliTranscriptEntry[],
): CommandInputFocusValue => {
  const commandInputRef = useRef<HTMLInputElement>(null);
  const transcriptEntryCount = transcriptEntries.length;

  /**
   * Terminal面のpointer操作でcommand inputへfocusを戻す。
   * @param {React.MouseEvent<HTMLElement>} event Mouse down event。
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
 * Terminal bodyを最新promptが見える位置へ追従させる。
 * @param {readonly BookmarkCliTranscriptEntry[]} transcriptEntries transcript entry一覧。
 * @returns {TerminalAutoScrollValue} Scroll制御値。
 */
export const useTerminalAutoScroll = (
  transcriptEntries: readonly BookmarkCliTranscriptEntry[],
): TerminalAutoScrollValue => {
  const [scrollElement, setScrollElement] = useState<HTMLElement | false>(missingScrollElement);
  const latestTranscriptEntryId = getLatestTranscriptEntryId(transcriptEntries);

  /**
   * Scroll対象elementをReact stateへ反映する。
   * @param {HTMLElement | null} element Scroll対象element。
   * @returns {void} 返り値なし。
   */
  // oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- React ref callbackはmutable DOM elementを受け取ります。
  const scrollElementRef = useCallback<RefCallback<HTMLElement>>(
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
  }, [latestTranscriptEntryId, transcriptEntries.length, scrollElement]);

  return { scrollElement, scrollElementRef };
};
