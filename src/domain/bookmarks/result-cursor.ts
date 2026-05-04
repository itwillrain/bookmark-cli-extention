/** Result cursor未選択状態。 */
export const resultCursorCleared = false;

/** Result cursor index。 */
export type ResultCursorIndex = number | typeof resultCursorCleared;

/** Result cursor移動方向。 */
export type ResultCursorDirection = "next" | "previous";

/** 配列先頭index。 */
const firstIndex = 0;

/** 1件を表す数値。 */
const singleItemCount = 1;

/** 空のitem count。 */
const emptyItemCount = 0;

/** Result cursor移動入力。 */
export interface MoveResultCursorInput {
  /** 現在のcursor index。 */
  readonly currentIndex: ResultCursorIndex;
  /** 移動方向。 */
  readonly direction: ResultCursorDirection;
  /** Result item件数。 */
  readonly itemCount: number;
}

/**
 * Result itemが存在するかを判定。
 * @param {number} itemCount Result item件数。
 * @returns {boolean} itemがあればtrue。
 */
const hasResultItems = (itemCount: number): boolean => itemCount > emptyItemCount;

/**
 * Result cursor indexが範囲内かを判定。
 * @param {number} index cursor index。
 * @param {number} itemCount Result item件数。
 * @returns {boolean} 範囲内ならtrue。
 */
const isCursorInRange = (index: number, itemCount: number): boolean =>
  index >= firstIndex && index < itemCount;

/**
 * 未選択状態から移動したcursor indexを取得。
 * @param {ResultCursorDirection} direction 移動方向。
 * @param {number} itemCount Result item件数。
 * @returns {ResultCursorIndex} 移動後cursor index。
 */
const moveClearedCursor = (
  direction: ResultCursorDirection,
  itemCount: number,
): ResultCursorIndex => {
  if (!hasResultItems(itemCount)) {
    return resultCursorCleared;
  }

  if (direction === "previous") {
    return itemCount - singleItemCount;
  }

  return firstIndex;
};

/**
 * Result cursorを移動。
 * @param {MoveResultCursorInput} input Result cursor移動入力。
 * @returns {ResultCursorIndex} 移動後cursor index。
 * @example
 * ```ts
 * const result = moveResultCursor({ currentIndex: false, direction: "next", itemCount: 3 });
 * // 0
 * ```
 */
export const moveResultCursor = (input: MoveResultCursorInput): ResultCursorIndex => {
  if (input.currentIndex === resultCursorCleared) {
    return moveClearedCursor(input.direction, input.itemCount);
  }

  if (input.direction === "previous") {
    return Math.max(firstIndex, input.currentIndex - singleItemCount);
  }

  return Math.min(input.itemCount - singleItemCount, input.currentIndex + singleItemCount);
};

/**
 * Result cursorを現在の件数に合わせて正規化。
 * @param {ResultCursorIndex} currentIndex 現在のcursor index。
 * @param {number} itemCount Result item件数。
 * @returns {ResultCursorIndex} 正規化後cursor index。
 * @example
 * ```ts
 * const result = normalizeResultCursor(4, 3);
 * // false
 * ```
 */
export const normalizeResultCursor = (
  currentIndex: ResultCursorIndex,
  itemCount: number,
): ResultCursorIndex => {
  if (currentIndex === resultCursorCleared) {
    return resultCursorCleared;
  }

  if (!isCursorInRange(currentIndex, itemCount)) {
    return resultCursorCleared;
  }

  return currentIndex;
};
