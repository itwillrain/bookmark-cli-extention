/** Bookmark CLI keyboard action。 */
export type BookmarkCliKeyboardAction =
  | "clear"
  | "confirmCompletion"
  | "deletePreviousWord"
  | "historyNext"
  | "historyPrevious"
  | "killAfterCursor"
  | "killBeforeCursor"
  | "lineEnd"
  | "lineStart"
  | "none"
  | "selectNextCompletion";

/** Bookmark CLI keyboard eventの最小shape。 */
export interface BookmarkCliKeyboardEvent {
  /** Control keyが押されているか。 */
  readonly ctrlKey: boolean;
  /** 押されたkey名。 */
  readonly key: string;
}

/** Ctrl+n key。 */
const historyNextControlKey = "n";

/** Ctrl+p key。 */
const historyPreviousControlKey = "p";

/** Ctrl+a key。 */
const lineStartControlKey = "a";

/** Ctrl+e key。 */
const lineEndControlKey = "e";

/** Ctrl+u key。 */
const killBeforeCursorControlKey = "u";

/** Ctrl+k key。 */
const killAfterCursorControlKey = "k";

/** Ctrl+w key。 */
const deletePreviousWordControlKey = "w";

/** 履歴を新しい方向へ移動するkey。 */
const historyNextArrowKey = "ArrowDown";

/** 履歴を古い方向へ移動するkey。 */
const historyPreviousArrowKey = "ArrowUp";

/** Tab key。 */
const selectNextCompletionKey = "Tab";

/** Enter key。 */
const confirmCompletionKey = "Enter";

/** Escape key。 */
const clearKey = "Escape";

/**
 * Ctrl付きkeyごとのkeyboard actionです。
 */
const controlKeyActions = {
  [deletePreviousWordControlKey]: "deletePreviousWord",
  [historyNextControlKey]: "historyNext",
  [historyPreviousControlKey]: "historyPrevious",
  [killAfterCursorControlKey]: "killAfterCursor",
  [killBeforeCursorControlKey]: "killBeforeCursor",
  [lineEndControlKey]: "lineEnd",
  [lineStartControlKey]: "lineStart",
} satisfies Readonly<Record<string, BookmarkCliKeyboardAction>>;

/**
 * 単独keyごとのkeyboard actionです。
 */
const keyActions = {
  [clearKey]: "clear",
  [confirmCompletionKey]: "confirmCompletion",
  [historyNextArrowKey]: "historyNext",
  [historyPreviousArrowKey]: "historyPrevious",
  [selectNextCompletionKey]: "selectNextCompletion",
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
