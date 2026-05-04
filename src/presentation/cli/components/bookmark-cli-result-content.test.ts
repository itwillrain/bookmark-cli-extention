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

/** Result layout属性。 */
const resultLayoutAttribute = 'data-layout="result-text-and-favicon"';

/** Result favicon slot layout属性。 */
const resultFaviconSlotLayoutAttribute = 'data-layout="result-favicon-slot"';

/** Directory title色class token。 */
const directoryTitleClassToken = "text-sky-300";

/** Default title色class token。 */
const defaultTitleClassToken = "text-zinc-100";

/**
 * Result content表示テストスイート。
 */
describe("BookmarkCliResultContent tree layout", (): void => {
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
    const faviconSlotIndex = html.indexOf(resultFaviconSlotLayoutAttribute);

    expect(html).toContain(resultLayoutAttribute);
    expect(faviconSlotIndex).toBeGreaterThan(titleIndex);
  });

  /**
   * Default resultでもiconをtitleの後ろに描画することを検証。
   */
  it("renders default result icon after the title", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliResultContent, {
        item: {
          folderPath: "/Work/Admin",
          kind: "bookmark",
          title: "Stripe Dashboard",
          url: "https://dashboard.stripe.com/",
        },
      }),
    );
    const titleIndex = html.indexOf("Stripe Dashboard");
    const faviconSlotIndex = html.indexOf(resultFaviconSlotLayoutAttribute);

    expect(html).toContain(resultLayoutAttribute);
    expect(faviconSlotIndex).toBeGreaterThan(titleIndex);
  });
});

/**
 * Result content色表示テストスイート。
 */
describe("BookmarkCliResultContent title color", (): void => {
  /**
   * Directory resultだけtitleをdirectory色で描画することを検証。
   */
  it("renders only directory title with directory color", (): void => {
    const folderHtml = renderToStaticMarkup(
      createElement(BookmarkCliResultContent, { item: treeResultItem }),
    );
    const bookmarkHtml = renderToStaticMarkup(
      createElement(BookmarkCliResultContent, { item: treeBookmarkResultItem }),
    );

    expect(folderHtml).toContain(directoryTitleClassToken);
    expect(bookmarkHtml).toContain(defaultTitleClassToken);
    expect(bookmarkHtml).not.toContain(directoryTitleClassToken);
  });
});
