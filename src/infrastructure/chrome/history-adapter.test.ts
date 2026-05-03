import {
  type ChromeHistoryApi,
  type ChromeHistorySearchQuery,
  createChromeHistoryRepository,
} from "./history-adapter";
import { describe, expect, it } from "vitest";

/** History検索query fixture。 */
const historySearchText = "github docs";

/** 先頭履歴entry index。 */
const firstHistoryEntryIndex = 0;

/** Chrome History APIの記録fixture。 */
interface RecordingHistoryApi {
  /** 呼び出された検索query一覧。 */
  readonly searchQueries: readonly ChromeHistorySearchQuery[];
  /** Chrome History API fixture。 */
  readonly historyApi: ChromeHistoryApi;
}

/**
 * Chrome History API fixtureを作る。
 * @returns {RecordingHistoryApi} Chrome History API fixture。
 */
const createRecordingHistoryApi = (): RecordingHistoryApi => {
  const searchQueries: ChromeHistorySearchQuery[] = [];

  /**
   * Chrome履歴検索入力を記録する。
   * @param {ChromeHistorySearchQuery} query Chrome History API search query。
   * @returns {Promise<ReturnType<ChromeHistoryApi["search"]>>} Chrome履歴item一覧。
   */
  const search = async (
    query: ChromeHistorySearchQuery,
  ): Promise<Awaited<ReturnType<ChromeHistoryApi["search"]>>> => {
    searchQueries.push(query);
    await Promise.resolve();

    return [
      {
        id: "history-101",
        lastVisitTime: 1_700_000_000_000,
        title: "GitHub Docs",
        typedCount: 1,
        url: "https://docs.github.com/",
        visitCount: 12,
      },
    ];
  };

  return {
    historyApi: { search },
    searchQueries,
  };
};

/**
 * Chrome History repository adapterのテストスイート。
 */
describe("createChromeHistoryRepository", (): void => {
  /**
   * Chrome History APIを検索して正規化済み履歴entryを返すことを検証。
   */
  it("searches browser history through Chrome History API", async (): Promise<void> => {
    const recordingHistoryApi = createRecordingHistoryApi();
    const repository = createChromeHistoryRepository(recordingHistoryApi.historyApi);
    const entries = await repository.searchHistory({
      limit: 25,
      query: historySearchText,
    });

    expect(recordingHistoryApi.searchQueries).toStrictEqual([
      {
        maxResults: 25,
        startTime: 0,
        text: historySearchText,
      },
    ]);
    expect(entries[firstHistoryEntryIndex]).toMatchObject({
      kind: "history",
      title: "GitHub Docs",
      url: "https://docs.github.com/",
      visitCount: 12,
    });
  });
});
