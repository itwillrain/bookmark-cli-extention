import { type WxtViteConfig, defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import typiaVitePlugin from "@typia/unplugin/vite";

/**
 * 拡張機能のソースコードを配置するディレクトリです。
 */
const sourceDirectory = "src";

/**
 * 拡張機能の表示名です。
 */
const extensionName = "Bookmark CLI Extension";

/**
 * 拡張機能の説明文です。
 */
const extensionDescription = "Bookmark CLI browser extension built with WXT.";

/**
 * Dedicated extension pageを開くcommand名です。
 */
const openCliPageCommandName = "open-cli-page";

/**
 * WXT に登録する module 名です。
 */
const enabledModules = ["@wxt-dev/module-react"];

/**
 * Manifestへ追加する権限です。
 */
const manifestPermissions = ["bookmarks", "storage"];

/**
 * Vite に追加する plugin 設定を組み立てます。
 * @returns {WxtViteConfig} WXT へ渡す Vite 設定です。
 * @see https://typia.io/docs/setup/#typiaunplugin
 * @see https://tailwindcss.com/docs/installation/using-vite
 */
const createViteConfig = (): WxtViteConfig => ({
  plugins: [typiaVitePlugin(), tailwindcss()],
});

/**
 * WXT のプロジェクト設定です。
 * @see https://wxt.dev/guide/essentials/config
 */
export default defineConfig({
  manifest: {
    action: {
      default_title: extensionName,
    },
    commands: {
      [openCliPageCommandName]: {
        description: "Open Bookmark CLI",
      },
    },
    description: extensionDescription,
    name: extensionName,
    permissions: manifestPermissions,
  },
  modules: enabledModules,
  srcDir: sourceDirectory,
  vite: createViteConfig,
});
