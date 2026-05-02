import type { Meta, StoryObj } from "@storybook/web-components-vite";

/**
 * 拡張機能ステータス Story の引数です。
 */
interface ExtensionStatusStoryArguments {
  /**
   * ステータス見出しです。
   */
  readonly title: string;
  /**
   * ステータス説明文です。
   */
  readonly description: string;
}

/**
 * Storybook に表示するステータスコンポーネントの余白です。
 */
const statusPadding = "16px";

/**
 * Storybook に表示するステータスコンポーネントの角丸です。
 */
const statusBorderRadius = "8px";

/**
 * Storybook に表示するステータスコンポーネントの最大幅です。
 */
const statusMaxWidth = "320px";

/**
 * Storybook に表示するステータス見出しの下余白です。
 */
const titleMarginBlockEnd = "8px";

/**
 * Storybook に表示するステータス本文の行高です。
 */
const descriptionLineHeight = "1.6";

/**
 * ステータス Story のコンテナ要素を組み立てます。
 * @returns {HTMLElement} Storybook に描画するコンテナ要素です。
 */
const createStatusContainer = (): HTMLElement => {
  const container = document.createElement("section");

  Object.assign(container.style, {
    border: "1px solid CanvasText",
    borderRadius: statusBorderRadius,
    maxWidth: statusMaxWidth,
    padding: statusPadding,
  });

  return container;
};

/**
 * ステータス Story の見出し要素を組み立てます。
 * @param {string} titleText Story に表示する見出しです。
 * @returns {HTMLHeadingElement} Storybook に描画する見出し要素です。
 */
const createStatusTitle = (titleText: string): HTMLHeadingElement => {
  const title = document.createElement("h2");

  Object.assign(title.style, {
    marginBlockEnd: titleMarginBlockEnd,
    marginBlockStart: "0",
  });

  title.textContent = titleText;

  return title;
};

/**
 * ステータス Story の説明要素を組み立てます。
 * @param {string} descriptionText Story に表示する説明です。
 * @returns {HTMLParagraphElement} Storybook に描画する説明要素です。
 */
const createStatusDescription = (descriptionText: string): HTMLParagraphElement => {
  const description = document.createElement("p");

  Object.assign(description.style, {
    lineHeight: descriptionLineHeight,
    margin: "0",
  });

  description.textContent = descriptionText;

  return description;
};

/**
 * ステータス Story の HTMLElement を組み立てます。
 * @param {ExtensionStatusStoryArguments} arguments_ Story から受け取る表示引数です。
 * @returns {HTMLElement} Storybook に描画する HTMLElement です。
 */
const renderExtensionStatus = (arguments_: ExtensionStatusStoryArguments): HTMLElement => {
  const container = createStatusContainer();
  const title = createStatusTitle(arguments_.title);
  const description = createStatusDescription(arguments_.description);

  container.append(title, description);

  return container;
};

/**
 * 拡張機能ステータス Story の metadata です。
 */
const meta = {
  args: {
    description: "WXT と Storybook の表示環境が動作しています。",
    title: "Bookmark CLI Extension",
  },
  render: renderExtensionStatus,
  title: "Extension/Status",
} satisfies Meta<ExtensionStatusStoryArguments>;

export default meta;

/**
 * 標準状態の拡張機能ステータス Story です。
 */
export const Default: StoryObj<ExtensionStatusStoryArguments> = {};
