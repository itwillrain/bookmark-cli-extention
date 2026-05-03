import type {
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  createFolderNotFoundFailure,
  createOrganizeBookmarkValue,
  createParentId,
  createPreviewOnlyResult,
  createSuccess,
  requireConfirmation,
  resolveTargetBookmark,
} from "./bookmark-organization-use-case-helpers";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import { createBookmarkOrganizationPreview } from "../../domain/bookmarks/bookmark-organization-preview";
import { doesFolderPathExist } from "../../domain/bookmarks/bookmark-directory";
import { resolveFolderPath } from "../../domain/bookmarks/current-directory";

/** Bookmark移動use case入力。 */
export interface MoveBookmarkInput extends OrganizeBookmarkBaseInput {
  /** 移動先folder path入力。 */
  readonly targetFolderPathInput: string;
  /** 対象の直前結果番号入力。 */
  readonly targetInput: string;
  /** 直前結果一覧。 */
  readonly lastResultEntries: readonly BookmarkCliEntry[];
}

/** Move実行context。 */
interface MoveExecutionContext {
  /** Bookmark Tree。 */
  readonly bookmarkTree: Awaited<ReturnType<MoveBookmarkInput["repository"]["getBookmarkTree"]>>;
  /** 移動対象entry。 */
  readonly entry: BookmarkEntry;
  /** Bookmark移動use case入力。 */
  readonly input: MoveBookmarkInput;
  /** Move preview。 */
  readonly preview: ReturnType<typeof createMovePreview>;
  /** 移動先folder path。 */
  readonly targetFolderPath: ReturnType<typeof resolveFolderPath>;
}

/**
 * Move previewを作成。
 * @param {BookmarkEntry} entry 移動対象entry。
 * @param {ReturnType<typeof resolveFolderPath>} targetFolderPath 移動先folder path。
 * @returns {ReturnType<typeof createBookmarkOrganizationPreview>} Move preview。
 */
const createMovePreview = (
  entry: BookmarkEntry,
  targetFolderPath: ReturnType<typeof resolveFolderPath>,
): ReturnType<typeof createBookmarkOrganizationPreview> =>
  createBookmarkOrganizationPreview({
    action: "move",
    after: targetFolderPath,
    before: entry.folderPath,
    title: entry.title,
  });

/**
 * Move previewまたは確認不足を解決。
 * @param {MoveBookmarkInput} input Bookmark移動use case入力。
 * @param {BookmarkEntry} entry 移動対象entry。
 * @param {ReturnType<typeof createMovePreview>} preview Move preview。
 * @returns {OrganizeBookmarkResult | false} Previewまたは確認不足の結果。
 */
const resolveMovePreviewResult = (
  input: MoveBookmarkInput,
  entry: BookmarkEntry,
  preview: ReturnType<typeof createMovePreview>,
): OrganizeBookmarkResult | false => {
  const confirmationFailure = requireConfirmation(input.preview, input.yes, preview);

  if (confirmationFailure !== false) {
    return confirmationFailure;
  }

  return createPreviewOnlyResult(input.preview, entry, preview);
};

/**
 * 確認済みMoveを実行。
 * @param {MoveExecutionContext} context Move実行context。
 * @returns {Promise<OrganizeBookmarkResult>} Move実行結果。
 */
const executeConfirmedMove = async (
  context: MoveExecutionContext,
): Promise<OrganizeBookmarkResult> => {
  const movedEntry = await context.input.organizer.moveEntry({
    id: context.entry.id,
    parentId: createParentId(context.bookmarkTree, context.targetFolderPath),
  });

  return createSuccess(createOrganizeBookmarkValue(true, [movedEntry], context.preview));
};

/**
 * Move実行contextを作成。
 * @param {MoveBookmarkInput} input Bookmark移動use case入力。
 * @param {BookmarkEntry} entry 移動対象entry。
 * @returns {Promise<OrganizeBookmarkResult | MoveExecutionContext>} Move実行context。
 */
const createMoveExecutionContext = async (
  input: MoveBookmarkInput,
  entry: BookmarkEntry,
): Promise<OrganizeBookmarkResult | MoveExecutionContext> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const targetFolderPath = resolveFolderPath(input.currentDirectory, input.targetFolderPathInput);

  if (!doesFolderPathExist(bookmarkTree, targetFolderPath)) {
    return createFolderNotFoundFailure(targetFolderPath);
  }

  return {
    bookmarkTree,
    entry,
    input,
    preview: createMovePreview(entry, targetFolderPath),
    targetFolderPath,
  };
};

/**
 * Bookmarkを移動またはpreview。
 * @param {MoveBookmarkInput} input Bookmark移動use case入力。
 * @returns {Promise<OrganizeBookmarkResult>} Bookmark移動結果。
 */
export const moveBookmark = async (input: MoveBookmarkInput): Promise<OrganizeBookmarkResult> => {
  const targetResolution = resolveTargetBookmark(input.lastResultEntries, input.targetInput);

  if (!targetResolution.ok) {
    return targetResolution;
  }

  const context = await createMoveExecutionContext(input, targetResolution.value);

  if ("ok" in context) {
    return context;
  }

  const previewResult = resolveMovePreviewResult(input, context.entry, context.preview);

  if (previewResult !== false) {
    return previewResult;
  }

  return executeConfirmedMove(context);
};
