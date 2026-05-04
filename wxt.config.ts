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
 * WXT のbuild成果物を配置するディレクトリ。
 * @see https://wxt.dev/api/reference/wxt/interfaces/InlineConfig#outdir
 */
const outputDirectory = "dist";

/**
 * Manifest iconとして登録する画像path一覧です。
 * @see https://developer.chrome.com/docs/extensions/reference/manifest/icons
 */
const manifestIconPaths = {
  "128": "icons/128.png",
  "16": "icons/16.png",
  "24": "icons/24.png",
  "32": "icons/32.png",
  "48": "icons/48.png",
} as const;

/**
 * Toolbar action iconとして登録する画像path一覧です。
 * @see https://developer.chrome.com/docs/extensions/reference/manifest/action#icons
 */
const actionIconPaths = {
  "16": manifestIconPaths["16"],
  "24": manifestIconPaths["24"],
  "32": manifestIconPaths["32"],
} as const;

/**
 * Dedicated extension pageを開くcommand名です。
 */
const openCliPageCommandName = "open-cli-page";

/**
 * Dedicated extension pageを開く標準hotkeyです。
 */
const openCliPageDefaultHotkey = "Ctrl+Shift+K";

/**
 * Dedicated extension pageを開くmacOS向けhotkeyです。
 */
const openCliPageMacHotkey = "Command+Shift+K";

/**
 * WXT に登録する module 名です。
 */
const enabledModules = ["@wxt-dev/module-react"];

/**
 * Manifestへ追加する権限です。
 * @see https://developer.chrome.com/docs/extensions/how-to/ui/favicons
 * @see https://developer.chrome.com/docs/extensions/reference/permissions-list
 */
const manifestPermissions = ["activeTab", "bookmarks", "favicon", "history", "storage"];

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
      default_icon: actionIconPaths,
      default_title: extensionName,
    },
    commands: {
      [openCliPageCommandName]: {
        description: "Open Bookmark CLI",
        suggested_key: {
          default: openCliPageDefaultHotkey,
          mac: openCliPageMacHotkey,
        },
      },
    },
    description: extensionDescription,
    icons: manifestIconPaths,
    name: extensionName,
    permissions: manifestPermissions,
  },
  modules: enabledModules,
  outDir: outputDirectory,
  srcDir: sourceDirectory,
  vite: createViteConfig,
});
