import { type BookmarkSearchResult, searchBookmarks } from "../../domain/search/bookmark-search";
import type { BookmarkTree } from "../../domain/bookmarks/bookmark-tree";

/**
 * Bookmark commandのエラー種別です。
 */
export type BookmarkCommandErrorCode =
  | "already_marked"
  | "folder_not_found"
  | "not_found"
  | "storage_failed"
  | "unsupported_tab";

/**
 * Bookmark commandの成功結果です。
 */
export interface BookmarkCommandSuccess<TValue> {
  /**
   * 成功したことを表します。
   */
  readonly ok: true;
  /**
   * 成功時の値です。
   */
  readonly value: TValue;
}

/**
 * Bookmark commandの失敗結果です。
 */
export interface BookmarkCommandFailure {
  /**
   * 失敗したことを表します。
   */
  readonly ok: false;
  /**
   * エラー種別です。
   */
  readonly errorCode: BookmarkCommandErrorCode;
  /**
   * CLIに表示できるエラーメッセージです。
   */
  readonly message: string;
}

/**
 * Bookmark commandの実行結果です。
 */
export type BookmarkCommandResult<TValue> = BookmarkCommandFailure | BookmarkCommandSuccess<TValue>;

/**
 * Bookmark Treeを取得するportです。
 */
export interface BookmarkRepositoryPort {
  /**
   * 現在のBookmark Treeを取得します。
   */
  readonly getBookmarkTree: () => Promise<BookmarkTree>;
}

/**
 * Bookmark URLを開くportです。
 */
export interface BookmarkOpenerPort {
  /**
   * Bookmark URLを開きます。
   */
  readonly openBookmarkUrl: (url: string) => Promise<void>;
}

/**
 * Bookmark候補検索の入力です。
 */
export interface FindBookmarksInput {
  /**
   * 検索queryです。
   */
  readonly query: string;
  /**
   * Bookmark Tree取得portです。
   */
  readonly repository: BookmarkRepositoryPort;
}

/**
 * Bookmark候補検索の成功値です。
 */
export interface FindBookmarksValue {
  /**
   * 検索結果一覧です。
   */
  readonly results: readonly BookmarkSearchResult[];
}

/**
 * Bookmarkを開く入力です。
 */
export interface GoBookmarkInput {
  /**
   * Bookmark URLを開くportです。
   */
  readonly opener: BookmarkOpenerPort;
  /**
   * 検索queryです。
   */
  readonly query: string;
  /**
   * Bookmark Tree取得portです。
   */
  readonly repository: BookmarkRepositoryPort;
}

/**
 * 空の検索結果件数です。
 */
const emptySearchResultCount = 0;

/**
 * 候補なしのエラーcodeです。
 */
const notFoundErrorCode = "not_found";

/**
 * Bookmark検索結果が1件以上ある配列です。
 */
type NonEmptyBookmarkSearchResults = readonly [BookmarkSearchResult, ...BookmarkSearchResult[]];

/**
 * Bookmark検索結果のreadonly listです。
 */
type BookmarkSearchResultList = readonly BookmarkSearchResult[];

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
 * 候補なしの失敗結果を作ります。
 * @param {string} query 候補を探したqueryです。
 * @returns {BookmarkCommandFailure} 候補なしの失敗結果です。
 */
const createNotFoundFailure = (query: string): BookmarkCommandFailure => ({
  errorCode: notFoundErrorCode,
  message: `Bookmark candidate was not found: ${query}`,
  ok: false,
});

/**
 * Bookmark検索結果が1件以上あるかを判定します。
 * @param {BookmarkSearchResultList} results Bookmark検索結果です。
 * @returns {boolean} 1件以上あればtrueです。
 */
const hasSearchResults = (
  results: BookmarkSearchResultList,
): results is NonEmptyBookmarkSearchResults => results.length > emptySearchResultCount;

/**
 * RepositoryからBookmark Treeを取得して検索します。
 * @param {FindBookmarksInput} input Bookmark候補検索の入力です。
 * @returns {Promise<BookmarkCommandResult<FindBookmarksValue>>} Bookmark候補検索の結果です。
 */
export const findBookmarks = async (
  input: FindBookmarksInput,
): Promise<BookmarkCommandResult<FindBookmarksValue>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const results = searchBookmarks(bookmarkTree.entries, input.query);

  return createSuccess({ results });
};

/**
 * 最上位のBookmark候補を開きます。
 * @param {GoBookmarkInput} input Bookmarkを開く入力です。
 * @returns {Promise<BookmarkCommandResult<BookmarkSearchResult>>} Bookmarkを開いた結果です。
 */
export const goBookmark = async (
  input: GoBookmarkInput,
): Promise<BookmarkCommandResult<BookmarkSearchResult>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const results = searchBookmarks(bookmarkTree.entries, input.query);

  if (!hasSearchResults(results)) {
    return createNotFoundFailure(input.query);
  }

  const [topResult] = results;
  await input.opener.openBookmarkUrl(topResult.entry.url);

  return createSuccess(topResult);
};
