import type {
  BookmarkOrganizerPort,
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  createFailure,
  createOrganizeBookmarkValue,
  createSuccess,
  resolveTargetEntry,
} from "./bookmark-organization-use-case-helpers";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";

/** Recursive必須error code。 */
const recursiveRequiredErrorCode = "invalid_argument";

/** Folder kind。 */
const folderKind = "folder";

/**
 * Entryがfolderかを判定。
 * @param {BookmarkEntry} entry 判定対象entry。
 * @returns {boolean} folderならtrue。
 */
const isFolderEntry = (entry: BookmarkEntry): boolean => entry.kind === folderKind;

/**
 * Folder削除にrecursive指定が必要な失敗結果を作成。
 * @param {BookmarkEntry} entry 削除対象folder entry。
 * @returns {OrganizeBookmarkResult} recursive指定必須の失敗結果。
 */
const createRecursiveRequiredFailure = (entry: BookmarkEntry): OrganizeBookmarkResult =>
  createFailure(
    recursiveRequiredErrorCode,
    `rm: cannot remove '${entry.title}': is a directory; use -r`,
  );

/**
 * Entry種別に応じた削除を実行。
 * @param {BookmarkOrganizerPort} organizer Bookmark整理port。
 * @param {BookmarkEntry} entry 削除対象entry。
 * @returns {Promise<void>} 削除完了Promise。
 */
const executeRemoveEntry = async (
  organizer: BookmarkOrganizerPort,
  entry: BookmarkEntry,
): Promise<void> => {
  if (isFolderEntry(entry)) {
    await organizer.removeFolderTree({ id: entry.id });

    return;
  }

  await organizer.removeEntry({ id: entry.id });
};

/** Bookmark削除use case入力。 */
export interface RemoveBookmarkInput extends OrganizeBookmarkBaseInput {
  /** 確認なしで削除するか。 */
  readonly force: boolean;
  /** Folder subtreeを再帰削除するか。 */
  readonly recursive: boolean;
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
 *   recursive: false,
 *   repository,
 *   targetInput: "1",
 * });
 * ```
 */
export const removeBookmark = async (
  input: RemoveBookmarkInput,
): Promise<OrganizeBookmarkResult> => {
  const targetResolution = resolveTargetEntry(input.lastResultEntries, input.targetInput);

  if (!targetResolution.ok) {
    return targetResolution;
  }

  if (isFolderEntry(targetResolution.value) && !input.recursive) {
    return createRecursiveRequiredFailure(targetResolution.value);
  }

  if (!input.force) {
    return createSuccess(createOrganizeBookmarkValue(false, [targetResolution.value]));
  }

  await executeRemoveEntry(input.organizer, targetResolution.value);

  return createSuccess(createOrganizeBookmarkValue(true, [targetResolution.value]));
};
