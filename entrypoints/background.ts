/**
 * 拡張機能がインストールされた際に実行する初期化処理です。
 * @returns {void} 返り値はありません。
 */
const handleInstalled = (): void => {
  browser.runtime.getManifest();
};

/**
 * 起動時に実行する background script の初期化処理です。
 * @returns {void} 返り値はありません。
 */
const setupBackground = (): void => {
  browser.runtime.onInstalled.addListener(handleInstalled);
};

/**
 * WXT の background entrypoint です。
 * @see https://wxt.dev/guide/essentials/entrypoints
 */
export default defineBackground(setupBackground);
