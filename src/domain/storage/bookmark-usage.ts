import type { BookmarkUsage, UsageByBookmarkId } from "./extension-state";
import type { BookmarkEntry } from "../bookmarks/bookmark-tree";

/** 初回利用時のopen count。 */
const initialOpenCount = 0;

/** 1回のopenで増やすcount。 */
const openedCountIncrement = 1;

/** 初期表示する利用統計Bookmark件数。 */
export const defaultUsageResultLimit = 10;

/** Result件数の最小値。 */
const minimumResultLimit = 1;

/** Bookmark利用統計とBookmark entryの組。 */
interface BookmarkUsagePair {
  /** Bookmark entry。 */
  readonly entry: BookmarkEntry;
  /** Bookmark利用統計。 */
  readonly usage: BookmarkUsage;
}

/** Bookmark利用統計記録入力。 */
export interface RecordBookmarkOpenedInput {
  /** Bookmark ID。 */
  readonly bookmarkId: string;
  /** 開いた日時ISO文字列。 */
  readonly openedAt: string;
  /** Bookmark IDごとの利用統計。 */
  readonly usageByBookmarkId: UsageByBookmarkId;
}

/** Bookmark利用統計一覧入力。 */
export interface ListUsageBookmarksInput {
  /** Bookmark entry一覧。 */
  readonly bookmarks: readonly BookmarkEntry[];
  /** 表示件数。 */
  readonly resultLimit: number;
  /** Bookmark IDごとの利用統計。 */
  readonly usageByBookmarkId: UsageByBookmarkId;
}

/**
 * Result件数を安全な値へ丸める。
 * @param {number} resultLimit 入力されたresult件数。
 * @returns {number} 丸めたresult件数。
 */
const normalizeResultLimit = (resultLimit: number): number =>
  Math.max(minimumResultLimit, Math.floor(resultLimit));

/**
 * Bookmark利用統計を取得。
 * @param {UsageByBookmarkId} usageByBookmarkId Bookmark IDごとの利用統計。
 * @param {BookmarkEntry} entry Bookmark entry。
 * @returns {BookmarkUsage | false} 利用統計。
 */
const getBookmarkUsage = (
  usageByBookmarkId: UsageByBookmarkId,
  entry: BookmarkEntry,
): BookmarkUsage | false => {
  const usage = usageByBookmarkId[entry.id];

  if (typeof usage !== "object") {
    return false;
  }

  return usage;
};

/**
 * Bookmark entryと利用統計の組を作成。
 * @param {BookmarkEntry} entry Bookmark entry。
 * @param {UsageByBookmarkId} usageByBookmarkId Bookmark IDごとの利用統計。
 * @returns {readonly BookmarkUsagePair[]} 利用統計がある場合だけpairを返す。
 */
const createBookmarkUsagePairs = (
  entry: BookmarkEntry,
  usageByBookmarkId: UsageByBookmarkId,
): readonly BookmarkUsagePair[] => {
  const usage = getBookmarkUsage(usageByBookmarkId, entry);

  if (usage === false) {
    return [];
  }

  return [{ entry, usage }];
};

/**
 * Bookmark利用統計pair一覧を作成。
 * @param {ListUsageBookmarksInput} input Bookmark利用統計一覧入力。
 * @returns {readonly BookmarkUsagePair[]} 利用統計pair一覧。
 */
const listBookmarkUsagePairs = (input: ListUsageBookmarksInput): readonly BookmarkUsagePair[] =>
  input.bookmarks.flatMap((entry) => createBookmarkUsagePairs(entry, input.usageByBookmarkId));

/**
 * 最近開いた順で比較。
 * @param {BookmarkUsagePair} left 左辺。
 * @param {BookmarkUsagePair} right 右辺。
 * @returns {number} sort比較値。
 */
const compareRecentlyOpened = (left: BookmarkUsagePair, right: BookmarkUsagePair): number =>
  right.usage.lastOpenedAt.localeCompare(left.usage.lastOpenedAt);

