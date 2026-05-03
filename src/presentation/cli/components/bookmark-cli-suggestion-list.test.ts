import {
  type BookmarkCliSuggestionItem,
  BookmarkCliSuggestionList,
} from "./bookmark-cli-suggestion-list";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/** 選択中aria属性。 */
const selectedAriaAttribute = 'aria-selected="true"';

/** 選択中aria属性の出現回数。 */
const selectedAriaAttributeCount = 1;

/** Floating layout属性。 */
const floatingLayoutAttribute = 'data-layout="floating"';

/** Listbox role属性。 */
const listboxRoleAttribute = 'role="listbox"';

/** 出現回数計算でsplit結果から引くoffset。 */
const occurrenceSplitOffset = 1;

/** 選択中suggestion index。 */
const selectedSuggestionIndex = 1;

/** Suggestion fixture一覧。 */
const suggestionItems = [
  {
    commandName: "find",
    completion: "find ",
    description: "Bookmarkを検索",
  },
  {
    commandName: "freq",
    completion: "freq ",
    description: "よく開くBookmarkを表示",
  },
] satisfies readonly BookmarkCliSuggestionItem[];

/**
 * 指定textの出現回数を数える。
 * @param {string} text 検索対象text。
 * @param {string} token 検索token。
 * @returns {number} token出現回数。
 */
const countOccurrences = (text: string, token: string): number =>
  text.split(token).length - occurrenceSplitOffset;

/**
 * Bookmark CLI suggestion listのテストスイート。
 */
describe("BookmarkCliSuggestionList", (): void => {
  /**
   * Suggestionをfloating popoverとして描画できることを検証。
   */
  it("renders suggestions as a floating popover", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliSuggestionList, {
        selectedSuggestionIndex,
        suggestionItems,
      }),
    );

    expect(html).toContain(floatingLayoutAttribute);
    expect(html).toContain(listboxRoleAttribute);
  });

  /**
   * 選択中suggestionをaria-selectedで描画できることを検証。
   */
  it("renders selected suggestion", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliSuggestionList, {
        selectedSuggestionIndex,
        suggestionItems,
      }),
    );

    expect(countOccurrences(html, selectedAriaAttribute)).toBe(selectedAriaAttributeCount);
  });
});
