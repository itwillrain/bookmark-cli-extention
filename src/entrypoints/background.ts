/**
 * Dedicated extension pageのpathです。
 */
const cliPagePath = "/cli-page.html";

/**
 * Dedicated extension pageを開くcommand名です。
 */
const openCliPageCommandName = "open-cli-page";

/**
 * Dedicated extension pageのURLを作ります。
 * @returns {string} Dedicated extension pageのURLです。
 */
const createCliPageUrl = (): string => browser.runtime.getURL(cliPagePath);

/**
 * Dedicated extension pageを新しいtabで開きます。
 * @returns {Promise<void>} Tab作成完了を表すPromiseです。
 */
const openCliPage = async (): Promise<void> => {
  await browser.tabs.create({ url: createCliPageUrl() });
};

/**
 * Dedicated extension page表示失敗を握りつぶします。
 * @returns {void} 返り値はありません。
 */
const handleOpenCliPageError = (): void => {
  browser.runtime.getManifest();
};

/**
 * 拡張機能がインストールされた際に実行する初期化処理です。
 * @returns {void} 返り値はありません。
 */
const handleInstalled = (): void => {
  browser.runtime.getManifest();
};

/**
 * Toolbar action clickをDedicated extension page表示へ接続します。
 * @returns {void} 返り値はありません。
 */
const handleActionClicked = (): void => {
  openCliPage().catch(handleOpenCliPageError);
};

/**
 * Extension commandをDedicated extension page表示へ接続します。
 * @param {string} commandName 実行されたcommand名です。
 * @returns {void} 返り値はありません。
 */
const handleCommand = (commandName: string): void => {
  if (commandName === openCliPageCommandName) {
    openCliPage().catch(handleOpenCliPageError);
  }
};

/**
 * 起動時に実行する background script の初期化処理です。
 * @returns {void} 返り値はありません。
 */
const setupBackground = (): void => {
  browser.action.onClicked.addListener(handleActionClicked);
  browser.commands.onCommand.addListener(handleCommand);
  browser.runtime.onInstalled.addListener(handleInstalled);
};

/**
 * WXT の background entrypoint です。
 * @see https://wxt.dev/guide/essentials/entrypoints
 */
export default defineBackground(setupBackground);