/**
 * よく開く順で比較。
 * @param {BookmarkUsagePair} left 左辺。
 * @param {BookmarkUsagePair} right 右辺。
 * @returns {number} sort比較値。
 */
const compareFrequentlyOpened = (left: BookmarkUsagePair, right: BookmarkUsagePair): number => {
  if (right.usage.openCount !== left.usage.openCount) {
    return right.usage.openCount - left.usage.openCount;
  }

  return compareRecentlyOpened(left, right);
};

/**
 * 利用統計pairをBookmark entryへ変換。
 * @param {BookmarkUsagePair} pair 利用統計pair。
 * @returns {BookmarkEntry} Bookmark entry。
 */
const selectBookmarkEntry = (pair: BookmarkUsagePair): BookmarkEntry => pair.entry;

/**
 * 現在のopen countを取得。
 * @param {BookmarkUsage | undefined} currentUsage 現在の利用統計。
 * @returns {number} 現在のopen count。
 */
const getOpenCount = (currentUsage: BookmarkUsage | undefined): number => {
  if (typeof currentUsage !== "object") {
    return initialOpenCount;
  }

  return currentUsage.openCount;
};

/**
 * Bookmarkを開いた利用統計を記録。
 * @param {RecordBookmarkOpenedInput} input Bookmark利用統計記録入力。
 * @returns {UsageByBookmarkId} 更新後の利用統計。
 * @example
 * ```ts
 * const result = recordBookmarkOpened({
 *   bookmarkId: "bookmark-1",
 *   openedAt: "2026-05-05T00:00:00.000Z",
 *   usageByBookmarkId: {},
 * });
 * // { "bookmark-1": { openCount: 1, lastOpenedAt: "2026-05-05T00:00:00.000Z" } }
 * ```
 */
export const recordBookmarkOpened = (input: RecordBookmarkOpenedInput): UsageByBookmarkId => {
  const currentUsage = input.usageByBookmarkId[input.bookmarkId];
  const openCount = getOpenCount(currentUsage);

  return {
    ...input.usageByBookmarkId,
    [input.bookmarkId]: {
      lastOpenedAt: input.openedAt,
      openCount: openCount + openedCountIncrement,
    },
  };
};

/**
 * 最近開いたBookmarkを取得。
 * @param {ListUsageBookmarksInput} input Bookmark利用統計一覧入力。
 * @returns {readonly BookmarkEntry[]} 最近開いたBookmark一覧。
 * @example
 * ```ts
 * const result = listRecentlyOpenedBookmarks({
 *   bookmarks,
 *   resultLimit: 5,
 *   usageByBookmarkId,
 * });
 * ```
 */
export const listRecentlyOpenedBookmarks = (
  input: ListUsageBookmarksInput,
): readonly BookmarkEntry[] =>
  listBookmarkUsagePairs(input)
    .toSorted(compareRecentlyOpened)
    .slice(initialOpenCount, normalizeResultLimit(input.resultLimit))
    .map((pair) => selectBookmarkEntry(pair));

/**
 * よく開くBookmarkを取得。
 * @param {ListUsageBookmarksInput} input Bookmark利用統計一覧入力。
 * @returns {readonly BookmarkEntry[]} よく開くBookmark一覧。
 * @example
 * ```ts
 * const result = listFrequentlyOpenedBookmarks({
 *   bookmarks,
 *   resultLimit: 5,
 *   usageByBookmarkId,
 * });
 * ```
 */
export const listFrequentlyOpenedBookmarks = (
  input: ListUsageBookmarksInput,
): readonly BookmarkEntry[] =>
  listBookmarkUsagePairs(input)
    .toSorted(compareFrequentlyOpened)
    .slice(initialOpenCount, normalizeResultLimit(input.resultLimit))
    .map((pair) => selectBookmarkEntry(pair));
