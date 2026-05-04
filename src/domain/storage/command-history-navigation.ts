/** Command history cursor未選択状態。 */
export const commandHistoryCursorCleared = false;

/** Command history cursor index。 */
export type CommandHistoryCursorIndex = number | typeof commandHistoryCursorCleared;

/** Command history cursor移動方向。 */
export type CommandHistoryCursorDirection = "next" | "previous";

/** 配列先頭index。 */
const firstIndex = 0;

/** 1件を表す数値。 */
const singleItemCount = 1;

/** 空のitem count。 */
const emptyItemCount = 0;

/** Command history cursor移動入力。 */
export interface MoveCommandHistoryCursorInput {
  /** 現在のcursor index。 */
  readonly currentIndex: CommandHistoryCursorIndex;
  /** 移動方向。 */
  readonly direction: CommandHistoryCursorDirection;
  /** Command history件数。 */
  readonly itemCount: number;
}

/**
 * Command history itemが存在するかを判定。
 * @param {number} itemCount Command history件数。
 * @returns {boolean} itemがあればtrue。
 */
const hasCommandHistoryItems = (itemCount: number): boolean => itemCount > emptyItemCount;

/**
 * Command historyの末尾indexを取得。
 * @param {number} itemCount Command history件数。
 * @returns {number} 末尾index。
 */
const getLastIndex = (itemCount: number): number => itemCount - singleItemCount;

/**
 * Command history cursor indexが範囲内かを判定。
 * @param {number} index cursor index。
 * @param {number} itemCount Command history件数。
 * @returns {boolean} 範囲内ならtrue。
 */
const isCursorInRange = (index: number, itemCount: number): boolean =>
  index >= firstIndex && index < itemCount;

/**
 * 未選択状態から移動したcommand history cursor indexを取得。
 * @param {CommandHistoryCursorDirection} direction 移動方向。
 * @param {number} itemCount Command history件数。
 * @returns {CommandHistoryCursorIndex} 移動後cursor index。
 */
const moveClearedCursor = (
  direction: CommandHistoryCursorDirection,
  itemCount: number,
): CommandHistoryCursorIndex => {
  if (!hasCommandHistoryItems(itemCount) || direction === "next") {
    return commandHistoryCursorCleared;
  }

  return getLastIndex(itemCount);
};

/**
 * Command history cursorを移動。
 * @param {MoveCommandHistoryCursorInput} input Command history cursor移動入力。
 * @returns {CommandHistoryCursorIndex} 移動後cursor index。
 * @example
 * ```ts
 * const result = moveCommandHistoryCursor({ currentIndex: false, direction: "previous", itemCount: 3 });
 * // 2
 * ```
 */
export const moveCommandHistoryCursor = (
  input: MoveCommandHistoryCursorInput,
): CommandHistoryCursorIndex => {
  if (input.currentIndex === commandHistoryCursorCleared) {
    return moveClearedCursor(input.direction, input.itemCount);
  }

  if (input.direction === "previous") {
    return Math.max(firstIndex, input.currentIndex - singleItemCount);
  }

  if (input.currentIndex >= getLastIndex(input.itemCount)) {
    return commandHistoryCursorCleared;
  }

  return input.currentIndex + singleItemCount;
};

/**
 * Command history cursorを現在の件数に合わせて正規化。
 * @param {CommandHistoryCursorIndex} currentIndex 現在のcursor index。
 * @param {number} itemCount Command history件数。
 * @returns {CommandHistoryCursorIndex} 正規化後cursor index。
 * @example
 * ```ts
 * const result = normalizeCommandHistoryCursor(3, 2);
 * // false
 * ```
 */
export const normalizeCommandHistoryCursor = (
  currentIndex: CommandHistoryCursorIndex,
  itemCount: number,
): CommandHistoryCursorIndex => {
  if (currentIndex === commandHistoryCursorCleared) {
    return commandHistoryCursorCleared;
  }

  if (!isCursorInRange(currentIndex, itemCount)) {
    return commandHistoryCursorCleared;
  }

  return currentIndex;
};
