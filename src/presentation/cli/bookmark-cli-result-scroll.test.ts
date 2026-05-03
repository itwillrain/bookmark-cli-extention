import {
  type BookmarkCliResultScrollOptions,
  scrollSelectedBookmarkCliResultIntoView,
} from "./bookmark-cli-result-scroll";
import { describe, expect, it } from "vitest";
import { resultCursorCleared } from "../../domain/bookmarks/result-cursor";

/** ScrollIntoView呼び出し回数の初期値です。 */
const initialScrollCallCount = 0;

/** 先頭result indexです。 */
const firstResultIndex = 0;

/**
 * ScrollIntoViewの呼び出しを記録するtargetを作ります。
 * @returns {object} targetと記録一覧です。
 */
const createRecordingScrollTarget = (): {
  readonly calls: BookmarkCliResultScrollOptions[];
  readonly target: {
    readonly scrollIntoView: (options: BookmarkCliResultScrollOptions) => void;
  };
} => {
  const calls: BookmarkCliResultScrollOptions[] = [];

  return {
    calls,
    target: {
      /**
       * ScrollIntoView呼び出しを記録します。
       * @param {BookmarkCliResultScrollOptions} options scroll optionです。
       * @returns {void} 返り値なし。
       */
      scrollIntoView: (options: BookmarkCliResultScrollOptions): void => {
        calls.push(options);
      },
    },
  };
};

/**
 * Result scrollのテストスイートです。
 */
describe("scrollSelectedBookmarkCliResultIntoView", (): void => {
  /**
   * 選択中resultを最小移動で表示範囲へscrollすることを検証します。
   */
  it("scrolls selected result into view", (): void => {
    const recording = createRecordingScrollTarget();

    expect(
      scrollSelectedBookmarkCliResultIntoView({
        selectedResultIndex: firstResultIndex,
        target: recording.target,
      }),
    ).toBe(true);
    expect(recording.calls).toStrictEqual([{ block: "nearest", inline: "nearest" }]);
  });

  /**
   * 未選択状態ではscrollしないことを検証します。
   */
  it("does not scroll when result is not selected", (): void => {
    const recording = createRecordingScrollTarget();

    expect(
      scrollSelectedBookmarkCliResultIntoView({
        selectedResultIndex: resultCursorCleared,
        target: recording.target,
      }),
    ).toBe(false);
    expect(recording.calls).toHaveLength(initialScrollCallCount);
  });
});
