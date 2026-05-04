import type {
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  createNotFoundFailure,
  createOrganizeBookmarkValue,
  createSuccess,
  resolveTargetBookmark,
} from "./bookmark-organization-use-case-helpers";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";

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
  /** 変更後title。 */
  readonly title: string;
}

/**
 * Renameを実行。
 * @param {RenameExecutionContext} context Rename実行context。
 * @returns {Promise<OrganizeBookmarkResult>} Rename実行結果。
 */
const executeRename = async (context: RenameExecutionContext): Promise<OrganizeBookmarkResult> => {
  const renamedEntry = await context.input.organizer.renameEntry({
    id: context.entry.id,
    title: context.title,
  });

  return createSuccess(createOrganizeBookmarkValue(true, [renamedEntry]));
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
    title,
  };
};

/**
 * Bookmark名を変更。
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

  const result = await executeRename(context);

  return result;
};
