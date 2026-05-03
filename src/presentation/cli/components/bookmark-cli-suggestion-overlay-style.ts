/* oxlint-disable typescript-eslint/prefer-readonly-parameter-types -- React refsとDOM elementを扱う表示境界のため。 */

import { type CSSProperties, type RefObject, useLayoutEffect, useState } from "react";
import type { BookmarkCliSuggestionItem } from "./bookmark-cli-suggestion-list";
import type { BookmarkCliTranscriptEntry } from "../bookmark-cli-transcript";
import { resolveBookmarkCliSuggestionOverlayPosition } from "../bookmark-cli-suggestion-overlay-position";

/** 空のsuggestion item件数。 */
const emptySuggestionItemCount = 0;

/** 未計測時のoverlay左位置。 */
const hiddenOverlayLeft = 0;

/** 未計測時のoverlay上位置。 */
const hiddenOverlayTop = 0;

/** 未計測時のoverlay幅。 */
const hiddenOverlayWidth = 0;

/** 未計測時のoverlay visibility。 */
const hiddenOverlayVisibility = "hidden";

/** Overlayが未計測のときに使うstyle。 */
const hiddenOverlayStyle = {
  left: hiddenOverlayLeft,
  top: hiddenOverlayTop,
  visibility: hiddenOverlayVisibility,
  width: hiddenOverlayWidth,
} as const satisfies CSSProperties;

/** Event listenerをpassiveにするoption。 */
const passiveEventListenerOptions = { passive: true } as const satisfies AddEventListenerOptions;

/** Scroll対象が未mountであることを表す値。 */
const missingScrollElement = false;

/** 最新transcript entryを指す末尾offset。 */
const latestTranscriptEntryOffset = 1;

/** 空のtranscript entry id。 */
const emptyTranscriptEntryId = "";

/** Overlay位置計測に使うDOM elementの最小shape。 */
type BookmarkCliOverlayElement = Readonly<Pick<HTMLElement, "getBoundingClientRect">>;

/** Overlay位置計測に使うref。 */
type BookmarkCliOverlayElementRef = RefObject<BookmarkCliOverlayElement | null>;

/** Overlay位置再計算を購読するscroll elementの最小shape。 */
type BookmarkCliOverlayScrollElement =
  | Readonly<Pick<HTMLElement, "addEventListener" | "removeEventListener">>
  | false;

/**
 * Suggestion overlay style hook入力。
 */
export interface UseBookmarkCliSuggestionOverlayStyleInput {
  /** Prompt anchor element ref。 */
  readonly anchorRef: BookmarkCliOverlayElementRef;
  /** Overlay配置基準のterminal body ref。 */
  readonly containerRef: BookmarkCliOverlayElementRef;
  /** 現在のCLI入力値。 */
  readonly inputValue: string;
  /** Scrollback element。 */
  readonly scrollElement: BookmarkCliOverlayScrollElement;
  /** 表示中suggestion一覧。 */
  readonly suggestionItems: readonly BookmarkCliSuggestionItem[];
  /** Transcript entry一覧。 */
  readonly transcriptEntries: readonly BookmarkCliTranscriptEntry[];
}

/** Overlay style setter。 */
type OverlayStyleSetter = (style: Readonly<CSSProperties>) => void;

/**
 * Suggestion overlay style更新入力。
 */
interface BookmarkCliSuggestionOverlayStyleUpdateInput extends UseBookmarkCliSuggestionOverlayStyleInput {
  /** Overlay style setter。 */
  readonly setOverlayStyle: OverlayStyleSetter;
}

/**
 * Suggestionが表示されているか判定する。
 * @param {readonly BookmarkCliSuggestionItem[]} suggestionItems Suggestion item一覧。
 * @returns {boolean} Suggestionが表示されていればtrue。
 */
const hasVisibleSuggestions = (suggestionItems: readonly BookmarkCliSuggestionItem[]): boolean =>
  suggestionItems.length !== emptySuggestionItemCount;

/**
 * 最新transcript entry idを取得する。
 * @param {readonly BookmarkCliTranscriptEntry[]} transcriptEntries transcript entry一覧。
 * @returns {string} 最新entry id。
 */
const getLatestTranscriptEntryId = (
  transcriptEntries: readonly BookmarkCliTranscriptEntry[],
): string => transcriptEntries.at(-latestTranscriptEntryOffset)?.id ?? emptyTranscriptEntryId;

