/* oxlint-disable max-lines, max-lines-per-function -- Bookmark検索use caseのfixtureを共有して履歴統合を検証するため。 */

import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import {
  type BookmarkOpenerPort,
  type BookmarkRepositoryPort,
  type BrowserHistoryRepositoryPort,
  findBookmarks,
  goBookmark,
} from "./bookmark-use-cases";
import { describe, expect, it } from "vitest";
import type { BrowserHistoryEntry } from "../../domain/history/browser-history";

/**
 * Work folderのBookmark Entryです。
 */
const workFolderEntry = {
  childrenCount: 1,
  folderPath: "/Work",
  id: "10",
  kind: "folder",
  parentId: "1",
  title: "Work",
} satisfies BookmarkEntry;

/**
 * Stripe DashboardのBookmark Entryです。
 */
const stripeDashboardEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "42",
  kind: "bookmark",
  parentId: "11",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/**
 * GitHub Pull RequestsのBookmark Entryです。
 */
const githubPullRequestsEntry = {
  childrenCount: 0,
  folderPath: "/Work/GitHub",
  id: "43",
  kind: "bookmark",
  parentId: "10",
  title: "GitHub Pull Requests",
  url: "https://github.com/pulls",
} satisfies BookmarkEntry;

/**
 * GitHub DocsのChrome履歴Entryです。
 */
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

/**
 * 直前結果一覧fixtureです。
 */
const lastResultEntries = [
  workFolderEntry,
  stripeDashboardEntry,
  githubPullRequestsEntry,
] satisfies readonly BookmarkEntry[];

/**
 * Chrome履歴を含む直前結果一覧fixtureです。
 */
const lastResultEntriesWithHistory = [workFolderEntry, githubDocsHistoryEntry] satisfies readonly (
  | BookmarkEntry
  | BrowserHistoryEntry
)[];

/**
 * 検索に使うBookmark Treeです。
 */
const bookmarkTree = {
  bookmarks: [stripeDashboardEntry, githubPullRequestsEntry],
  entries: [workFolderEntry, stripeDashboardEntry, githubPullRequestsEntry],
  folders: [workFolderEntry],
} satisfies BookmarkTree;

/**
 * 先頭検索結果のindexです。
 */
const firstSearchResultIndex = 0;

/**
 * 期待する検索結果件数です。
 */
const expectedSearchResultCount = 1;

/**
 * Bookmark ID別仮想タグfixtureです。
 */
const virtualTagsByBookmarkId = {
  "42": ["prod", "finance"],
  "43": ["dev"],
};

/**
 * URLを記録するBookmark Openerのfixtureです。
 */
interface RecordingBookmarkOpener {
  /**
   * 開いたURL一覧です。
   */
  readonly openedUrls: readonly string[];
  /**
   * Bookmark URLを開くportです。
   */
  readonly opener: BookmarkOpenerPort;
}

/**
 * Bookmark Tree fixtureを非同期で返します。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixtureです。
 */
const getBookmarkTreeFixture = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/**
 * Bookmark Treeを返すrepository fixtureです。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得portです。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  getBookmarkTree: getBookmarkTreeFixture,
});

/**
 * Chrome履歴を返すrepository fixtureです。
 * @returns {BrowserHistoryRepositoryPort} Chrome履歴取得portです。
 */
const createBrowserHistoryRepository = (): BrowserHistoryRepositoryPort => ({
  /**
   * Chrome履歴fixtureを返します。
   * @returns {Promise<readonly BrowserHistoryEntry[]>} Chrome履歴fixtureです。
   */
  searchHistory: async (): Promise<readonly BrowserHistoryEntry[]> => {
    await Promise.resolve();

    return [githubDocsHistoryEntry];
  },
});

/**
 * 開いたURLを記録するopener fixtureを作ります。
 * @returns {RecordingBookmarkOpener} URLを記録するopener fixtureです。
 */
const createRecordingBookmarkOpener = (): RecordingBookmarkOpener => {
  const openedUrls: string[] = [];

  /**
   * 開いたURLを記録します。
   * @param {string} url 開くURLです。
   * @returns {Promise<void>} 記録完了を表すPromiseです。
   */
  const openBookmarkUrl = async (url: string): Promise<void> => {
    openedUrls.push(url);
    await Promise.resolve();
  };

  return {
    openedUrls,
    opener: { openBookmarkUrl },
  };
};

/**
 * Bookmark候補検索use caseのテストスイートです。
 */
