/** Chrome shortcut設定画面URLです。 */
export const chromeShortcutSettingsUrl = "chrome://extensions/shortcuts";

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

/** Shortcut設定画面openerです。 */
export interface ChromeShortcutSettingsPageOpener {
  /** Shortcut設定画面を開きます。 */
  readonly openShortcutSettingsPage: () => Promise<void>;
}

/**
 * Chrome tabs APIをshortcut設定画面openerへ変換します。
 * @param {ChromeShortcutSettingsTabsApi} tabsApi Chrome tabs APIです。
 * @returns {ChromeShortcutSettingsPageOpener} Shortcut設定画面openerです。
 */
export const createChromeShortcutSettingsPageOpener = (
  tabsApi: ChromeShortcutSettingsTabsApi,
): ChromeShortcutSettingsPageOpener => {
  /**
   * Shortcut設定画面を開きます。
   * @returns {Promise<void>} Tab作成完了Promiseです。
   */
  const openShortcutSettingsPage = async (): Promise<void> => {
    await tabsApi.create({ url: chromeShortcutSettingsUrl });
  };

  return { openShortcutSettingsPage };
};
