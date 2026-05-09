import type {
  BookmarkCommandResult,
  BookmarkCommandSuccess,
  BookmarkRepositoryPort,
} from "./bookmark-use-cases";
import {
  type BookmarkDiagnosticChecks,
  type BookmarkDiagnosticIssue,
  findBookmarkDiagnostics,
} from "../../domain/bookmarks/bookmark-diagnostics";

/**
 * Bookmark診断入力です。
 */
export interface DiagnoseBookmarksInput {
  /**
   * 有効にする診断種別です。
   */
  readonly checks: BookmarkDiagnosticChecks;
  /**
   * Bookmark Tree取得portです。
   */
  readonly repository: BookmarkRepositoryPort;
}

/**
 * Bookmark診断成功値です。
 */
export interface DiagnoseBookmarksValue {
  /**
   * 診断issue一覧です。
   */
  readonly issues: readonly BookmarkDiagnosticIssue[];
}

/**
 * 成功結果を作ります。
 * @param {TValue} value 成功時の値です。
 * @returns {BookmarkCommandSuccess<TValue>} 成功結果です。
 */
const createSuccess = <TValue>(value: TValue): BookmarkCommandSuccess<TValue> => ({
  ok: true,
  value,
});

/**
 * Bookmark Treeを診断します。
 * @param {DiagnoseBookmarksInput} input Bookmark診断入力です。
 * @returns {Promise<BookmarkCommandResult<DiagnoseBookmarksValue>>} Bookmark診断結果です。
 * @example
 * ```ts
 * const result = await diagnoseBookmarks({ checks, repository });
 * ```
 */
export const diagnoseBookmarks = async (
  input: DiagnoseBookmarksInput,
): Promise<BookmarkCommandResult<DiagnoseBookmarksValue>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const issues = findBookmarkDiagnostics({
    bookmarkTree,
    checks: input.checks,
  });

  return createSuccess({ issues });
};
