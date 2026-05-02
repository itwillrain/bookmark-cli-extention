import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

/**
 * Storybook の Vite 最終設定関数です。
 */
type StorybookViteFinal = NonNullable<StorybookConfig["viteFinal"]>;

/**
 * Storybook が Story として読み込むファイルの glob です。
 */
const storyPatterns = ["../src/**/*.stories.@(ts|tsx|js|jsx|mjs)"];

/**
 * Storybook が有効化する addon 名です。
 */
const enabledAddons = ["@storybook/addon-docs"];

/**
 * Storybook の Vite 設定へ Tailwind CSS plugin を追加します。
 * @param {Parameters<StorybookViteFinal>[0]} viteConfig Storybook から渡される Vite 設定です。
 * @returns {ReturnType<StorybookViteFinal>} Tailwind CSS plugin を追加した Vite 設定です。
 * @see https://tailwindcss.com/docs/installation/using-vite
 */
// oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- Storybook の viteFinal は Vite の mutable config 型を受け取るためです。
const createViteFinalConfig: StorybookViteFinal = (viteConfig) => ({
  ...viteConfig,
  plugins: [...(viteConfig.plugins ?? []), tailwindcss()],
});

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
  viteFinal: createViteFinalConfig,
};

export default config;
