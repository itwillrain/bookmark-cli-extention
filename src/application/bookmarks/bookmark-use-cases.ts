/* oxlint-disable max-lines -- Bookmark検索とChrome履歴検索のApplication境界を同じuse caseに集約するため。 */

import {
  type BookmarkSearchResult,
  createBookmarkSearchResultsFromEntries,
  mergeBookmarkSearchResultsWithHistory,
  searchBookmarks,
} from "../../domain/search/bookmark-search";
import {
  filterEntriesByVirtualTags,
  hasVirtualTagFilters,
  normalizeVirtualTagsByBookmarkId,
  parseVirtualTagSearchQuery,
} from "../../domain/tags/virtual-tag";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import type { BrowserHistoryEntry } from "../../domain/history/browser-history";
import type { VirtualTagsByBookmarkId } from "../../domain/storage/extension-state";
import { isResultNumberInput } from "../../domain/bookmarks/result-selection";
import { resolveBookmarkSearchResultByResultNumber } from "./go-bookmark-result-number";

/**
 * Bookmark commandのエラー種別です。
 */
export type BookmarkCommandErrorCode =
  | "already_marked"
  | "confirmation_required"
  | "folder_not_found"
  | "invalid_tag"
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
 * Chrome履歴検索の入力です。
 */
export interface BrowserHistorySearchInput {
  /**
   * 検索件数上限です。
   */
  readonly limit?: number;
  /**
   * 検索queryです。
   */
  readonly query: string;
}

/**
 * Chrome履歴を取得するportです。
 */
