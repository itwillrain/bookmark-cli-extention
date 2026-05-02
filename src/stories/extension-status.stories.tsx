import type { CSSProperties, ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
 * Storybook に表示するステータスコンポーネントのコンテナstyleです。
 */
const statusContainerStyle = {
  border: "1px solid CanvasText",
  borderRadius: "8px",
  maxWidth: "320px",
  padding: "16px",
} satisfies CSSProperties;

/**
 * Storybook に表示するステータス見出しstyleです。
 */
const statusTitleStyle = {
  marginBlockEnd: "8px",
  marginBlockStart: "0",
} satisfies CSSProperties;

/**
 * Storybook に表示するステータス本文styleです。
 */
const statusDescriptionStyle = {
  lineHeight: "1.6",
  margin: "0",
} satisfies CSSProperties;

/**
 * 拡張機能ステータス Story を描画します。
 * @param {ExtensionStatusStoryArguments} arguments_ Story から受け取る表示引数です。
 * @returns {ReactElement} Storybook に描画する React element です。
 */
const renderExtensionStatus = (arguments_: ExtensionStatusStoryArguments): ReactElement => (
  <section style={statusContainerStyle}>
    <h2 style={statusTitleStyle}>{arguments_.title}</h2>
    <p style={statusDescriptionStyle}>{arguments_.description}</p>
  </section>
);

/**
 * 拡張機能ステータス Story の metadata です。
 */
const meta = {
  args: {
    description: "WXT、React、Storybookの表示環境が動作しています。",
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
