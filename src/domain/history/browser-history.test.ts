import { browserHistoryFolderPath, normalizeBrowserHistoryItems } from "./browser-history";
import { describe, expect, it } from "vitest";

/** URL付きHistory item fixture。 */
const visitedHistoryItem = {
  id: "history-1",
  lastVisitTime: 1_700_000_000_000,
  title: "Stripe Login",
  typedCount: 2,
  url: "https://dashboard.stripe.com/login",
  visitCount: 12,
};

/** URLなしHistory item fixture。 */
const missingUrlHistoryItem = {
  id: "history-2",
  title: "Missing URL",
};

/** TitleなしHistory item fixture。 */
const missingTitleHistoryItem = {
  id: "history-3",
  url: "https://example.com/docs",
};

/**
 * Browser history正規化のテストスイート。
 */
describe("normalizeBrowserHistoryItems", (): void => {
  /**
   * URLを持つHistory itemだけをCLI entryへ正規化することを検証。
   */
  it("normalizes history items with URL", (): void => {
    expect(
      normalizeBrowserHistoryItems([
        visitedHistoryItem,
        missingUrlHistoryItem,
        missingTitleHistoryItem,
      ]),
    ).toStrictEqual([
      {
        childrenCount: 0,
        folderPath: browserHistoryFolderPath,
        id: "history-1",
        kind: "history",
        lastVisitTime: 1_700_000_000_000,
        parentId: "history",
        title: "Stripe Login",
        typedCount: 2,
        url: "https://dashboard.stripe.com/login",
        visitCount: 12,
      },
      {
        childrenCount: 0,
        folderPath: browserHistoryFolderPath,
        id: "history-3",
        kind: "history",
        lastVisitTime: 0,
        parentId: "history",
        title: "https://example.com/docs",
        typedCount: 0,
        url: "https://example.com/docs",
        visitCount: 0,
      },
    ]);
  });
});
