import {
  completionCursorCleared,
  moveCompletionCursor,
  normalizeCompletionCursor,
} from "./completion-cursor";
import { describe, expect, it } from "vitest";

/** 空の候補件数。 */
const emptyItemCount = 0;

/** 先頭候補index。 */
const firstItemIndex = 0;

/** 2番目の候補index。 */
const secondItemIndex = 1;

/** 2件の候補数。 */
const twoItemCount = 2;

/** 範囲外の候補index。 */
const outOfRangeIndex = 9;

/**
 * Completion cursor移動のテストスイート。
 */
describe("moveCompletionCursor", (): void => {
  /**
   * 未選択から先頭候補を選択することを検証。
   */
  it("selects first item from cleared cursor", (): void => {
    expect(
      moveCompletionCursor({
        currentIndex: completionCursorCleared,
        itemCount: twoItemCount,
      }),
    ).toBe(firstItemIndex);
  });

  /**
   * 次の候補を選択することを検証。
   */
  it("selects next item", (): void => {
    expect(
      moveCompletionCursor({
        currentIndex: firstItemIndex,
        itemCount: twoItemCount,
      }),
    ).toBe(secondItemIndex);
  });

  /**
   * 末尾候補から先頭候補へ循環することを検証。
   */
  it("wraps last item to first item", (): void => {
    expect(
      moveCompletionCursor({
        currentIndex: secondItemIndex,
        itemCount: twoItemCount,
      }),
    ).toBe(firstItemIndex);
  });

  /**
   * 候補がない場合は未選択のままにすることを検証。
   */
  it("keeps cleared cursor for empty items", (): void => {
    expect(
      moveCompletionCursor({
        currentIndex: completionCursorCleared,
        itemCount: emptyItemCount,
      }),
    ).toBe(completionCursorCleared);
  });
});

/**
 * Completion cursor正規化のテストスイート。
 */
describe("normalizeCompletionCursor", (): void => {
  /**
   * 範囲外cursorを解除することを検証。
   */
  it("clears out-of-range cursor", (): void => {
    expect(normalizeCompletionCursor(outOfRangeIndex, twoItemCount)).toBe(completionCursorCleared);
  });
});
