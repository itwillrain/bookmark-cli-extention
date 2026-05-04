/** Completion cursor未選択状態。 */
export const completionCursorCleared = false;

/** Completion cursor index。 */
export type CompletionCursorIndex = number | typeof completionCursorCleared;

/** Completion cursor移動方向。 */
export type CompletionCursorDirection = "next" | "previous";

/** 配列先頭index。 */
const firstIndex = 0;

/** 1件を表す数値。 */
const singleItemCount = 1;

/** 空のitem count。 */
const emptyItemCount = 0;

/** Completion cursor移動入力。 */
export interface MoveCompletionCursorInput {
  /** 現在のcursor index。 */
  readonly currentIndex: CompletionCursorIndex;
  /** Completion cursor移動方向。 */
  readonly direction: CompletionCursorDirection;
  /** Completion item件数。 */
  readonly itemCount: number;
}

/** Completion cursor移動関数。 */
type CompletionCursorMover = (currentIndex: number, itemCount: number) => CompletionCursorIndex;

/**
 * Completion itemが存在するかを判定。
 * @param {number} itemCount Completion item件数。
 * @returns {boolean} itemがあればtrue。
 */
const hasCompletionItems = (itemCount: number): boolean => itemCount > emptyItemCount;

/**
 * Completion cursor indexが範囲内かを判定。
 * @param {number} index cursor index。
 * @param {number} itemCount Completion item件数。
 * @returns {boolean} 範囲内ならtrue。
 */
const isCursorInRange = (index: number, itemCount: number): boolean =>
  index >= firstIndex && index < itemCount;

/**
 * 末尾indexを作成。
 * @param {number} itemCount Completion item件数。
 * @returns {number} 末尾index。
 */
const createLastIndex = (itemCount: number): number => itemCount - singleItemCount;

/**
 * Completion cursorを次候補へ移動。
 * @param {number} currentIndex 現在のcursor index。
 * @param {number} itemCount Completion item件数。
 * @returns {CompletionCursorIndex} 移動後cursor index。
 */
const moveCompletionCursorNext = (currentIndex: number, itemCount: number): CompletionCursorIndex =>
  (currentIndex + singleItemCount) % itemCount;

/**
 * Completion cursorを前候補へ移動。
 * @param {number} currentIndex 現在のcursor index。
 * @param {number} itemCount Completion item件数。
 * @returns {CompletionCursorIndex} 移動後cursor index。
 */
const moveCompletionCursorPrevious = (
  currentIndex: number,
  itemCount: number,
): CompletionCursorIndex => (currentIndex + itemCount - singleItemCount) % itemCount;

/**
 * 未選択状態から移動先indexを作成。
 * @param {CompletionCursorDirection} direction Completion cursor移動方向。
 * @param {number} itemCount Completion item件数。
 * @returns {CompletionCursorIndex} 移動後cursor index。
 */
const createInitialCompletionCursorIndex = (
  direction: CompletionCursorDirection,
  itemCount: number,
): CompletionCursorIndex => {
  if (direction === "previous") {
    return createLastIndex(itemCount);
  }

  return firstIndex;
};

/**
 * Completion cursor移動関数map。
 */
const completionCursorMovers = {
  next: moveCompletionCursorNext,
  previous: moveCompletionCursorPrevious,
} satisfies Readonly<Record<CompletionCursorDirection, CompletionCursorMover>>;

/**
 * Completion cursorを指定方向の候補へ移動。
 * @param {MoveCompletionCursorInput} input Completion cursor移動入力。
 * @returns {CompletionCursorIndex} 移動後cursor index。
 */
export const moveCompletionCursor = (input: MoveCompletionCursorInput): CompletionCursorIndex => {
  if (!hasCompletionItems(input.itemCount)) {
    return completionCursorCleared;
  }

  if (input.currentIndex === completionCursorCleared) {
    return createInitialCompletionCursorIndex(input.direction, input.itemCount);
  }

  return completionCursorMovers[input.direction](input.currentIndex, input.itemCount);
};

/**
 * Completion cursorを現在の件数に合わせて正規化。
 * @param {CompletionCursorIndex} currentIndex 現在のcursor index。
 * @param {number} itemCount Completion item件数。
 * @returns {CompletionCursorIndex} 正規化後cursor index。
 */
export const normalizeCompletionCursor = (
  currentIndex: CompletionCursorIndex,
  itemCount: number,
): CompletionCursorIndex => {
  if (currentIndex === completionCursorCleared) {
    return completionCursorCleared;
  }

  if (!isCursorInRange(currentIndex, itemCount)) {
    return completionCursorCleared;
  }

  return currentIndex;
};
