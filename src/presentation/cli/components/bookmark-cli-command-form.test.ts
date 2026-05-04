import { createElement, createRef } from "react";
import { describe, expect, it } from "vitest";
import { CommandForm } from "./bookmark-cli-command-form";
import { renderToStaticMarkup } from "react-dom/server";

/** Native autocomplete無効化属性。 */
const autocompleteDisabledAttribute = 'autocomplete="off"';

/** Native autocapitalize無効化属性。 */
const autocapitalizeDisabledAttribute = 'autocapitalize="off"';

/** Native autocorrect無効化属性。 */
const autocorrectDisabledAttribute = 'autocorrect="off"';

/** Native autocomplete無効化属性数。 */
const expectedAutocompleteDisabledAttributeCount = 2;

/** 出現回数計算でsplit結果から引くoffset。 */
const occurrenceSplitOffset = 1;

/**
 * Test用の入力変更callback。
 * @returns {void} 返り値なし。
 */
const handleInputChange = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-command-form-test-input"));
};

/**
 * Test用のkey操作callback。
 * @returns {void} 返り値なし。
 */
const handleInputKeyDown = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-command-form-test-keydown"));
};

/**
 * Test用のsubmit callback。
 * @returns {void} 返り値なし。
 */
const handleSubmit = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-command-form-test-submit"));
};

/**
 * 指定textの出現回数を数えます。
 * @param {string} text 検索対象text。
 * @param {string} token 検索token。
 * @returns {number} token出現回数。
 */
const countOccurrences = (text: string, token: string): number =>
  text.split(token).length - occurrenceSplitOffset;

/** Command formのテストスイートです。 */
describe("CommandForm", (): void => {
  /**
   * Firefoxなどのnative form補完を出さない属性を描画することを検証。
   */
  it("disables native browser form assistance on the command input", (): void => {
    const html = renderToStaticMarkup(
      createElement(CommandForm, {
        commandInputRef: createRef<HTMLInputElement>(),
        inputValue: "l",
        onInputChange: handleInputChange,
        onInputKeyDown: handleInputKeyDown,
        onSubmit: handleSubmit,
        preferNerdFont: false,
        promptStyle: "powerline",
      }),
    ).toLowerCase();

    expect(countOccurrences(html, autocompleteDisabledAttribute)).toBe(
      expectedAutocompleteDisabledAttributeCount,
    );
    expect(html).toContain(autocapitalizeDisabledAttribute);
    expect(html).toContain(autocorrectDisabledAttribute);
  });
});
