import {
  type BrowserShortcutSettingsCommandsApi,
  type ChromeShortcutSettingsTabsApi,
  type ChromeTabCreateInput,
  chromeShortcutSettingsUrl,
  createChromeShortcutSettingsPageOpener,
} from "./shortcut-settings-page-adapter";
import { describe, expect, it } from "vitest";

/** 作成されたtab入力の記録先です。 */
const createdTabs: ChromeTabCreateInput[] = [];

/** 呼び出し回数初期値です。 */
const initialCallCount = 0;

/** 1回呼び出し済みの回数です。 */
const singleCallCount = 1;

/** 呼び出し回数加算値です。 */
const callCountIncrement = 1;

/** 空のcommand一覧です。 */
const emptyCommands = [] as const satisfies readonly unknown[];

/** Firefox shortcut設定画面を開いた回数です。 */
let firefoxShortcutSettingsOpenCount = initialCallCount;

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

/**
 * Firefox shortcut設定画面openを記録します。
 * @returns {Promise<void>} 記録完了Promiseです。
 */
const recordFirefoxShortcutSettingsOpen = async (): Promise<void> => {
  firefoxShortcutSettingsOpenCount += callCountIncrement;
  await Promise.resolve();
};

/**
 * 空のcommand一覧を返します。
 * @returns {Promise<readonly unknown[]>} 空のcommand一覧です。
 */
const readEmptyCommands = async (): Promise<readonly unknown[]> => {
  await Promise.resolve();
  return emptyCommands;
};

/** Firefox commands API fixtureです。 */
const firefoxCommandsApi = {
  getAll: readEmptyCommands,
  openShortcutSettings: recordFirefoxShortcutSettingsOpen,
} satisfies BrowserShortcutSettingsCommandsApi;

/** Shortcut設定画面openerのテストスイートです。 */
describe("createChromeShortcutSettingsPageOpener", (): void => {
  /** Firefoxではcommands.openShortcutSettingsを使うことを検証します。 */
  it("opens firefox shortcut settings page with commands API", async (): Promise<void> => {
    createdTabs.length = 0;
    firefoxShortcutSettingsOpenCount = initialCallCount;
    const opener = createChromeShortcutSettingsPageOpener({
      commands: firefoxCommandsApi,
      tabs: tabsApi,
    });

    await opener.openShortcutSettingsPage();

    expect(firefoxShortcutSettingsOpenCount).toBe(singleCallCount);
    expect(createdTabs).toStrictEqual([]);
  });

  /** Chrome shortcut設定画面を新規tabで開くことを検証します。 */
  it("opens chrome shortcut settings page", async (): Promise<void> => {
    createdTabs.length = 0;
    firefoxShortcutSettingsOpenCount = initialCallCount;
    const opener = createChromeShortcutSettingsPageOpener({ tabs: tabsApi });

    await opener.openShortcutSettingsPage();

    expect(firefoxShortcutSettingsOpenCount).toBe(initialCallCount);
    expect(createdTabs).toStrictEqual([{ url: chromeShortcutSettingsUrl }]);
  });
});
