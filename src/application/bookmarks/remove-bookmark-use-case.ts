import type {
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  createOrganizeBookmarkValue,
  createSuccess,
  resolveTargetBookmark,
} from "./bookmark-organization-use-case-helpers";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";

/** Bookmark削除use case入力。 */
export interface RemoveBookmarkInput extends OrganizeBookmarkBaseInput {
  /** 確認なしで削除するか。 */
  readonly force: boolean;
  /** 対象の直前結果番号入力。 */
  readonly targetInput: string;
  /** 直前結果一覧。 */
  readonly lastResultEntries: readonly BookmarkCliEntry[];
}

/**
 * Bookmarkを削除または確認待ち結果を返す。
 * @param {RemoveBookmarkInput} input Bookmark削除use case入力。
 * @returns {Promise<OrganizeBookmarkResult>} Bookmark削除結果。
 * @example
 * ```ts
 * const result = await removeBookmark({
 *   currentDirectory: "/Work",
 *   force: false,
 *   lastResultEntries,
 *   organizer,
 *   repository,
 *   targetInput: "1",
 * });
 * ```
 */
export const removeBookmark = async (
  input: RemoveBookmarkInput,
): Promise<OrganizeBookmarkResult> => {
  const targetResolution = resolveTargetBookmark(input.lastResultEntries, input.targetInput);

  if (!targetResolution.ok) {
    return targetResolution;
  }

  if (!input.force) {
    return createSuccess(createOrganizeBookmarkValue(false, [targetResolution.value]));
  }

  await input.organizer.removeEntry({ id: targetResolution.value.id });

  return createSuccess(createOrganizeBookmarkValue(true, [targetResolution.value]));
};
