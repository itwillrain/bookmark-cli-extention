import type {
  BookmarkCommandResult,
  BookmarkCommandSuccess,
  BrowserHistoryRepositoryPort,
} from "./bookmark-use-cases";
import type { BrowserHistoryEntry } from "../../domain/history/browser-history";

/** Chrome閲覧履歴一覧入力。 */
export interface ListBrowserHistoryInput {
  /** Chrome履歴取得port。 */
  readonly historyRepository?: BrowserHistoryRepositoryPort;
  /** 表示件数。 */
  readonly limit?: number;
  /** Chrome履歴検索query。 */
  readonly query: string;
}

/** Chrome閲覧履歴一覧成功値。 */
export interface ListBrowserHistoryValue {
  /** 表示対象Chrome履歴entry一覧。 */
  readonly entries: readonly BrowserHistoryEntry[];
}

/** Chrome閲覧履歴の初期表示件数。 */
export const defaultBrowserHistoryResultLimit = 25;

/** 空のChrome閲覧履歴entry一覧。 */
const emptyBrowserHistoryEntries = [] as const satisfies readonly BrowserHistoryEntry[];

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
 * Chrome閲覧履歴表示件数を取得。
 * @param {ListBrowserHistoryInput} input Chrome閲覧履歴一覧入力。
 * @returns {number} 表示件数。
 */
const getBrowserHistoryResultLimit = (input: ListBrowserHistoryInput): number =>
  input.limit ?? defaultBrowserHistoryResultLimit;

/**
 * Chrome閲覧履歴を取得。
 * @param {ListBrowserHistoryInput} input Chrome閲覧履歴一覧入力。
 * @returns {Promise<BookmarkCommandResult<ListBrowserHistoryValue>>} Chrome閲覧履歴一覧結果。
 */
export const listBrowserHistory = async (
  input: ListBrowserHistoryInput,
): Promise<BookmarkCommandResult<ListBrowserHistoryValue>> => {
  if (!input.historyRepository) {
    return createSuccess({ entries: emptyBrowserHistoryEntries });
  }

  const entries = await input.historyRepository.searchHistory({
    limit: getBrowserHistoryResultLimit(input),
    query: input.query,
  });

  return createSuccess({ entries });
};