describe("findBookmarks", (): void => {
  /**
   * Queryに一致するBookmark候補を返すことを検証します。
   */
  it("finds bookmark candidates from repository tree", async (): Promise<void> => {
    const result = await findBookmarks({
      query: "Admin",
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.results).toHaveLength(expectedSearchResultCount);
      expect(result.value.results[firstSearchResultIndex]?.entry.id).toBe("42");
    }
  });

  /**
   * #tagに一致するBookmarkだけを返すことを検証します。
   */
  it("finds bookmark candidates by virtual tag", async (): Promise<void> => {
    const result = await findBookmarks({
      query: "#prod",
      repository: createBookmarkRepository(),
      virtualTagsByBookmarkId,
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.results).toHaveLength(expectedSearchResultCount);
      expect(result.value.results[firstSearchResultIndex]?.entry.id).toBe("42");
    }
  });

  /**
   * Chrome履歴候補も検索結果へ含めることを検証します。
   */
  it("finds browser history candidates", async (): Promise<void> => {
    const result = await findBookmarks({
      historyRepository: createBrowserHistoryRepository(),
      query: "docs",
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.value.results.map((searchResult) => searchResult.entry.kind)).toContain(
        "history",
      );
      expect(result.value.results.map((searchResult) => searchResult.entry.url)).toContain(
        "https://docs.github.com/",
      );
    }
  });
});

/**
 * Bookmarkを開く成功use caseのテストスイートです。
 */
describe("goBookmark with candidate", (): void => {
  /**
   * 最上位候補のURLを開くことを検証します。
   */
  it("opens the top bookmark candidate", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const result = await goBookmark({
      opener: recordingOpener.opener,
      query: "Stripe",
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);
    expect(recordingOpener.openedUrls).toStrictEqual(["https://dashboard.stripe.com/"]);

    if (result.ok) {
      expect(result.value.entry.id).toBe("42");
    }
  });

  /**
   * #tagとqueryに一致する最上位候補を開くことを検証します。
   */
  it("opens the top bookmark candidate by virtual tag and query", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const result = await goBookmark({
      opener: recordingOpener.opener,
      query: "#prod stripe",
      repository: createBookmarkRepository(),
      virtualTagsByBookmarkId,
    });

    expect(result.ok).toBe(true);
    expect(recordingOpener.openedUrls).toStrictEqual(["https://dashboard.stripe.com/"]);

    if (result.ok) {
      expect(result.value.entry.id).toBe("42");
    }
  });

  /**
   * Chrome履歴候補を開けることを検証します。
   */
  it("opens the top browser history candidate", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const result = await goBookmark({
      historyRepository: createBrowserHistoryRepository(),
      opener: recordingOpener.opener,
      query: "docs",
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);
    expect(recordingOpener.openedUrls).toStrictEqual(["https://docs.github.com/"]);

    if (result.ok) {
      expect(result.value.entry.kind).toBe("history");
    }
  });
});

/**
 * 直前結果番号でBookmarkを開くuse caseのテストスイートです。
 */
describe("goBookmark by result number", (): void => {
  /**
   * 直前結果番号で指定したBookmarkのURLを開くことを検証します。
   */
  it("opens bookmark selected by result number", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const result = await goBookmark({
      lastResultEntries,
      opener: recordingOpener.opener,
      query: "3",
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);
    expect(recordingOpener.openedUrls).toStrictEqual(["https://github.com/pulls"]);

    if (result.ok) {
      expect(result.value.entry.id).toBe("43");
    }
  });

  /**
   * 直前結果番号で指定したChrome履歴URLを開くことを検証します。
   */
  it("opens history selected by result number", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const result = await goBookmark({
      lastResultEntries: lastResultEntriesWithHistory,
      opener: recordingOpener.opener,
      query: "2",
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(true);
    expect(recordingOpener.openedUrls).toStrictEqual(["https://docs.github.com/"]);

    if (result.ok) {
      expect(result.value.entry.kind).toBe("history");
    }
  });
});

/**
 * Bookmarkを開く失敗use caseのテストスイートです。
 */
describe("goBookmark without candidate", (): void => {
  /**
   * 候補がない場合はURLを開かずnot_foundを返すことを検証します。
   */
  it("returns not_found without opening a URL when no candidate exists", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const result = await goBookmark({
      opener: recordingOpener.opener,
      query: "missing",
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(false);
    expect(recordingOpener.openedUrls).toStrictEqual([]);

    if (!result.ok) {
      expect(result.errorCode).toBe("not_found");
    }
  });

  /**
   * 直前結果番号がfolderを指す場合はURLを開かずnot_foundを返すことを検証します。
   */
  it("returns not_found when result number points to folder", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const result = await goBookmark({
      lastResultEntries,
      opener: recordingOpener.opener,
      query: "1",
      repository: createBookmarkRepository(),
    });

    expect(result.ok).toBe(false);
    expect(recordingOpener.openedUrls).toStrictEqual([]);

    if (!result.ok) {
      expect(result.errorCode).toBe("not_found");
    }
  });
});
