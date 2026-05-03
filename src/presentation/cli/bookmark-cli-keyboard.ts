/** Bookmark CLI keyboard action。 */
export type BookmarkCliKeyboardAction = "clear" | "complete" | "moveNext" | "movePrevious" | "none";

/** Bookmark CLI keyboard eventの最小shape。 */
export interface BookmarkCliKeyboardEvent {
  /** Control keyが押されているか。 */
  readonly ctrlKey: boolean;
  /** 押されたkey名。 */
  readonly key: string;
}

/** Ctrl+j key。 */
const moveNextKey = "j";

/** Ctrl+k key。 */
const movePreviousKey = "k";

/** Tab key。 */
const completeKey = "Tab";

/** Escape key。 */
const clearKey = "Escape";

/**
 * Bookmark CLI keyboard actionを解決。
 * @param {BookmarkCliKeyboardEvent} event keyboard event。
 * @returns {BookmarkCliKeyboardAction} keyboard action。
 */
export const resolveBookmarkCliKeyboardAction = (
  event: BookmarkCliKeyboardEvent,
): BookmarkCliKeyboardAction => {
  if (event.ctrlKey && event.key === moveNextKey) {
    return "moveNext";
  }

  if (event.ctrlKey && event.key === movePreviousKey) {
    return "movePrevious";
  }

  if (event.key === completeKey) {
    return "complete";
  }

  if (event.key === clearKey) {
    return "clear";
  }

  return "none";
};
