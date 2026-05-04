import type {
  MoveEntryInput,
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  createFolderNotFoundFailure,
  createOrganizeBookmarkValue,
  createParentId,
  createSuccess,
  resolveTargetBookmark,
} from "./bookmark-organization-use-case-helpers";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
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
  /** 移動先folder path。 */
  readonly targetFolderPath: ReturnType<typeof resolveFolderPath>;
}

/**
 * Bookmark移動入力を作成。
 * @param {MoveExecutionContext} context Move実行context。
 * @returns {MoveEntryInput} Bookmark移動入力。
 */
const createMoveEntryInput = (context: MoveExecutionContext): MoveEntryInput => {
  const parentId = createParentId(context.bookmarkTree, context.targetFolderPath);

  if (typeof parentId === "string") {
    return { id: context.entry.id, parentId };
  }

  return { id: context.entry.id };
};

/**
 * Moveを実行。
 * @param {MoveExecutionContext} context Move実行context。
 * @returns {Promise<OrganizeBookmarkResult>} Move実行結果。
 */
const executeMove = async (context: MoveExecutionContext): Promise<OrganizeBookmarkResult> => {
  const movedEntry = await context.input.organizer.moveEntry(createMoveEntryInput(context));

  return createSuccess(createOrganizeBookmarkValue(true, [movedEntry]));
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
    targetFolderPath,
  };
};

/**
 * Bookmarkを移動。
 * @param {MoveBookmarkInput} input Bookmark移動use case入力。
 * @returns {Promise<OrganizeBookmarkResult>} Bookmark移動結果。
 * @example
 * ```ts
 * const result = await moveBookmark({
 *   currentDirectory: "/Work",
 *   lastResultEntries,
 *   organizer,
 *   repository,
 *   targetFolderPathInput: "../Finance",
 *   targetInput: "1",
 * });
 * ```
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

  return executeMove(context);
};
