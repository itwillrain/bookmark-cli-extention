import type { LaunchContext } from "../application/bookmarks/mark-bookmark-use-case";
import { addToolbarActionClickListener } from "../infrastructure/chrome/toolbar-action-adapter";
import { createChromeCliPageWindowIdStorage } from "../infrastructure/chrome/cli-page-window-id-storage-adapter";
import { createChromeCliPageWindowLauncher } from "../infrastructure/chrome/cli-page-window-adapter";
import { createChromeLaunchContextStorage } from "../infrastructure/chrome/launch-context-storage-adapter";
import { isOpenCliPageMessage } from "./popup/popup-messages";

/**
 * Dedicated extension pageのpathです。
 */
const cliPagePath = "/cli-page.html";

/**
 * Dedicated extension pageを開くcommand名です。
 */
const openCliPageCommandName = "open-cli-page";

/**
 * 先頭tab indexです。
 */
const firstTabIndex = 0;

/**
 * Launch context storageです。
 */
const launchContextStorage = createChromeLaunchContextStorage(browser.storage.session);

/**
 * CLI page window ID storageです。
 */
const cliPageWindowIdStorage = createChromeCliPageWindowIdStorage(browser.storage.session);

/**
 * CLI page window launcherです。
 */
const cliPageWindowLauncher = createChromeCliPageWindowLauncher(
  browser.windows,
  cliPageWindowIdStorage,
);

/**
 * Launch context生成に使うtabの最小shapeです。
 */
interface LaunchContextSourceTab {
  /**
   * Tab IDです。
   */
  readonly id?: number | undefined;
  /**
   * Tab titleです。
   */
  readonly title?: string | undefined;
  /**
   * Tab URLです。
   */
  readonly url?: string | undefined;
}

/** LaunchContext生成成功結果。 */
interface LaunchContextResolutionSuccess {
  /** 生成成功。 */
  readonly ok: true;
  /** LaunchContext。 */
  readonly value: LaunchContext;
}

/** LaunchContext生成失敗結果。 */
interface LaunchContextResolutionFailure {
  /** 生成失敗。 */
  readonly ok: false;
}

/** LaunchContext生成結果。 */
type LaunchContextResolution = LaunchContextResolutionFailure | LaunchContextResolutionSuccess;

/** LaunchContext生成失敗結果。 */
const launchContextResolutionFailure = { ok: false } satisfies LaunchContextResolutionFailure;

/**
 * Dedicated extension pageのURLを作ります。
 * @returns {string} Dedicated extension pageのURLです。
 */
const createCliPageUrl = (): string => browser.runtime.getURL(cliPagePath);

/**
 * TabからLaunchContextを作ります。
 * @param {LaunchContextSourceTab | undefined} tab 起動元tabです。
 * @returns {LaunchContextResolution} LaunchContext生成結果です。
 */
const createLaunchContext = (tab: LaunchContextSourceTab | undefined): LaunchContextResolution => {
  if (typeof tab?.id !== "number" || typeof tab.title !== "string" || typeof tab.url !== "string") {
    return launchContextResolutionFailure;
  }

  return {
    ok: true,
    value: {
      tabId: tab.id,
      title: tab.title,
      url: tab.url,
    },
  };
};

/**
 * 現在activeなtabをLaunchContextとして保存します。
 * @returns {Promise<void>} 保存完了Promiseです。
 */
const saveActiveLaunchContext = async (): Promise<void> => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const launchContext = createLaunchContext(tabs[firstTabIndex]);

  if (launchContext.ok) {
    await launchContextStorage.writeLaunchContext(launchContext.value);
  }
};

/**
 * Dedicated extension pageを別windowで開きます。
 * @returns {Promise<void>} Window作成完了を表すPromiseです。
 */
const openCliPage = async (): Promise<void> => {
  await saveActiveLaunchContext();
  await cliPageWindowLauncher.openCliPageWindow(createCliPageUrl());
};

/**
 * HotkeyからDedicated extension pageをtoggleします。
 * @returns {Promise<void>} Window更新完了を表すPromiseです。
 */
const toggleCliPageByHotkey = async (): Promise<void> => {
  if (await cliPageWindowLauncher.closeFocusedCliPageWindow(createCliPageUrl())) {
    return;
  }

  await openCliPage();
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
    toggleCliPageByHotkey().catch(handleOpenCliPageError);
  }
};

/**
 * Popup runtime messageを処理します。
 * @param {unknown} message runtime messageです。
 * @returns {void} 返り値はありません。
 */
const handleRuntimeMessage = (message: unknown): void => {
  if (isOpenCliPageMessage(message)) {
    openCliPage().catch(handleOpenCliPageError);
  }
};

/**
 * 起動時に実行する background script の初期化処理です。
 * @returns {void} 返り値はありません。
 */
const setupBackground = (): void => {
  addToolbarActionClickListener(browser, handleActionClicked);
  browser.commands.onCommand.addListener(handleCommand);
  browser.runtime.onInstalled.addListener(handleInstalled);
  browser.runtime.onMessage.addListener(handleRuntimeMessage);
};

/**
 * WXT の background entrypoint です。
 * @see https://wxt.dev/guide/essentials/entrypoints
 */
export default defineBackground(setupBackground);
