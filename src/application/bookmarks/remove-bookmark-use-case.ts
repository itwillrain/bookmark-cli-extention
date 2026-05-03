import type {
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  createOrganizeBookmarkValue,
  createPreviewOnlyResult,
  createSuccess,
  requireConfirmation,
  resolveTargetBookmark,
} from "./bookmark-organization-use-case-helpers";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import { createBookmarkOrganizationPreview } from "../../domain/bookmarks/bookmark-organization-preview";

/** Bookmark削除use case入力。 */
export interface RemoveBookmarkInput extends OrganizeBookmarkBaseInput {
  /** 対象の直前結果番号入力。 */
  readonly targetInput: string;
  /** 直前結果一覧。 */
  readonly lastResultEntries: readonly BookmarkEntry[];
}

/** 削除済みを表すpreview label。 */
const deletedPreviewLabel = "deleted";

/**
 * Remove previewを作成。
 * @param {BookmarkEntry} entry 削除対象entry。
 * @returns {ReturnType<typeof createBookmarkOrganizationPreview>} Remove preview。
 */
const createRemovePreview = (entry: BookmarkEntry): ReturnType<typeof createBookmarkOrganizationPreview> =>
  createBookmarkOrganizationPreview({
    action: "remove",
    after: deletedPreviewLabel,
    before: entry.folderPath,
    title: entry.title,
  });

/**
 * Remove previewまたは確認不足を解決。
 * @param {RemoveBookmarkInput} input Bookmark削除use case入力。
 * @param {BookmarkEntry} entry 削除対象entry。
 * @param {ReturnType<typeof createRemovePreview>} preview Remove preview。
 * @returns {OrganizeBookmarkResult | false} Previewまたは確認不足の結果。
 */
const resolveRemovePreviewResult = (
  input: RemoveBookmarkInput,
  entry: BookmarkEntry,
  preview: ReturnType<typeof createRemovePreview>,
): OrganizeBookmarkResult | false => {
  const confirmationFailure = requireConfirmation(input.preview, input.yes, preview);

  if (confirmationFailure !== false) {
    return confirmationFailure;
  }

  return createPreviewOnlyResult(input.preview, entry, preview);
};

/**
 * Bookmarkを削除またはpreview。
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
  const previewResult = resolveRemovePreviewResult(input, targetResolution.value, preview);

  if (previewResult !== false) {
    return previewResult;
  }

  await input.organizer.removeEntry({ id: targetResolution.value.id });

  return createSuccess(createOrganizeBookmarkValue(true, [targetResolution.value], preview));
};
