import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import {
  type BookmarkOpenerPort,
  type BookmarkRepositoryPort,
  findBookmarks,
  goBookmark,
} from "./bookmark-use-cases";
import { describe, expect, it } from "vitest";

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
 * 直前結果一覧fixtureです。
 */
const lastResultEntries = [
  workFolderEntry,
  stripeDashboardEntry,
  githubPullRequestsEntry,
] satisfies readonly BookmarkEntry[];

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
