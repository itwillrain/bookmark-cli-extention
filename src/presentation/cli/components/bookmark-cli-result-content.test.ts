import { describe, expect, it } from "vitest";
import { BookmarkCliResultContent } from "./bookmark-cli-result-content";
import type { BookmarkCliResultItem } from "./bookmark-cli-result-list-types";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/** Tree guide表示fixture。 */
const treeGuideText = "├── ";

/** Tree title表示fixture。 */
const treeTitleText = "Tree Node";

/** 文字列が見つからないindex。 */
const missingIndex = -1;

/** Tree result item fixture。 */
const treeResultItem = {
  folderPath: "/Work/Admin",
  kind: "folder",
  title: treeTitleText,
  treePrefix: treeGuideText,
} satisfies BookmarkCliResultItem;

/** URL付きTree result item fixture。 */
const treeBookmarkResultItem = {
  folderPath: "/Work/Admin",
  kind: "bookmark",
  title: treeTitleText,
  treePrefix: treeGuideText,
  url: "https://dashboard.stripe.com/",
} satisfies BookmarkCliResultItem;

/** Tree result layout属性。 */
const treeLayoutAttribute = 'data-layout="result-tree-text-and-favicon"';

/** Tree result favicon slot layout属性。 */
const treeFaviconSlotLayoutAttribute = 'data-layout="result-tree-favicon-slot"';

/**
 * Result content表示テストスイート。
 */
describe("BookmarkCliResultContent", (): void => {
  /**
   * Tree resultではtitleの前にtree guideを描画することを検証。
   */
  it("renders tree guide before the result title", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliResultContent, { item: treeResultItem }),
    );
    const treeGuideIndex = html.indexOf(treeGuideText);

    expect(treeGuideIndex).toBeGreaterThan(missingIndex);
    expect(treeGuideIndex).toBeLessThan(html.indexOf(treeTitleText));
  });

  /**
   * Tree resultではURLがあってもiconをtitleの後ろに描画することを検証。
   */
  it("renders tree result icon after the title", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliResultContent, { item: treeBookmarkResultItem }),
    );
    const titleIndex = html.indexOf(treeTitleText);
    const faviconSlotIndex = html.indexOf(treeFaviconSlotLayoutAttribute);

    expect(html).toContain(treeLayoutAttribute);
    expect(faviconSlotIndex).toBeGreaterThan(titleIndex);
  });
});
