import { expect, userEvent } from "storybook/test";
import type { BookmarkCliSuggestionItem } from "./bookmark-cli-screen";

/**
 * Storybook play関数が使うcontextの最小shapeです。
 */
interface BookmarkCliScreenStoryPlayContext {
  /**
   * Storyが描画されているcanvas elementです。
   */
  readonly canvasElement: Readonly<QueryContainer>;
}

/**
 * DOM queryを実行できるcontainerの最小shapeです。
 */
interface QueryContainer {
  /**
   * Selectorに一致する最初のelementを返します。
   */
  readonly querySelector: ParentNode["querySelector"];
}

/** Command input selectorです。 */
const commandInputSelector = '[aria-label="Bookmark CLI command"]';

/** Command suggestion list selectorです。 */
const commandSuggestionListSelector = '[role="listbox"][aria-label="Command suggestions"]';

/** Native browser補助属性の無効値です。 */
const nativeAssistanceDisabledValue = "off";

/** Native autocomplete属性名です。 */
const nativeAutocompleteAttributeName = "autocomplete";

/** Native autocapitalize属性名です。 */
const nativeAutocapitalizeAttributeName = "autocapitalize";

/** Native autocorrect属性名です。 */
const nativeAutocorrectAttributeName = "autocorrect";

/** Native autocomplete抑止確認用のcommand suggestionです。 */
export const nativeAutocompleteSuggestionItems = [
  {
    commandName: "ls",
    completion: "ls ",
    description: "現在ディレクトリを表示",
  },
  {
    commandName: "ll -a",
    completion: "ll -a ",
    description: "詳細一覧を表示",
  },
] satisfies readonly BookmarkCliSuggestionItem[];

/**
 * Selectorに一致するelementを必須として取得します。
 * @param {Readonly<QueryContainer>} container 検索対象containerです。
 * @param {string} selector DOM selectorです。
 * @returns {Element} 見つかったelementです。
 * @throws {Error} 必須elementが見つからない場合に投げます。
 */
const getRequiredElement = (container: Readonly<QueryContainer>, selector: string): Element => {
  const element = container.querySelector(selector);

  if (element === null) {
    throw new Error(`Missing required story element: ${selector}`);
  }

  return element;
};

/**
 * Selectorに一致するinput elementを必須として取得します。
 * @param {Readonly<QueryContainer>} container 検索対象containerです。
 * @param {string} selector DOM selectorです。
 * @returns {HTMLInputElement} 見つかったinput elementです。
 * @throws {Error} 必須elementがinputではない場合に投げます。
 */
const getRequiredInputElement = (
  container: Readonly<QueryContainer>,
  selector: string,
): HTMLInputElement => {
  const element = getRequiredElement(container, selector);

  if (!(element instanceof HTMLInputElement)) {
    throw new Error(`Required story element is not an input: ${selector}`);
  }

  return element;
};

/**
 * Selectorに一致するHTMLElementを必須として取得します。
 * @param {Readonly<QueryContainer>} container 検索対象containerです。
 * @param {string} selector DOM selectorです。
 * @returns {HTMLElement} 見つかったHTMLElementです。
 * @throws {Error} 必須elementがHTMLElementではない場合に投げます。
 */
const getRequiredHtmlElement = (
  container: Readonly<QueryContainer>,
  selector: string,
): HTMLElement => {
  const element = getRequiredElement(container, selector);

  if (!(element instanceof HTMLElement)) {
    throw new Error(`Required story element is not an HTMLElement: ${selector}`);
  }

  return element;
};

/**
 * Command inputがnative form補完を抑止していることを検証します。
 * @param {Readonly<Pick<HTMLInputElement, "getAttribute">>} commandInput Command input属性readerです。
 * @returns {Promise<void>} 検証完了Promiseです。
 */
const expectNativeFormAssistanceDisabled = async (
  commandInput: Readonly<Pick<HTMLInputElement, "getAttribute">>,
): Promise<void> => {
  await expect(commandInput.getAttribute(nativeAutocompleteAttributeName)).toBe(
    nativeAssistanceDisabledValue,
  );
  await expect(commandInput.getAttribute(nativeAutocapitalizeAttributeName)).toBe(
    nativeAssistanceDisabledValue,
  );
  await expect(commandInput.getAttribute(nativeAutocorrectAttributeName)).toBe(
    nativeAssistanceDisabledValue,
  );
};

/**
 * Browser native補完を抑止し、CLI補完だけを表示するStorybook play関数です。
 * @param {BookmarkCliScreenStoryPlayContext} context Storybook play contextです。
 * @returns {Promise<void>} 検証完了Promiseです。
 */
// oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- Storybook play contextはlive DOMを渡します。
export const playNativeAutocompleteDisabled = async (
  context: Readonly<BookmarkCliScreenStoryPlayContext>,
): Promise<void> => {
  const commandInput = getRequiredInputElement(context.canvasElement, commandInputSelector);
  const commandSuggestionList = getRequiredHtmlElement(
    context.canvasElement,
    commandSuggestionListSelector,
  );

  await userEvent.click(commandInput);
  await expect(commandInput).toHaveFocus();
  await expectNativeFormAssistanceDisabled(commandInput);
  await expect(commandSuggestionList).toBeVisible();
  await expect(commandSuggestionList).toHaveTextContent("ls");
  await expect(commandSuggestionList).toHaveTextContent("ll -a");
};
