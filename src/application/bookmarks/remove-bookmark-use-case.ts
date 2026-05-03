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
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import { createBookmarkOrganizationPreview } from "../../domain/bookmarks/bookmark-organization-preview";

/** Bookmark削除use case入力。 */
export interface RemoveBookmarkInput extends Omit<OrganizeBookmarkBaseInput, "preview" | "yes"> {
  /** 確認なしで削除するか。 */
  readonly force: boolean;
  /** 対象の直前結果番号入力。 */
  readonly targetInput: string;
  /** 直前結果一覧。 */
  readonly lastResultEntries: readonly BookmarkCliEntry[];
}

/** 削除済みを表すpreview label。 */
const deletedPreviewLabel = "deleted";

/**
 * Remove previewを作成。
 * @param {BookmarkEntry} entry 削除対象entry。
 * @returns {ReturnType<typeof createBookmarkOrganizationPreview>} Remove preview。
 */
const createRemovePreview = (
  entry: BookmarkEntry,
): ReturnType<typeof createBookmarkOrganizationPreview> =>
  createBookmarkOrganizationPreview({
    action: "remove",
    after: deletedPreviewLabel,
    before: entry.folderPath,
    title: entry.title,
  });

/**
 * Bookmarkを削除または確認待ち結果を返す。
 * @param {RemoveBookmarkInput} input Bookmark削除use case入力。
 * @returns {Promise<OrganizeBookmarkResult>} Bookmark削除結果。
 */
export const removeBookmark = async (
  input: RemoveBookmarkInput,
): Promise<OrganizeBookmarkResult> => {
  const targetResolution = resolveTargetBookmark(input.lastResultEntries, input.targetInput);

  if (!targetResolution.ok) {
    return targetResolution;
  }

  const preview = createRemovePreview(targetResolution.value);

  if (!input.force) {
    return createSuccess(createOrganizeBookmarkValue(false, [targetResolution.value], preview));
  }

  await input.organizer.removeEntry({ id: targetResolution.value.id });

  return createSuccess(createOrganizeBookmarkValue(true, [targetResolution.value], preview));
};
