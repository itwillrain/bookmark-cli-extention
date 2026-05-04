import type {
  BookmarkCommandFailure,
  BookmarkCommandResult,
  BookmarkCommandSuccess,
} from "./bookmark-use-cases";
import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { CurrentDirectory } from "../../domain/bookmarks/current-directory";
import type { OrganizeBookmarkValue } from "./bookmark-organization-use-case-types";
import { resolveEntryByResultNumber } from "../../domain/bookmarks/result-selection";

/** Folder未検出のエラーcode。 */
const folderNotFoundErrorCode = "folder_not_found";

/** 候補未検出のエラーcode。 */
const notFoundErrorCode = "not_found";

/** 空文字。 */
const emptyString = "";

/** Folder path separator。 */
const folderPathSeparator = "/";

/** 最後の要素offset。 */
const lastItemOffset = 1;

/**
 * 成功結果を作成。
 * @param {TValue} value 成功値。
 * @returns {BookmarkCommandSuccess<TValue>} 成功結果。
 * @example
 * ```ts
 * const result = createSuccess(value);
 * ```
 */
export const createSuccess = <TValue>(value: TValue): BookmarkCommandSuccess<TValue> => ({
  ok: true,
  value,
});

/**
 * 失敗結果を作成。
 * @param {BookmarkCommandFailure["errorCode"]} errorCode エラーcode。
 * @param {string} message 表示message。
 * @returns {BookmarkCommandFailure} 失敗結果。
 * @example
 * ```ts
 * const result = createFailure(errorCode, message);
 * ```
 */
export const createFailure = (
  errorCode: BookmarkCommandFailure["errorCode"],
  message: string,
): BookmarkCommandFailure => ({
  errorCode,
  message,
  ok: false,
});

/**
 * Folder未検出の失敗結果を作成。
 * @param {CurrentDirectory} folderPath 見つからなかったfolder path。
 * @returns {BookmarkCommandFailure} Folder未検出の失敗結果。
 * @example
 * ```ts
 * const result = createFolderNotFoundFailure(folderPath);
 * ```
 */
export const createFolderNotFoundFailure = (folderPath: CurrentDirectory): BookmarkCommandFailure =>
  createFailure(folderNotFoundErrorCode, `Folder was not found: ${folderPath}`);

/**
 * 対象未検出の失敗結果を作成。
 * @param {string} targetInput 対象入力。
 * @returns {BookmarkCommandFailure} 対象未検出の失敗結果。
 * @example
 * ```ts
 * const result = createNotFoundFailure(targetInput);
 * ```
 */
export const createNotFoundFailure = (targetInput: string): BookmarkCommandFailure =>
  createFailure(notFoundErrorCode, `Bookmark target was not found: ${targetInput}`);

/**
 * EntryがBookmarkかを判定。
 * @param {BookmarkCliEntry} entry 判定対象entry。
 * @returns {boolean} Bookmarkならtrue。
 */
const isBookmarkEntry = (entry: BookmarkCliEntry): entry is BookmarkEntry =>
  entry.kind === "bookmark";

/**
 * Bookmark Treeからfolder pathに対応するfolder IDを取得。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {CurrentDirectory} folderPath folder path。
 * @returns {string | undefined} Folder ID。
 */
const findFolderId = (
  bookmarkTree: BookmarkTree,
  folderPath: CurrentDirectory,
): string | undefined =>
  bookmarkTree.folders.find((folder) => folder.folderPath === folderPath)?.id;

/**
 * Chrome mutationへ渡すparentIdを作成。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {CurrentDirectory} folderPath folder path。
 * @returns {string | undefined} parent ID。CLI rootではブラウザ既定の保存先に委ねる。
 * @example
 * ```ts
 * const result = createParentId(bookmarkTree, folderPath);
 * ```
 */
export const createParentId = (
  bookmarkTree: BookmarkTree,
  folderPath: CurrentDirectory,
): string | undefined => findFolderId(bookmarkTree, folderPath);

/**
 * Folder pathから最後のsegmentを取得。
 * @param {CurrentDirectory} folderPath folder path。
 * @returns {string} 最後のpath segment。
 * @example
 * ```ts
 * const result = getFolderName(folderPath);
 * ```
 */
export const getFolderName = (folderPath: CurrentDirectory): string => {
  const segments = folderPath
    .split(folderPathSeparator)
    .filter((segment) => segment !== emptyString);

  return segments[segments.length - lastItemOffset] ?? emptyString;
};

/**
 * 直前結果番号からBookmarkを解決。
 * @param {readonly BookmarkCliEntry[]} lastResultEntries 直前結果一覧。
 * @param {string} targetInput 対象番号入力。
 * @returns {BookmarkCommandResult<BookmarkEntry>} Bookmark解決結果。
 * @example
 * ```ts
 * const result = resolveTargetBookmark(lastResultEntries, targetInput);
 * ```
 */
export const resolveTargetBookmark = (
  lastResultEntries: readonly BookmarkCliEntry[],
  targetInput: string,
): BookmarkCommandResult<BookmarkEntry> => {
  const resolution = resolveEntryByResultNumber(lastResultEntries, targetInput);

  if (!resolution.ok || !isBookmarkEntry(resolution.entry)) {
    return createNotFoundFailure(targetInput);
  }

  return createSuccess(resolution.entry);
};

/**
 * Bookmark整理成功値を作成。
 * @param {boolean} executed 書き込み済みならtrue。
 * @param {readonly BookmarkEntry[]} entries 表示対象entry一覧。
 * @returns {OrganizeBookmarkValue} Bookmark整理成功値。
 * @example
 * ```ts
 * const result = createOrganizeBookmarkValue(executed, entries);
 * ```
 */
export const createOrganizeBookmarkValue = (
  executed: boolean,
  entries: readonly BookmarkEntry[],
): OrganizeBookmarkValue => ({ entries, executed });