export interface BrowserHistoryRepositoryPort {
  /**
   * Chrome履歴を検索します。
   */
  readonly searchHistory: (
    input: BrowserHistorySearchInput,
  ) => Promise<readonly BrowserHistoryEntry[]>;
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
   * Chrome履歴取得portです。
   */
  readonly historyRepository?: BrowserHistoryRepositoryPort;
  /**
   * 検索queryです。
   */
  readonly query: string;
  /**
   * Bookmark Tree取得portです。
   */
  readonly repository: BookmarkRepositoryPort;
  /**
   * Bookmark IDごとの仮想タグ一覧です。
   */
  readonly virtualTagsByBookmarkId?: VirtualTagsByBookmarkId;
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
   * Chrome履歴取得portです。
   */
  readonly historyRepository?: BrowserHistoryRepositoryPort;
  /**
   * 直前結果一覧です。
   */
  readonly lastResultEntries?: readonly BookmarkCliEntry[];
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
  /**
   * Bookmark IDごとの仮想タグ一覧です。
   */
  readonly virtualTagsByBookmarkId?: VirtualTagsByBookmarkId;
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

/** 仮想タグ対応検索入力です。 */
interface SearchBookmarksWithVirtualTagsInput {
  /** Bookmark Treeです。 */
  readonly bookmarkTree: BookmarkTree;
  /** Chrome履歴entry一覧です。 */
  readonly historyEntries: readonly BrowserHistoryEntry[];
  /** 検索queryです。 */
  readonly query: string;
  /** Bookmark ID別仮想タグです。 */
  readonly virtualTagsByBookmarkId: VirtualTagsByBookmarkId | undefined;
}

/** 空文字です。 */
const emptyQuery = "";

/**
 * 直前結果一覧の初期値です。
 */
const emptyLastResultEntries: readonly BookmarkCliEntry[] = [];

/** Chrome履歴検索の初期件数上限です。 */
const defaultHistorySearchLimit = 25;

/** 空のChrome履歴候補一覧です。 */
const emptyHistoryEntries = [] as const satisfies readonly BrowserHistoryEntry[];

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
 * 仮想タグ条件を含む検索を実行します。
 * @param {SearchBookmarksWithVirtualTagsInput} input 仮想タグ対応検索入力です。
 * @returns {readonly BookmarkSearchResult[]} 検索結果一覧です。
 */
const searchBookmarksWithVirtualTags = (
  input: SearchBookmarksWithVirtualTagsInput,
): readonly BookmarkSearchResult[] => {
  const tagSearchQuery = parseVirtualTagSearchQuery(input.query);

  if (!hasVirtualTagFilters(tagSearchQuery)) {
    return mergeBookmarkSearchResultsWithHistory({
      bookmarkResults: searchBookmarks(input.bookmarkTree.entries, input.query),
      historyEntries: input.historyEntries,
    });
  }

  const taggedEntries = filterEntriesByVirtualTags(
    input.bookmarkTree.entries,
    normalizeVirtualTagsByBookmarkId(input.virtualTagsByBookmarkId),
    tagSearchQuery.tags,
  );

  if (tagSearchQuery.textQuery === emptyQuery) {
    return createBookmarkSearchResultsFromEntries(taggedEntries);
  }

  return searchBookmarks(taggedEntries, tagSearchQuery.textQuery);
};

/**
 * Chrome履歴を検索します。
 * @param {FindBookmarksInput | GoBookmarkInput} input 検索入力です。
 * @returns {Promise<readonly BrowserHistoryEntry[]>} Chrome履歴候補一覧です。
 */
const searchBrowserHistory = async (
  input: FindBookmarksInput | GoBookmarkInput,
): Promise<readonly BrowserHistoryEntry[]> => {
  if (!input.historyRepository) {
    return emptyHistoryEntries;
  }

  const tagSearchQuery = parseVirtualTagSearchQuery(input.query);

  if (hasVirtualTagFilters(tagSearchQuery) || tagSearchQuery.textQuery === emptyQuery) {
    return emptyHistoryEntries;
  }

  const historyEntries = await input.historyRepository.searchHistory({
    limit: defaultHistorySearchLimit,
    query: tagSearchQuery.textQuery,
  });

  return historyEntries;
};

/**
 * 直前結果番号からBookmarkを開きます。
 * @param {GoBookmarkInput} input Bookmarkを開く入力です。
 * @returns {Promise<BookmarkCommandResult<BookmarkSearchResult>>} Bookmarkを開いた結果です。
 */
const goBookmarkByResultNumber = async (
  input: GoBookmarkInput,
): Promise<BookmarkCommandResult<BookmarkSearchResult>> => {
  const result = resolveBookmarkSearchResultByResultNumber({
    lastResultEntries: input.lastResultEntries ?? emptyLastResultEntries,
    query: input.query,
  });

  if (result === false) {
    return createNotFoundFailure(input.query);
  }

  await input.opener.openBookmarkUrl(result.entry.url);

  return createSuccess(result);
};

/**
 * RepositoryからBookmark Treeを取得して検索します。
 * @param {FindBookmarksInput} input Bookmark候補検索の入力です。
 * @returns {Promise<BookmarkCommandResult<FindBookmarksValue>>} Bookmark候補検索の結果です。
 */
export const findBookmarks = async (
  input: FindBookmarksInput,
): Promise<BookmarkCommandResult<FindBookmarksValue>> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const historyEntries = await searchBrowserHistory(input);
  const results = searchBookmarksWithVirtualTags({
    bookmarkTree,
    historyEntries,
    query: input.query,
    virtualTagsByBookmarkId: input.virtualTagsByBookmarkId,
  });

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
  if (isResultNumberInput(input.query)) {
    return goBookmarkByResultNumber(input);
  }

  const bookmarkTree = await input.repository.getBookmarkTree();
  const historyEntries = await searchBrowserHistory(input);
  const results = searchBookmarksWithVirtualTags({
    bookmarkTree,
    historyEntries,
    query: input.query,
    virtualTagsByBookmarkId: input.virtualTagsByBookmarkId,
  });

  if (!hasSearchResults(results)) {
    return createNotFoundFailure(input.query);
  }

  const [topResult] = results;
  await input.opener.openBookmarkUrl(topResult.entry.url);

  return createSuccess(topResult);
};
