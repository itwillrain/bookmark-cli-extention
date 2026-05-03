import {
  type BookmarkCliSuggestionScrollOptions,
  scrollSelectedBookmarkCliSuggestionIntoView,
} from "./bookmark-cli-suggestion-scroll";
import { describe, expect, it } from "vitest";
import { completionCursorCleared } from "../../domain/cli/completion-cursor";

/** ScrollIntoView呼び出し回数の初期値。 */
const initialScrollCallCount = 0;

/** 先頭suggestion index。 */
const firstSuggestionIndex = 0;

/**
 * ScrollIntoViewの呼び出しを記録するtargetを作る。
 * @returns {object} targetと記録一覧。
 */
const createRecordingScrollTarget = (): {
  readonly calls: BookmarkCliSuggestionScrollOptions[];
  readonly target: {
    readonly scrollIntoView: (options: BookmarkCliSuggestionScrollOptions) => void;
  };
} => {
  const calls: BookmarkCliSuggestionScrollOptions[] = [];

  return {
    calls,
    target: {
      /**
       * ScrollIntoView呼び出しを記録する。
       * @param {BookmarkCliSuggestionScrollOptions} options scroll option。
       * @returns {void} 返り値なし。
       */
      scrollIntoView: (options: BookmarkCliSuggestionScrollOptions): void => {
        calls.push(options);
      },
    },
  };
};

/**
 * Suggestion scrollのテストスイート。
 */
describe("scrollSelectedBookmarkCliSuggestionIntoView", (): void => {
  /**
   * 選択中suggestionを最小移動で表示範囲へscrollすることを検証。
   */
  it("scrolls selected suggestion into view", (): void => {
    const recording = createRecordingScrollTarget();

    expect(
      scrollSelectedBookmarkCliSuggestionIntoView({
        selectedSuggestionIndex: firstSuggestionIndex,
        target: recording.target,
      }),
    ).toBe(true);
    expect(recording.calls).toStrictEqual([{ block: "nearest", inline: "nearest" }]);
  });

  /**
   * 未選択状態ではscrollしないことを検証。
   */
  it("does not scroll when suggestion is not selected", (): void => {
    const recording = createRecordingScrollTarget();

    expect(
      scrollSelectedBookmarkCliSuggestionIntoView({
        selectedSuggestionIndex: completionCursorCleared,
        target: recording.target,
      }),
    ).toBe(false);
    expect(recording.calls).toHaveLength(initialScrollCallCount);
  });
});
