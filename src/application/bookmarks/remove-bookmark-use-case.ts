import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import type {
  BookmarkOrganizerPort,
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  type CurrentDirectory,
  getParentFolderPath,
  resolveFolderPath,
} from "../../domain/bookmarks/current-directory";
import {
  createFailure,
  createOrganizeBookmarkValue,
  createSuccess,
  getFolderName,
  resolveTargetEntry,
} from "./bookmark-organization-use-case-helpers";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkCommandResult } from "./bookmark-use-cases";
import { parseBookmarkEntryIdTargetInput } from "../../domain/bookmarks/bookmark-entry-id-target";

/** Recursive必須error code。 */
const recursiveRequiredErrorCode = "invalid_argument";

/** 権限不足error code。 */
const permissionDeniedErrorCode = "permission_denied";

/** Folder kind。 */
const folderKind = "folder";

/** 空文字。 */
const emptyString = "";

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
 * Browser管理folder削除の失敗結果を作成。
 * @param {BookmarkEntry} entry 削除対象folder entry。
 * @returns {OrganizeBookmarkResult} Browser管理folder削除失敗結果。
 */
const createBrowserManagedFolderFailure = (entry: BookmarkEntry): OrganizeBookmarkResult =>
  createFailure(
    permissionDeniedErrorCode,
    `rm: cannot remove '${entry.title}': browser managed folder cannot be removed`,
  );

/**
 * EntryがBrowser管理folderかを判定。
 * @param {BookmarkEntry} entry 判定対象entry。
 * @returns {boolean} Browser管理folderならtrue。
 */
const isBrowserManagedFolderEntry = (entry: BookmarkEntry): boolean =>
  isFolderEntry(entry) && typeof entry.folderType === "string";

/**
 * Folder pathに対応するfolder entryを検索。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {CurrentDirectory} folderPath folder path。
 * @returns {BookmarkEntry | undefined} folder entry。
 */
const findFolderEntryByPath = (
  bookmarkTree: BookmarkTree,
  folderPath: CurrentDirectory,
): BookmarkEntry | undefined =>
  bookmarkTree.folders.find((entry) => entry.folderPath === folderPath);

/**
 * Pathに対応するbookmark entryを検索。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {CurrentDirectory} targetPath 対象path。
 * @returns {BookmarkEntry | undefined} bookmark entry。
 */
const findBookmarkEntryByPath = (
  bookmarkTree: BookmarkTree,
  targetPath: CurrentDirectory,
): BookmarkEntry | undefined => {
  const parentPath = getParentFolderPath(targetPath);
  const bookmarkTitle = getFolderName(targetPath);

  return bookmarkTree.bookmarks.find(
    (entry) => entry.folderPath === parentPath && entry.title === bookmarkTitle,
  );
};

/**
 * Entry IDに対応するBookmark entryを検索。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {string} entryId Entry ID。
 * @returns {BookmarkEntry | undefined} Bookmark entry。
 */
const findEntryById = (bookmarkTree: BookmarkTree, entryId: string): BookmarkEntry | undefined =>
  bookmarkTree.entries.find((entry) => entry.id === entryId);

/**
 * Entry ID入力から削除対象entryを解決。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {string} targetInput 対象入力。
 * @returns {BookmarkCommandResult<BookmarkEntry> | false} 対象entry解決結果。
 */
const resolveTargetEntryById = (
  bookmarkTree: BookmarkTree,
  targetInput: string,
): BookmarkCommandResult<BookmarkEntry> | false => {
  const entryId = parseBookmarkEntryIdTargetInput(targetInput);

  if (entryId === false) {
    return false;
  }

  const entry = findEntryById(bookmarkTree, entryId);

  if (entry) {
    return createSuccess(entry);
  }

  return createFailure("not_found", `Bookmark target was not found: ${targetInput}`);
};

/**
 * Path入力から削除対象entryを解決。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {CurrentDirectory} currentDirectory 現在ディレクトリ。
 * @param {string} targetInput 対象path入力。
 * @returns {BookmarkCommandResult<BookmarkEntry>} 対象entry解決結果。
 */
const resolveTargetEntryByPath = (
  bookmarkTree: BookmarkTree,
  currentDirectory: CurrentDirectory,
  targetInput: string,
): BookmarkCommandResult<BookmarkEntry> => {
  if (targetInput.trim() === emptyString) {
    return createFailure("not_found", `Bookmark target was not found: ${targetInput}`);
  }

  const targetPath = resolveFolderPath(currentDirectory, targetInput);
  const folderEntry = findFolderEntryByPath(bookmarkTree, targetPath);

  if (folderEntry) {
    return createSuccess(folderEntry);
  }

  const bookmarkEntry = findBookmarkEntryByPath(bookmarkTree, targetPath);

  if (bookmarkEntry) {
    return createSuccess(bookmarkEntry);
  }

  return createFailure("not_found", `Bookmark target was not found: ${targetInput}`);
};

/**
 * 削除対象entryをresult numberまたはpathから解決。
 * @param {RemoveBookmarkInput} input Bookmark削除use case入力。
 * @returns {Promise<BookmarkCommandResult<BookmarkEntry>>} 対象entry解決結果。
 */
const resolveRemoveTargetEntry = async (
  input: RemoveBookmarkInput,
): Promise<BookmarkCommandResult<BookmarkEntry>> => {
  const resultNumberResolution = resolveTargetEntry(input.lastResultEntries, input.targetInput);

  if (resultNumberResolution.ok) {
    return resultNumberResolution;
  }

  const bookmarkTree = await input.repository.getBookmarkTree();
  const entryIdResolution = resolveTargetEntryById(bookmarkTree, input.targetInput);

  if (entryIdResolution !== false) {
    return entryIdResolution;
  }

  return resolveTargetEntryByPath(bookmarkTree, input.currentDirectory, input.targetInput);
};

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

/**
 * 削除前に失敗または確認待ち結果を作成。
 * @param {RemoveBookmarkInput} input Bookmark削除use case入力。
 * @param {BookmarkEntry} entry 削除対象entry。
 * @returns {OrganizeBookmarkResult | false} 失敗または確認待ち結果。
 */
const createPreRemoveResult = (
  input: RemoveBookmarkInput,
  entry: BookmarkEntry,
): OrganizeBookmarkResult | false => {
  if (isFolderEntry(entry) && !input.recursive) {
    return createRecursiveRequiredFailure(entry);
  }

  if (isBrowserManagedFolderEntry(entry)) {
    return createBrowserManagedFolderFailure(entry);
  }

  if (!input.force) {
    return createSuccess(createOrganizeBookmarkValue(false, [entry]));
  }

  return false;
};

/** Bookmark削除use case入力。 */
export interface RemoveBookmarkInput extends OrganizeBookmarkBaseInput {
  /** 確認なしで削除するか。 */
  readonly force: boolean;
  /** Folder subtreeを再帰削除するか。 */
  readonly recursive: boolean;
  /** 対象の直前結果番号またはpath入力。 */
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
  const targetResolution = await resolveRemoveTargetEntry(input);

  if (!targetResolution.ok) {
    return targetResolution;
  }

  const preRemoveResult = createPreRemoveResult(input, targetResolution.value);

  if (preRemoveResult !== false) {
    return preRemoveResult;
  }

  await executeRemoveEntry(input.organizer, targetResolution.value);

  return createSuccess(createOrganizeBookmarkValue(true, [targetResolution.value]));
};
