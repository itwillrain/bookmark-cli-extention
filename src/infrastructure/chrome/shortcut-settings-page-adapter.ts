/** Chrome shortcut設定画面URLです。 */
export const chromeShortcutSettingsUrl = "chrome://extensions/shortcuts";

/** Firefox shortcut設定画面を開くcommands APIの最小shapeです。 */
export interface BrowserShortcutSettingsCommandsApi {
  /** Command一覧を取得します。 */
  readonly getAll: () => Promise<readonly unknown[]>;
  /** Shortcut設定画面を開きます。 */
  readonly openShortcutSettings?: (() => Promise<unknown>) | undefined;
}

/** Chrome tabs.create入力の最小shapeです。 */
export interface ChromeTabCreateInput {
  /** 開くURLです。 */
  readonly url: string;
}

/** Shortcut設定画面を開くために使うChrome tabs APIの最小shapeです。 */
export interface ChromeShortcutSettingsTabsApi {
  /** Tabを作成します。 */
  readonly create: (input: ChromeTabCreateInput) => Promise<unknown>;
}

/** Shortcut設定画面を開くために使うbrowser APIの最小shapeです。 */
export interface BrowserShortcutSettingsApiSource {
  /** Commands APIです。 */
  readonly commands?: BrowserShortcutSettingsCommandsApi | undefined;
  /** Tabs APIです。 */
  readonly tabs: ChromeShortcutSettingsTabsApi;
}

/** Shortcut設定画面openerです。 */
export interface ChromeShortcutSettingsPageOpener {
  /** Shortcut設定画面を開きます。 */
  readonly openShortcutSettingsPage: () => Promise<void>;
}

/**
 * Firefox shortcut設定画面openerを取得します。
 * @param {BrowserShortcutSettingsCommandsApi | undefined} commandsApi Commands APIです。
 * @returns {(() => Promise<unknown>) | false} Firefox shortcut設定画面opener、または未検出を表すfalseです。
 */
const resolveFirefoxShortcutSettingsOpener = (
  commandsApi: BrowserShortcutSettingsCommandsApi | undefined,
): (() => Promise<unknown>) | false => commandsApi?.openShortcutSettings ?? false;

/**
 * Browser APIをshortcut設定画面openerへ変換します。
 * @param {BrowserShortcutSettingsApiSource} apiSource Browser API sourceです。
 * @returns {ChromeShortcutSettingsPageOpener} Shortcut設定画面openerです。
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands/openShortcutSettings
 */
export const createChromeShortcutSettingsPageOpener = (
  apiSource: BrowserShortcutSettingsApiSource,
): ChromeShortcutSettingsPageOpener => {
  /**
   * Shortcut設定画面を開きます。
   * @returns {Promise<void>} Shortcut設定画面表示完了Promiseです。
   */
  const openShortcutSettingsPage = async (): Promise<void> => {
    const firefoxShortcutSettingsOpener = resolveFirefoxShortcutSettingsOpener(apiSource.commands);

    if (firefoxShortcutSettingsOpener !== false) {
      await firefoxShortcutSettingsOpener();
      return;
    }

    await apiSource.tabs.create({ url: chromeShortcutSettingsUrl });
  };

  return { openShortcutSettingsPage };
};
