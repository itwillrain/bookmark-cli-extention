import { defineConfig } from "wxt";

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
 * WXT のプロジェクト設定です。
 * @see https://wxt.dev/guide/essentials/config
 */
export default defineConfig({
  manifest: {
    description: extensionDescription,
    name: extensionName,
  },
  srcDir: sourceDirectory,
});
