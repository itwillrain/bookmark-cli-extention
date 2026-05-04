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
});
