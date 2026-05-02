import type { Preview } from "@storybook/react-vite";

/**
 * Storybook の操作パネルに設定する正規表現です。
 */
const colorControlMatcher = /(background|color)$/iu;

/**
 * Storybook の日付操作パネルに設定する正規表現です。
 */
const dateControlMatcher = /Date$/u;

/**
 * Storybook 全体に適用する preview 設定です。
 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: colorControlMatcher,
        date: dateControlMatcher,
      },
    },
  },
};

export default preview;
