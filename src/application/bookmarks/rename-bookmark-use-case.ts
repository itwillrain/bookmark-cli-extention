import type {
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  createNotFoundFailure,
  createOrganizeBookmarkValue,
  createPreviewOnlyResult,
  createSuccess,
  requireConfirmation,
  resolveTargetBookmark,
} from "./bookmark-organization-use-case-helpers";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import { createBookmarkOrganizationPreview } from "../../domain/bookmarks/bookmark-organization-preview";

/** Bookmark名称変更use case入力。 */
export interface RenameBookmarkInput extends OrganizeBookmarkBaseInput {
  /** 対象の直前結果番号入力。 */
  readonly targetInput: string;
  /** 直前結果一覧。 */
  readonly lastResultEntries: readonly BookmarkCliEntry[];
  /** 変更後title入力。 */
  readonly titleInput: string;
}

/** 空文字。 */
const emptyString = "";

/** Rename実行context。 */
interface RenameExecutionContext {
  /** 名称変更対象entry。 */
  readonly entry: BookmarkEntry;
  /** Bookmark名称変更use case入力。 */
  readonly input: RenameBookmarkInput;
  /** Rename preview。 */
  readonly preview: ReturnType<typeof createRenamePreview>;
  /** 変更後title。 */
  readonly title: string;
}

/**
 * Rename previewを作成。
 * @param {BookmarkEntry} entry 名称変更対象entry。
 * @param {string} title 変更後title。
 * @returns {ReturnType<typeof createBookmarkOrganizationPreview>} Rename preview。
 */
const createRenamePreview = (
  entry: BookmarkEntry,
  title: string,
): ReturnType<typeof createBookmarkOrganizationPreview> =>
  createBookmarkOrganizationPreview({
    action: "rename",
    after: title,
    before: entry.title,
    title: entry.title,
  });

/**
 * Rename previewまたは確認不足を解決。
 * @param {RenameBookmarkInput} input Bookmark名称変更use case入力。
 * @param {BookmarkEntry} entry 名称変更対象entry。
 * @param {ReturnType<typeof createRenamePreview>} preview Rename preview。
 * @returns {OrganizeBookmarkResult | false} Previewまたは確認不足の結果。
 */
const resolveRenamePreviewResult = (
  input: RenameBookmarkInput,
  entry: BookmarkEntry,
  preview: ReturnType<typeof createRenamePreview>,
): OrganizeBookmarkResult | false => {
  const confirmationFailure = requireConfirmation(input.preview, input.yes, preview);

  if (confirmationFailure !== false) {
    return confirmationFailure;
  }

  return createPreviewOnlyResult(input.preview, entry, preview);
};

/**
 * 確認済みRenameを実行。
 * @param {RenameExecutionContext} context Rename実行context。
 * @returns {Promise<OrganizeBookmarkResult>} Rename実行結果。
 */
const executeConfirmedRename = async (
  context: RenameExecutionContext,
): Promise<OrganizeBookmarkResult> => {
  const renamedEntry = await context.input.organizer.renameEntry({
    id: context.entry.id,
    title: context.title,
  });

  return createSuccess(createOrganizeBookmarkValue(true, [renamedEntry], context.preview));
};

/**
 * Rename実行contextを作成。
 * @param {RenameBookmarkInput} input Bookmark名称変更use case入力。
 * @returns {OrganizeBookmarkResult | RenameExecutionContext} Rename実行context。
 */
const createRenameExecutionContext = (
  input: RenameBookmarkInput,
): OrganizeBookmarkResult | RenameExecutionContext => {
  const targetResolution = resolveTargetBookmark(input.lastResultEntries, input.targetInput);
  const title = input.titleInput.trim();

  if (!targetResolution.ok) {
    return targetResolution;
  }

  if (title === emptyString) {
    return createNotFoundFailure(input.targetInput);
  }

  return {
    entry: targetResolution.value,
    input,
    preview: createRenamePreview(targetResolution.value, title),
    title,
  };
};

/**
 * Bookmark名を変更またはpreview。
 * @param {RenameBookmarkInput} input Bookmark名称変更use case入力。
 * @returns {Promise<OrganizeBookmarkResult>} Bookmark名称変更結果。
 */
export const renameBookmark = async (
  input: RenameBookmarkInput,
): Promise<OrganizeBookmarkResult> => {
  const context = createRenameExecutionContext(input);

  if ("ok" in context) {
    return context;
  }

  const previewResult = resolveRenamePreviewResult(input, context.entry, context.preview);

  if (previewResult !== false) {
    return previewResult;
  }

  const result = await executeConfirmedRename(context);

  return result;
};
