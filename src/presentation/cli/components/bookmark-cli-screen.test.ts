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

/** Command input aria-label属性。 */
const commandInputAriaLabelAttribute = 'aria-label="Bookmark CLI command"';

/** Active command anchor layout属性。 */
const activeCommandAnchorLayoutAttribute = 'data-layout="active-command-anchor"';

/** Terminal scrollback layout属性。 */
const terminalScrollbackLayoutAttribute = 'data-layout="terminal-scrollback"';

/** Fake window traffic lightのclass token。 */
const fakeWindowTrafficLightClassToken = "bg-red-500";

/** Inner window frameのshadow class token。 */
const innerWindowFrameShadowClassToken = "shadow-2xl";

/** Scrollbarを隠すscrollback class token。 */
const scrollbarlessScrollbackClassToken = "bookmark-cli-scrollback";

/** Command input focus保持属性。 */
const commandInputFocusBehaviorAttribute = 'data-focus-behavior="retain-command-input"';

/** Suggestion非表示状態属性。 */
const suggestionsHiddenAttribute = 'data-suggestions="hidden"';

/** Suggestion表示状態属性。 */
const suggestionsVisibleAttribute = 'data-suggestions="visible"';

/** Command suggestions aria-label属性。 */
const commandSuggestionsAriaLabelAttribute = 'aria-label="Command suggestions"';

/** Status output属性。 */
const statusOutputAttribute = 'data-output="status"';

/** Powerline prompt数。 */
const expectedPowerlinePromptCount = 2;

/** 出現回数計算でsplit結果から引くoffset。 */
const occurrenceSplitOffset = 1;

/** 文字列が見つからないindex。 */
const missingIndex = -1;

/** 入力値fixture。 */
const inputValue = "find stripe";

/** Status text fixture。 */
const statusText = "1 candidate";

/** Unknown command input fixture。 */
const unknownCommandInputValue = "/FE/HTML";

/** Unknown command status fixture。 */
const unknownCommandStatusText = "Unknown command: /FE/HTML";

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

/** Suggestion fixture一覧。 */
const suggestionItems = [
  {
    commandName: "ls",
    completion: "ls ",
    description: "現在ディレクトリを表示",
  },
] satisfies BookmarkCliScreenProps["suggestionItems"];

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

/** Unknown command表示用Bookmark CLI screen props fixture。 */
const unknownCommandProps = {
  ...baseProps,
  inputValue: "",
  transcriptEntries: [
    {
      id: "entry-unknown",
      inputValue: unknownCommandInputValue,
      resultItems: [],
      statusText: unknownCommandStatusText,
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
 * Bookmark CLI screenのlayout表示テストスイート。
 */
describe("BookmarkCliScreen layout", (): void => {
  /**
   * 別window前提のため内側のwindow chromeを描画しないことを検証。
   */
  it("renders the CLI surface without nested window chrome", (): void => {
    const html = renderToStaticMarkup(createElement(BookmarkCliScreen, baseProps));

    expect(html).not.toContain(fakeWindowTrafficLightClassToken);
    expect(html).not.toContain(innerWindowFrameShadowClassToken);
  });

  /**
   * Scrollbackをscrollbar非表示viewportとして描画することを検証。
   */
  it("marks the scrollback as a scrollbarless terminal viewport", (): void => {
    const html = renderToStaticMarkup(createElement(BookmarkCliScreen, baseProps));

    expect(html).toContain(terminalScrollbackLayoutAttribute);
    expect(html).toContain(scrollbarlessScrollbackClassToken);
  });

  /**
   * Terminal面がcommand input focus保持対象であることを検証。
   */
  it("marks the terminal surface as retaining command input focus", (): void => {
    const html = renderToStaticMarkup(createElement(BookmarkCliScreen, baseProps));

    expect(html).toContain(commandInputFocusBehaviorAttribute);
  });
});

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

  /**
   * Suggestionを現在promptの後に描画することを検証。
   */
  it("renders suggestions after the active command prompt", (): void => {
    const html = renderToStaticMarkup(
      createElement(BookmarkCliScreen, { ...baseProps, suggestionItems }),
    );
    const activeCommandAnchorIndex = html.indexOf(activeCommandAnchorLayoutAttribute);
    const commandInputIndex = html.indexOf(commandInputAriaLabelAttribute);
    const suggestionsIndex = html.indexOf(commandSuggestionsAriaLabelAttribute);

    expect(activeCommandAnchorIndex).toBeGreaterThan(missingIndex);
    expect(commandInputIndex).toBeGreaterThan(missingIndex);
    expect(commandInputIndex).toBeGreaterThan(activeCommandAnchorIndex);
    expect(suggestionsIndex).toBeGreaterThan(commandInputIndex);
  });

  /**
   * Suggestionがない場合はcommand line下部の余白を広げないことを検証。
   */
  it("does not reserve suggestion space without suggestions", (): void => {
    const html = renderToStaticMarkup(createElement(BookmarkCliScreen, baseProps));

    expect(html).toContain(suggestionsHiddenAttribute);
    expect(html).not.toContain(suggestionsVisibleAttribute);
  });
});

/**
 * Bookmark CLI screenのtranscript output表示テストスイート。
 */
describe("BookmarkCliScreen transcript output", (): void => {
  /**
   * Resultがないstatus textをcommand行の次のoutput行へ描画することを検証。
   */
  it("renders status-only output on the next transcript line", (): void => {
    const html = renderToStaticMarkup(createElement(BookmarkCliScreen, unknownCommandProps));
    const transcriptInputIndex = html.indexOf(unknownCommandInputValue);
    const statusOutputIndex = html.indexOf(statusOutputAttribute);
    const statusTextIndex = html.indexOf(unknownCommandStatusText);

    expect(transcriptInputIndex).toBeGreaterThan(missingIndex);
    expect(statusOutputIndex).toBeGreaterThan(transcriptInputIndex);
    expect(statusTextIndex).toBeGreaterThan(statusOutputIndex);
  });
});
