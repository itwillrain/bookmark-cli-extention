import type { StorybookConfig } from "@storybook/react-vite";

/**
 * Storybook が Story として読み込むファイルの glob です。
 */
const storyPatterns = ["../src/**/*.stories.@(ts|tsx|js|jsx|mjs)"];

/**
 * Storybook が有効化する addon 名です。
 */
const enabledAddons = ["@storybook/addon-docs"];

/**
 * Storybook の React 向け設定です。
 */
const config: StorybookConfig = {
  addons: enabledAddons,
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: storyPatterns,
};

export default config;
