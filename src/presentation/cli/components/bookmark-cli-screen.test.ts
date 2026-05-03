import { BookmarkCliScreen, type BookmarkCliScreenProps } from "./bookmark-cli-screen";
import { describe, expect, it } from "vitest";
import { completionCursorCleared } from "../../../domain/cli/completion-cursor";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { resultCursorCleared } from "../../../domain/bookmarks/result-cursor";

/** Legacy Powerline separator glyph。 */
const legacyPowerlineSeparatorGlyph = "\uE0B0";

/** Prompt aria-label属性。 */
const promptAriaLabelAttribute = 'aria-label="bookmark-cli $"';

/** Powerline prompt数。 */
const expectedPowerlinePromptCount = 2;

/** 出現回数計算でsplit結果から引くoffset。 */
const occurrenceSplitOffset = 1;

/** 入力値fixture。 */
const inputValue = "find stripe";

/** Status text fixture。 */
const statusText = "1 candidate";

/** 検索結果fixture。 */
const resultItems = [
  {
    folderPath: "/Work/Admin",
    kind: "bookmark",
    score: 0.98,
    title: "Stripe Dashboard",
    url: "https://dashboard.stripe.com/",
  },
] satisfies BookmarkCliScreenProps["transcriptEntries"][number]["resultItems"];

/**
 * Test用の入力変更callback。
 * @param {string} value 入力値。
 * @returns {void} 返り値なし。
 */
const handleInputChange = (value: string): void => {
  globalThis.dispatchEvent(new CustomEvent("bookmark-cli-test-input", { detail: value }));
};

/**
 * Test用のkey操作callback。
 * @returns {void} 返り値なし。
 */
const handleInputKeyDown = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-keydown"));
};

/**
 * Test用のsubmit callback。
 * @returns {void} 返り値なし。
 */
const handleSubmit = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-submit"));
};

/** Bookmark CLI screen props fixture。 */
const baseProps = {
  inputValue,
  onInputChange: handleInputChange,
  onInputKeyDown: handleInputKeyDown,
  onSubmit: handleSubmit,
  preferNerdFont: false,
  promptStyle: "powerline",
  selectedResultIndex: resultCursorCleared,
  selectedSuggestionIndex: completionCursorCleared,
  statusText,
  suggestionItems: [],
  transcriptEntries: [
    {
      id: "entry-1",
      inputValue,
      resultItems,
      statusText,
    },
  ],
} satisfies BookmarkCliScreenProps;

/**
 * 指定textの出現回数を数えます。
 * @param {string} text 検索対象text。
 * @param {string} token 検索token。
 * @returns {number} token出現回数。
 */
const countOccurrences = (text: string, token: string): number =>
  text.split(token).length - occurrenceSplitOffset;

/**
 * Bookmark CLI screenのprompt表示テストスイート。
 */
describe("BookmarkCliScreen prompt", (): void => {
  /**
   * Powerline promptをCSS shapeで表示することを検証。
   */
  it("renders powerline prompts without font-dependent glyphs", (): void => {
    const html = renderToStaticMarkup(createElement(BookmarkCliScreen, baseProps));

    expect(countOccurrences(html, promptAriaLabelAttribute)).toBe(expectedPowerlinePromptCount);
    expect(html).not.toContain(legacyPowerlineSeparatorGlyph);
  });

  /**
   * Plain promptではPowerline prompt用のaria-labelを表示しないことを検証。
   */
  it("renders plain prompt without powerline prompt aria-labels", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliScreen, { ...baseProps, promptStyle: "plain" }),
    );

    expect(html).not.toContain(promptAriaLabelAttribute);
  });
});
