import {
  type BrowserHistoryEntry,
  type RawBrowserHistoryItem,
  normalizeBrowserHistoryItems,
} from "../../domain/history/browser-history";
import type {
  BrowserHistoryRepositoryPort,
  BrowserHistorySearchInput,
} from "../../application/bookmarks/bookmark-use-cases";

/**
 * Chrome History APIの検索query。
 * @see https://developer.chrome.com/docs/extensions/reference/api/history#method-search
 */
export interface ChromeHistorySearchQuery {
  /** 検索件数上限。 */
  readonly maxResults?: number;
  /** 検索開始日時。epoch milliseconds。 */
  readonly startTime?: number;
  /** 検索文字列。 */
  readonly text: string;
}

/**
 * Chrome History APIのうちadapterが使う最小shape。
 * @see https://developer.chrome.com/docs/extensions/reference/api/history
 */
export interface ChromeHistoryApi {
  /** Chrome履歴を検索。 */
  readonly search: (query: ChromeHistorySearchQuery) => Promise<readonly RawBrowserHistoryItem[]>;
}

/** Chrome履歴検索の開始日時。省略するとChrome側で直近24時間になるため0を指定。 */
const allTimeHistoryStartTime = 0;

/**
 * Application層の検索入力をChrome History API queryへ変換。
 * @param {BrowserHistorySearchInput} input Chrome履歴検索入力。
 * @returns {ChromeHistorySearchQuery} Chrome History API search query。
 */
const createChromeHistorySearchQuery = (
  input: BrowserHistorySearchInput,
): ChromeHistorySearchQuery => {
  const query = {
    startTime: allTimeHistoryStartTime,
    text: input.query,
  } satisfies ChromeHistorySearchQuery;

  if (typeof input.limit !== "number") {
    return query;
  }

  return {
    ...query,
    maxResults: input.limit,
  };
};

/**
 * Chrome History APIをApplication層のhistory repository portへ変換。
 * @param {ChromeHistoryApi} historyApi Chrome History API。
 * @returns {BrowserHistoryRepositoryPort} Chrome履歴取得port。
 */
export const createChromeHistoryRepository = (
  historyApi: ChromeHistoryApi,
): BrowserHistoryRepositoryPort => {
  /**
   * Chrome History APIで履歴を検索。
   * @param {BrowserHistorySearchInput} input Chrome履歴検索入力。
   * @returns {Promise<readonly BrowserHistoryEntry[]>} 正規化済みChrome履歴entry一覧。
   */
  const searchHistory = async (
    input: BrowserHistorySearchInput,
  ): Promise<readonly BrowserHistoryEntry[]> =>
    normalizeBrowserHistoryItems(await historyApi.search(createChromeHistorySearchQuery(input)));

  return { searchHistory };
};
