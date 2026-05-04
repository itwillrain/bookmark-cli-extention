import { type TargetBrowser, type UserManifest, type WxtViteConfig, defineConfig } from "wxt";
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
const extensionDescription = "ブラウザのブックマークをCLI感覚で検索、起動、保存、整理できます。";

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

/** Manifest作成に必要なWXT config envです。 */
interface ManifestConfigEnv {
  /** WXTのtarget browser名です。 */
  readonly browser: TargetBrowser;
}

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
 * Firefox browser名です。
 */
const firefoxBrowserName = "firefox";

/**
 * Firefox Add-on IDです。
 * @see https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/
 */
const firefoxAddonId = "bookmark-cli-extension@itwillrain.github.io";

/**
 * Firefoxのdata collectionなしを表す値です。
 * @see https://www.extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/
 */
const firefoxNoDataCollectionPermission = "none";

/**
 * Chrome専用のfavicon permissionです。
 * @see https://developer.chrome.com/docs/extensions/how-to/ui/favicons
 */
const chromeFaviconPermission = "favicon";

/**
 * Chromium系とFirefoxで共通して使うManifest権限です。
 * @see https://developer.chrome.com/docs/extensions/reference/permissions-list
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions
 */
const sharedManifestPermissions = ["activeTab", "bookmarks", "history", "storage"];

/**
 * Browser名がFirefoxかを判定します。
 * @param {TargetBrowser} browser WXTのtarget browser名です。
 * @returns {boolean} Firefoxならtrueです。
 */
const isFirefoxBrowser = (browser: TargetBrowser): boolean => browser === firefoxBrowserName;

/**
 * Target browserごとのManifest権限を作ります。
 * @param {TargetBrowser} browser WXTのtarget browser名です。
 * @returns {string[]} Manifestへ追加する権限です。
 */
const createManifestPermissions = (browser: TargetBrowser): string[] => {
  if (isFirefoxBrowser(browser)) {
    return [...sharedManifestPermissions];
  }

  return [...sharedManifestPermissions, chromeFaviconPermission];
};

/**
 * Firefox向けManifest追加設定を作ります。
 * @returns {NonNullable<UserManifest["browser_specific_settings"]>} Firefox向けManifest追加設定です。
 */
const createFirefoxBrowserSpecificSettings = (): NonNullable<
  UserManifest["browser_specific_settings"]
> => ({
  gecko: {
    data_collection_permissions: {
      required: [firefoxNoDataCollectionPermission],
    },
    id: firefoxAddonId,
  },
});

/**
 * WXTへ渡すManifest設定を作ります。
 * @param {TargetBrowser} browser WXTのtarget browser名です。
 * @returns {UserManifest} WXT manifest設定です。
 */
const createManifest = (browser: TargetBrowser): UserManifest => {
  const baseManifest = {
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
    permissions: createManifestPermissions(browser),
  } satisfies UserManifest;

  if (isFirefoxBrowser(browser)) {
    return {
      ...baseManifest,
      browser_specific_settings: createFirefoxBrowserSpecificSettings(),
    };
  }

  return baseManifest;
};

/**
 * WXT config envからManifest設定を作ります。
 * @param {ManifestConfigEnv} env WXT config envです。
 * @returns {UserManifest} WXT manifest設定です。
 */
const createManifestFromEnv = (env: ManifestConfigEnv): UserManifest => createManifest(env.browser);

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
  manifest: createManifestFromEnv,
  modules: enabledModules,
  outDir: outputDirectory,
  srcDir: sourceDirectory,
  vite: createViteConfig,
});
