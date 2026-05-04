import type { BrowserHistoryRepositoryPort, BrowserHistorySearchInput } from "./bookmark-use-cases";
import { describe, expect, it } from "vitest";
import type { BrowserHistoryEntry } from "../../domain/history/browser-history";
import { listBrowserHistory } from "./browser-history-use-case";

/** Chrome履歴Entry fixtureです。 */
const githubDocsHistoryEntry = {
  childrenCount: 0,
  folderPath: "/History",
  id: "history-101",
  kind: "history",
  lastVisitTime: 1_700_000_000_000,
  parentId: "history",
  title: "GitHub Docs",
  typedCount: 1,
  url: "https://docs.github.com/",
  visitCount: 12,
} satisfies BrowserHistoryEntry;

/** 期待する初期履歴表示件数です。 */
const expectedDefaultHistoryLimit = 25;

/** 履歴検索入力を記録するrepository fixtureです。 */
interface RecordingBrowserHistoryRepository {
  /** 記録済み検索入力一覧です。 */
  readonly inputs: readonly BrowserHistorySearchInput[];
  /** Chrome履歴取得portです。 */
  readonly repository: BrowserHistoryRepositoryPort;
}

/**
 * 履歴検索入力を記録するrepository fixtureを作ります。
 * @returns {RecordingBrowserHistoryRepository} 履歴検索入力を記録するrepository fixtureです。
 */
const createRecordingBrowserHistoryRepository = (): RecordingBrowserHistoryRepository => {
  const inputs: BrowserHistorySearchInput[] = [];

  /**
   * Chrome履歴fixtureを返します。
   * @param {BrowserHistorySearchInput} input Chrome履歴検索入力です。
   * @returns {Promise<readonly BrowserHistoryEntry[]>} Chrome履歴fixtureです。
   */
  const searchHistory = async (
    input: BrowserHistorySearchInput,
  ): Promise<readonly BrowserHistoryEntry[]> => {
    inputs.push(input);
    await Promise.resolve();

    return [githubDocsHistoryEntry];
  };

  return {
    inputs,
    repository: { searchHistory },
  };
};

/**
 * Browser history初期一覧use caseのテストスイートです。
 */
describe("listBrowserHistory default list", (): void => {
  /**
   * Query省略時にChrome履歴を初期limitで取得することを検証します。
   */
  it("lists browser history with default limit", async (): Promise<void> => {
    const recordingRepository = createRecordingBrowserHistoryRepository();
    const result = await listBrowserHistory({
      historyRepository: recordingRepository.repository,
      query: "",
    });

    expect(result.ok).toBe(true);
    expect(recordingRepository.inputs).toStrictEqual([
      {
        limit: expectedDefaultHistoryLimit,
        query: "",
      },
    ]);

    if (result.ok) {
      expect(result.value.entries).toStrictEqual([githubDocsHistoryEntry]);
    }
  });
});

/**
 * Browser history検索use caseのテストスイートです。
 */
describe("listBrowserHistory search", (): void => {
  /**
   * QueryとlimitをChrome履歴検索へ渡すことを検証します。
   */
  it("searches browser history with query and limit", async (): Promise<void> => {
    const recordingRepository = createRecordingBrowserHistoryRepository();
    await listBrowserHistory({
      historyRepository: recordingRepository.repository,
      limit: 20,
      query: "github",
    });

    expect(recordingRepository.inputs).toStrictEqual([
      {
        limit: 20,
        query: "github",
      },
    ]);
  });
});

/**
 * Browser history repositoryなしuse caseのテストスイートです。
 */
describe("listBrowserHistory without repository", (): void => {
  /**
   * Chrome履歴repositoryがない場合は空一覧を返すことを検証します。
   */
  it("returns empty entries without a browser history repository", async (): Promise<void> => {
    const result = await listBrowserHistory({
      query: "github",
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.entries).toStrictEqual([]);
    }
  });
});
