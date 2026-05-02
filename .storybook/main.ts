import type { StorybookConfig } from "@storybook/web-components-vite";

/**
 * Storybook が Story として読み込むファイルの glob です。
 */
const storyPatterns = ["../src/**/*.stories.@(ts|tsx|js|jsx|mjs)"];

/**
 * Storybook が有効化する addon 名です。
 */
const enabledAddons = ["@storybook/addon-docs"];

/**
 * Storybook の Web Components 向け設定です。
 */
const config: StorybookConfig = {
  addons: enabledAddons,
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  stories: storyPatterns,
};

export default config;
