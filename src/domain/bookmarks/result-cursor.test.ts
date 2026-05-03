import { describe, expect, it } from "vitest";
import { moveResultCursor, normalizeResultCursor, resultCursorCleared } from "./result-cursor";

/** 先頭index。 */
const firstItemIndex = 0;

/** 3件のitem count。 */
const threeItemCount = 3;

/** 2番目のindex。 */
const secondItemIndex = 1;

/** 末尾index。 */
const lastItemIndex = 2;

/** 範囲外index。 */
const outOfRangeIndex = 10;

/**
 * Result cursor移動のテストスイート。
 */
describe("moveResultCursor", (): void => {
  /**
   * 未選択からnextで先頭を選ぶことを検証。
   */
  it("selects first item from cleared cursor", (): void => {
    expect(
      moveResultCursor({
        currentIndex: resultCursorCleared,
        direction: "next",
        itemCount: threeItemCount,
      }),
    ).toBe(firstItemIndex);
  });

  /**
   * 未選択からpreviousで末尾を選ぶことを検証。
   */
  it("selects last item from cleared cursor", (): void => {
    expect(
      moveResultCursor({
        currentIndex: resultCursorCleared,
        direction: "previous",
        itemCount: threeItemCount,
      }),
    ).toBe(lastItemIndex);
  });
});

/**
 * Result cursor正規化のテストスイート。
 */
describe("normalizeResultCursor", (): void => {
  /**
   * 範囲内indexを維持することを検証。
   */
  it("keeps in-range cursor", (): void => {
    expect(normalizeResultCursor(secondItemIndex, threeItemCount)).toBe(secondItemIndex);
  });

  /**
   * 範囲外indexを解除することを検証。
   */
  it("clears out-of-range cursor", (): void => {
    expect(normalizeResultCursor(outOfRangeIndex, threeItemCount)).toBe(resultCursorCleared);
  });
});
