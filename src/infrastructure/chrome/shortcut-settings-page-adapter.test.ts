import {
  type ChromeShortcutSettingsTabsApi,
  type ChromeTabCreateInput,
  chromeShortcutSettingsUrl,
  createChromeShortcutSettingsPageOpener,
} from "./shortcut-settings-page-adapter";
import { describe, expect, it } from "vitest";

/** 作成されたtab入力の記録先です。 */
const createdTabs: ChromeTabCreateInput[] = [];

/**
 * Tab作成入力を記録します。
 * @param {ChromeTabCreateInput} input Tab作成入力です。
 * @returns {Promise<void>} 記録完了Promiseです。
 */
const recordCreatedTab = async (input: ChromeTabCreateInput): Promise<void> => {
  createdTabs.push(input);
  await Promise.resolve();
};

/** Chrome tabs API fixtureです。 */
const tabsApi = {
  create: recordCreatedTab,
} satisfies ChromeShortcutSettingsTabsApi;

/** Shortcut設定画面openerのテストスイートです。 */
describe("createChromeShortcutSettingsPageOpener", (): void => {
  /** Chrome shortcut設定画面を新規tabで開くことを検証します。 */
  it("opens chrome shortcut settings page", async (): Promise<void> => {
    createdTabs.length = 0;
    const opener = createChromeShortcutSettingsPageOpener(tabsApi);

    await opener.openShortcutSettingsPage();

    expect(createdTabs).toStrictEqual([{ url: chromeShortcutSettingsUrl }]);
  });
});
