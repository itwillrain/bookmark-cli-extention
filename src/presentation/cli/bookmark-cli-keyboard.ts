/** Bookmark CLI keyboard action。 */
export type BookmarkCliKeyboardAction =
  | "clear"
  | "complete"
  | "historyNext"
  | "historyPrevious"
  | "none"
  | "resultNext"
  | "resultPrevious";

/** Bookmark CLI keyboard eventの最小shape。 */
export interface BookmarkCliKeyboardEvent {
  /** Control keyが押されているか。 */
  readonly ctrlKey: boolean;
  /** 押されたkey名。 */
  readonly key: string;
}

/** Ctrl+j key。 */
const resultNextKey = "j";

/** Ctrl+k key。 */
const resultPreviousKey = "k";

/** Ctrl+n key。 */
const historyNextControlKey = "n";

/** Ctrl+p key。 */
const historyPreviousControlKey = "p";

/** 履歴を新しい方向へ移動するkey。 */
const historyNextArrowKey = "ArrowDown";

/** 履歴を古い方向へ移動するkey。 */
const historyPreviousArrowKey = "ArrowUp";

/** Tab key。 */
const completeKey = "Tab";

/** Escape key。 */
const clearKey = "Escape";

/**
 * Ctrl付きkeyごとのkeyboard actionです。
 */
const controlKeyActions = {
  [historyNextControlKey]: "historyNext",
  [historyPreviousControlKey]: "historyPrevious",
  [resultNextKey]: "resultNext",
  [resultPreviousKey]: "resultPrevious",
} satisfies Readonly<Record<string, BookmarkCliKeyboardAction>>;

/**
 * 単独keyごとのkeyboard actionです。
 */
const keyActions = {
  [clearKey]: "clear",
  [completeKey]: "complete",
  [historyNextArrowKey]: "historyNext",
  [historyPreviousArrowKey]: "historyPrevious",
} satisfies Readonly<Record<string, BookmarkCliKeyboardAction>>;

/**
 * Key action mapからactionを取得します。
 * @param {Readonly<Record<string, BookmarkCliKeyboardAction>>} actions keyboard action mapです。
 * @param {string} key 押されたkey名です。
 * @returns {BookmarkCliKeyboardAction | undefined} 対応するactionです。
 */
const getKeyboardAction = (
  actions: Readonly<Record<string, BookmarkCliKeyboardAction>>,
  key: string,
): BookmarkCliKeyboardAction | undefined => actions[key];

/**
 * Bookmark CLI keyboard actionを解決。
 * @param {BookmarkCliKeyboardEvent} event keyboard event。
 * @returns {BookmarkCliKeyboardAction} keyboard action。
 */
export const resolveBookmarkCliKeyboardAction = (
  event: BookmarkCliKeyboardEvent,
): BookmarkCliKeyboardAction => {
  if (event.ctrlKey) {
    return getKeyboardAction(controlKeyActions, event.key) ?? "none";
  }

  return getKeyboardAction(keyActions, event.key) ?? "none";
};
