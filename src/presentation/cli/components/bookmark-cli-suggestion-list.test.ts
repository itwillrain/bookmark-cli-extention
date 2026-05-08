import {
  type BookmarkCliSuggestionItem,
  BookmarkCliSuggestionList,
  completeBookmarkCliSuggestionMouseDown,
} from "./bookmark-cli-suggestion-list";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/** 選択中aria属性。 */
const selectedAriaAttribute = 'aria-selected="true"';

/** 選択中suggestion scroll target属性。 */
const selectedScrollTargetAttribute = 'data-scroll-target="selected-suggestion"';

/** 選択中aria属性の出現回数。 */
const selectedAriaAttributeCount = 1;

/** Prompt直下floating layout属性。 */
const floatingBelowPromptLayoutAttribute = 'data-layout="floating-below-prompt"';

/** Listbox role属性。 */
const listboxRoleAttribute = 'role="listbox"';

/** 出現回数計算でsplit結果から引くoffset。 */
const occurrenceSplitOffset = 1;

/** 選択中suggestion index。 */
const selectedSuggestionIndex = 1;

/** Mouse down eventのpreventDefault呼び出し回数。 */
const expectedPreventDefaultCount = 1;

/** Mouse down eventのpreventDefault呼び出し加算値。 */
const preventDefaultCountIncrement = 1;

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
 * Test用noop suggestion click handler。
 * @returns {void} 返り値なし。
 */
const noopSuggestionClick = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-test-suggestion-noop"));
};

/**
 * 指定textの出現回数を数える。
 * @param {string} text 検索対象text。
 * @param {string} token 検索token。
 * @returns {number} token出現回数。
 */
const countOccurrences = (text: string, token: string): number =>
  text.split(token).length - occurrenceSplitOffset;

/**
 * Bookmark CLI suggestion list描画のテストスイート。
 */
describe("BookmarkCliSuggestionList rendering", (): void => {
  /**
   * Suggestionをprompt直下のfloatingとして描画できることを検証。
   */
  it("renders suggestions as a floating layer below the prompt", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliSuggestionList, {
        onSuggestionClick: noopSuggestionClick,
        selectedSuggestionIndex,
        suggestionItems,
      }),
    );

    expect(html).toContain(floatingBelowPromptLayoutAttribute);
    expect(html).toContain(listboxRoleAttribute);
  });

  /**
   * 選択中suggestionをaria-selectedで描画できることを検証。
   */
  it("renders selected suggestion", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliSuggestionList, {
        onSuggestionClick: noopSuggestionClick,
        selectedSuggestionIndex,
        suggestionItems,
      }),
    );

    expect(countOccurrences(html, selectedAriaAttribute)).toBe(selectedAriaAttributeCount);
    expect(countOccurrences(html, selectedScrollTargetAttribute)).toBe(selectedAriaAttributeCount);
  });
});

/**
 * Suggestion mouse down補完のテストスイート。
 */
describe("completeBookmarkCliSuggestionMouseDown", (): void => {
  /**
   * Pointer操作ではbrowser既定動作を止めてsuggestion確定へ委譲することを検証。
   */
  it("completes suggestions from mouse down without browser default behavior", (): void => {
    let preventDefaultCount = 0;
    let clickedSuggestionItem: BookmarkCliSuggestionItem | false = false;
    const [suggestionItem] = suggestionItems;

    if (!suggestionItem) {
      throw new TypeError("Missing suggestion fixture");
    }

    /**
     * Mouse down eventのpreventDefault fixture。
     * @returns {void} 返り値なし。
     */
    const preventDefault = (): void => {
      preventDefaultCount += preventDefaultCountIncrement;
    };

    /**
     * Suggestion click handler fixture。
     * @param {BookmarkCliSuggestionItem} clickedItem 選択されたsuggestion item。
     * @returns {void} 返り値なし。
     */
    const handleSuggestionClick = (clickedItem: BookmarkCliSuggestionItem): void => {
      clickedSuggestionItem = clickedItem;
    };

    completeBookmarkCliSuggestionMouseDown({
      event: {
        preventDefault,
      },
      onSuggestionClick: handleSuggestionClick,
      suggestionItem,
    });

    expect(preventDefaultCount).toBe(expectedPreventDefaultCount);
    expect(clickedSuggestionItem).toBe(suggestionItem);
  });
});
