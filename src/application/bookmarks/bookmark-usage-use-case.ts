import type {
  BookmarkCommandResult,
  BookmarkCommandSuccess,
  BookmarkRepositoryPort,
} from "./bookmark-use-cases";
import {
  defaultUsageResultLimit,
  listFrequentlyOpenedBookmarks,
  listRecentlyOpenedBookmarks,
} from "../../domain/storage/bookmark-usage";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { UsageByBookmarkId } from "../../domain/storage/extension-state";

/** 利用統計Bookmark一覧入力。 */
export interface UsageBookmarksInput {
  /** 表示件数。 */
  readonly limit?: number;
  /** Bookmark Tree取得port。 */
  readonly repository: BookmarkRepositoryPort;
  /** Bookmark IDごとの利用統計。 */
  readonly usageByBookmarkId: UsageByBookmarkId;
}

/** 利用統計Bookmark一覧成功値。 */
export interface UsageBookmarksValue {
  /** 表示対象Bookmark entry一覧。 */
  readonly entries: readonly BookmarkEntry[];
}

/**
 * 成功結果を作成。
 * @param {TValue} value 成功値。
 * @returns {BookmarkCommandSuccess<TValue>} 成功結果。
 */
const createSuccess = <TValue>(value: TValue): BookmarkCommandSuccess<TValue> => ({
  ok: true,
  value,
});

/**
 * 利用統計Bookmark表示件数を取得。
 * @param {UsageBookmarksInput} input 利用統計Bookmark一覧入力。
 * @returns {number} 表示件数。
 */
const getUsageResultLimit = (input: UsageBookmarksInput): number =>
  input.limit ?? defaultUsageResultLimit;

/**
 * 最近開いたBookmarkを取得。
 * @param {UsageBookmarksInput} input 利用統計Bookmark一覧入力。
 * @returns {Promise<BookmarkCommandResult<UsageBookmarksValue>>} 最近開いたBookmark一覧結果。
 */
export const listRecentBookmarks = async (
  input: UsageBookmarksInput,
): Promise<BookmarkCommandResult<UsageBookmarksValue>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const entries = listRecentlyOpenedBookmarks({
    bookmarks: bookmarkTree.bookmarks,
    resultLimit: getUsageResultLimit(input),
    usageByBookmarkId: input.usageByBookmarkId,
  });

  return createSuccess({ entries });
};

/**
 * よく開くBookmarkを取得。
 * @param {UsageBookmarksInput} input 利用統計Bookmark一覧入力。
 * @returns {Promise<BookmarkCommandResult<UsageBookmarksValue>>} よく開くBookmark一覧結果。
 */
export const listFrequentBookmarks = async (
  input: UsageBookmarksInput,
): Promise<BookmarkCommandResult<UsageBookmarksValue>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const entries = listFrequentlyOpenedBookmarks({
    bookmarks: bookmarkTree.bookmarks,
    resultLimit: getUsageResultLimit(input),
    usageByBookmarkId: input.usageByBookmarkId,
  });

  return createSuccess({ entries });
};
