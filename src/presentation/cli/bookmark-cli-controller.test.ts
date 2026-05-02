import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import type {
  BookmarkOpenerPort,
  BookmarkRepositoryPort,
} from "../../application/bookmarks/bookmark-use-cases";
import { describe, expect, it } from "vitest";
import { executeBookmarkCliCommand } from "./bookmark-cli-controller";

/**
 * Stripe DashboardのBookmark Entryです。
 */
const stripeDashboardEntry = {
  childrenCount: 0,
  folderPath: "/Work/Admin",
  id: "42",
  kind: "bookmark",
  parentId: "10",
  title: "Stripe Dashboard",
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkEntry;

/**
 * Controller testで使うBookmark Treeです。
 */
const bookmarkTree = {
  bookmarks: [stripeDashboardEntry],
  entries: [stripeDashboardEntry],
  folders: [],
} satisfies BookmarkTree;

/**
 * Find commandの入力です。
 */
const findInput = "find stripe";

/**
 * Go commandの入力です。
 */
const goInput = "go stripe";

/**
 * 未対応commandの入力です。
 */
const unknownInput = "open stripe";

/**
 * 先頭result itemのindexです。
 */
const firstResultItemIndex = 0;

/**
 * URL記録opener fixtureです。
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
 * Bookmark Tree fixtureを返します。
 * @returns {Promise<BookmarkTree>} Bookmark Tree fixtureです。
 */
const getBookmarkTreeFixture = async (): Promise<BookmarkTree> => {
  await Promise.resolve();

  return bookmarkTree;
};

/**
 * Bookmark Treeを返すrepository fixtureを作ります。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得portです。
 */
const createBookmarkRepository = (): BookmarkRepositoryPort => ({
  getBookmarkTree: getBookmarkTreeFixture,
});

/**
 * URLを記録するopener fixtureを作ります。
 * @returns {RecordingBookmarkOpener} URL記録opener fixtureです。
 */
const createRecordingBookmarkOpener = (): RecordingBookmarkOpener => {
  const openedUrls: string[] = [];

  /**
   * 開いたURLを記録します。
   * @param {string} url 開いたURLです。
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
 * Bookmark CLI controllerのテストスイートです。
 */
describe("executeBookmarkCliCommand", (): void => {
  /**
   * Find commandから表示状態を作れることを検証します。
   */
  it("returns result items for find command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(findInput, {
      opener: createRecordingBookmarkOpener().opener,
      repository: createBookmarkRepository(),
    });

    expect(state.statusText).toBe("1 candidates");
    expect(state.resultItems[firstResultItemIndex]).toMatchObject({
      folderPath: "/Work/Admin",
      kind: "bookmark",
      title: "Stripe Dashboard",
      url: "https://dashboard.stripe.com/",
    });
    expect(typeof state.resultItems[firstResultItemIndex]?.score).toBe("number");
  });

  /**
   * Go commandで最上位候補を開けることを検証します。
   */
  it("opens top candidate for go command", async (): Promise<void> => {
    const recordingOpener = createRecordingBookmarkOpener();
    const state = await executeBookmarkCliCommand(goInput, {
      opener: recordingOpener.opener,
      repository: createBookmarkRepository(),
    });

    expect(recordingOpener.openedUrls).toStrictEqual(["https://dashboard.stripe.com/"]);
    expect(state.statusText).toBe("Opened Stripe Dashboard");
  });

  /**
   * 未対応commandをstatusへ変換できることを検証します。
   */
  it("returns status for unknown command", async (): Promise<void> => {
    const state = await executeBookmarkCliCommand(unknownInput, {
      opener: createRecordingBookmarkOpener().opener,
      repository: createBookmarkRepository(),
    });

    expect(state).toStrictEqual({
      resultItems: [],
      statusText: "Unknown command: open",
    });
  });
});
