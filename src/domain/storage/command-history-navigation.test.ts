import {
  commandHistoryCursorCleared,
  moveCommandHistoryCursor,
  normalizeCommandHistoryCursor,
} from "./command-history-navigation";
import { describe, expect, it } from "vitest";

/** 先頭index。 */
const firstItemIndex = 0;

/** 2番目のindex。 */
const secondItemIndex = 1;

/** 3件のitem count。 */
const threeItemCount = 3;

/** 末尾index。 */
const lastItemIndex = 2;

/** 範囲外index。 */
const outOfRangeIndex = 10;

/**
 * Command history cursor previous移動のテストスイート。
 */
describe("moveCommandHistoryCursor previous", (): void => {
  /**
   * 未選択からpreviousで最新履歴を選ぶことを検証。
   */
  it("selects latest history item from cleared cursor", (): void => {
    expect(
      moveCommandHistoryCursor({
        currentIndex: commandHistoryCursorCleared,
        direction: "previous",
        itemCount: threeItemCount,
      }),
    ).toBe(lastItemIndex);
  });

  /**
   * Previousで古い履歴へ移動することを検証。
   */
  it("moves to older history item", (): void => {
    expect(
      moveCommandHistoryCursor({
        currentIndex: lastItemIndex,
        direction: "previous",
        itemCount: threeItemCount,
      }),
    ).toBe(secondItemIndex);
  });
});

/**
 * Command history cursor next移動のテストスイート。
 */
describe("moveCommandHistoryCursor next", (): void => {
  /**
   * Nextで新しい履歴へ移動することを検証。
   */
  it("moves to newer history item", (): void => {
    expect(
      moveCommandHistoryCursor({
        currentIndex: firstItemIndex,
        direction: "next",
        itemCount: threeItemCount,
      }),
    ).toBe(secondItemIndex);
  });

  /**
   * 最新履歴からnextで未選択へ戻ることを検証。
   */
  it("clears cursor after newest history item", (): void => {
    expect(
      moveCommandHistoryCursor({
        currentIndex: lastItemIndex,
        direction: "next",
        itemCount: threeItemCount,
      }),
    ).toBe(commandHistoryCursorCleared);
  });
});

/**
 * Command history cursor正規化のテストスイート。
 */
describe("normalizeCommandHistoryCursor", (): void => {
  /**
   * 範囲内indexを維持することを検証。
   */
  it("keeps in-range cursor", (): void => {
    expect(normalizeCommandHistoryCursor(secondItemIndex, threeItemCount)).toBe(secondItemIndex);
  });

  /**
   * 範囲外indexを解除することを検証。
   */
  it("clears out-of-range cursor", (): void => {
    expect(normalizeCommandHistoryCursor(outOfRangeIndex, threeItemCount)).toBe(
      commandHistoryCursorCleared,
    );
  });
});
