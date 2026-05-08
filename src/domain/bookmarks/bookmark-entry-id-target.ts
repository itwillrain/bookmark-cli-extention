/** Bookmark entry ID target prefix。 */
const bookmarkEntryIdTargetPrefix = "entry-id:";

/** Bookmark entry ID target prefix長。 */
const bookmarkEntryIdTargetPrefixLength = bookmarkEntryIdTargetPrefix.length;

/** 空文字。 */
const emptyString = "";

/**
 * Bookmark entry ID target入力を作成。
 * @param {string} entryId Bookmark entry ID。
 * @returns {string} Bookmark entry ID target入力。
 * @example
 * ```ts
 * const targetInput = createBookmarkEntryIdTargetInput("42");
 * // "entry-id:42"
 * ```
 */
export const createBookmarkEntryIdTargetInput = (entryId: string): string =>
  `${bookmarkEntryIdTargetPrefix}${entryId}`;

/**
 * Bookmark entry ID target入力からentry IDを取り出す。
 * @param {string} targetInput 対象入力。
 * @returns {string | false} Entry ID、またはID targetでなければfalse。
 * @example
 * ```ts
 * const entryId = parseBookmarkEntryIdTargetInput("entry-id:42");
 * ```
 */
export const parseBookmarkEntryIdTargetInput = (targetInput: string): string | false => {
  const normalizedTargetInput = targetInput.trim();

  if (!normalizedTargetInput.startsWith(bookmarkEntryIdTargetPrefix)) {
    return false;
  }

  const entryId = normalizedTargetInput.slice(bookmarkEntryIdTargetPrefixLength);

  if (entryId === emptyString) {
    return false;
  }

  return entryId;
};