/**
 * Elementの矩形を取得する。
 * @param {HTMLElement | null} element 対象element。
 * @returns {DOMRect | false} DOMRect、または未mountの場合はfalse。
 */
const getElementRect = (element: BookmarkCliOverlayElement | null): DOMRect | false => {
  if (element === null) {
    return false;
  }

  return element.getBoundingClientRect();
};

/**
 * Overlay positionをCSSPropertiesへ変換する。
 * @param {ReturnType<typeof resolveBookmarkCliSuggestionOverlayPosition>} position Overlay位置。
 * @returns {CSSProperties} React style。
 */
const createOverlayStyle = (
  position: ReturnType<typeof resolveBookmarkCliSuggestionOverlayPosition>,
): CSSProperties => ({
  left: position.left,
  top: position.top,
  width: position.width,
});

/**
 * 現在のDOM位置からoverlay styleを更新する。
 * @param {BookmarkCliSuggestionOverlayStyleUpdateInput} input Overlay style更新入力。
 * @returns {void} 返り値なし。
 */
const updateBookmarkCliSuggestionOverlayStyle = (
  input: Readonly<BookmarkCliSuggestionOverlayStyleUpdateInput>,
): void => {
  const anchorRect = getElementRect(input.anchorRef.current);
  const containerRect = getElementRect(input.containerRef.current);

  if (
    !hasVisibleSuggestions(input.suggestionItems) ||
    anchorRect === false ||
    containerRect === false
  ) {
    input.setOverlayStyle(hiddenOverlayStyle);

    return;
  }

  input.setOverlayStyle(
    createOverlayStyle(
      resolveBookmarkCliSuggestionOverlayPosition({
        anchorRect,
        containerRect,
      }),
    ),
  );
};

/**
 * Overlay位置更新listenerを登録する。
 * @param {BookmarkCliSuggestionOverlayStyleUpdateInput} input Overlay style更新入力。
 * @returns {() => void} Listener解除関数。
 */
const registerBookmarkCliSuggestionOverlayListeners = (
  input: Readonly<BookmarkCliSuggestionOverlayStyleUpdateInput>,
): (() => void) => {
  /**
   * DOM位置からoverlay styleを再計算する。
   * @returns {void} 返り値なし。
   */
  const updateOverlayStyle = (): void => {
    updateBookmarkCliSuggestionOverlayStyle(input);
  };

  updateOverlayStyle();
  globalThis.addEventListener("resize", updateOverlayStyle);

  if (input.scrollElement !== missingScrollElement) {
    input.scrollElement.addEventListener("scroll", updateOverlayStyle, passiveEventListenerOptions);
  }

  return (): void => {
    globalThis.removeEventListener("resize", updateOverlayStyle);

    if (input.scrollElement !== missingScrollElement) {
      input.scrollElement.removeEventListener("scroll", updateOverlayStyle);
    }
  };
};

/**
 * Suggestion overlay styleを返す。
 * @param {UseBookmarkCliSuggestionOverlayStyleInput} input Suggestion overlay style hook入力。
 * @returns {CSSProperties} Suggestion overlay style。
 */
export const useBookmarkCliSuggestionOverlayStyle = (
  input: Readonly<UseBookmarkCliSuggestionOverlayStyleInput>,
): CSSProperties => {
  const [overlayStyle, setOverlayStyle] = useState<CSSProperties>(hiddenOverlayStyle);
  const latestTranscriptEntryId = getLatestTranscriptEntryId(input.transcriptEntries);

  /**
   * Overlay styleをReact stateへ反映する。
   * @param {Readonly<CSSProperties>} style Overlay style。
   * @returns {void} 返り値なし。
   */
  const applyOverlayStyle = (style: Readonly<CSSProperties>): void => {
    setOverlayStyle(style);
  };

  useLayoutEffect(
    (): (() => void) =>
      registerBookmarkCliSuggestionOverlayListeners({
        ...input,
        setOverlayStyle: applyOverlayStyle,
      }),
    [
      input.anchorRef,
      input.containerRef,
      input.inputValue,
      input.scrollElement,
      input.suggestionItems.length,
      latestTranscriptEntryId,
    ],
  );

  return overlayStyle;
};
