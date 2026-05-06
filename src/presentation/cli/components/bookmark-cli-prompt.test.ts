import { describe, expect, it } from "vitest";
import { BookmarkCliPrompt } from "./bookmark-cli-prompt";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/** Symbol segmentの背景class。 */
const symbolSegmentBackgroundClass = "inline-flex bg-zinc-900";

/** Powerline separatorの左border色class。 */
const separatorColorClass = "border-l-emerald-500";

/** Prompt symbol text。 */
const promptSymbolMarkup = ">$</span>";

/**
 * Powerline promptのHTMLを描画。
 * @returns {string} Powerline promptのstatic HTML。
 */
const renderPowerlinePromptHtml = (): string =>
  renderToStaticMarkup(
    createElement(BookmarkCliPrompt, {
      preferNerdFont: false,
      promptStyle: "powerline",
    }),
  );

/** Bookmark CLI promptのテストスイート。 */
describe("BookmarkCliPrompt", (): void => {
  /**
   * Symbol segmentの背景をseparator領域にも伸ばすことを検証。
   */
  it("extends the symbol segment background behind the powerline separator", (): void => {
    const html = renderPowerlinePromptHtml();

    expect(html).toContain(symbolSegmentBackgroundClass);
    expect(html.indexOf(symbolSegmentBackgroundClass)).toBeLessThan(
      html.indexOf(separatorColorClass),
    );
    expect(html.indexOf(separatorColorClass)).toBeLessThan(html.indexOf(promptSymbolMarkup));
  });
});
