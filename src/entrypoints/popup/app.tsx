import { type ReactElement, useEffect, useState } from "react";
import { SettingsPopup } from "../../presentation/settings/components/settings-popup";
import { createChromeCommandShortcutReader } from "../../infrastructure/chrome/commands-adapter";
import { createChromeShortcutSettingsPageOpener } from "../../infrastructure/chrome/shortcut-settings-page-adapter";
import { createOpenCliPageMessage } from "./popup-messages";

/** Dedicated extension pageを開くcommand名です。 */
const openCliPageCommandName = "open-cli-page";

/** 初期shortcut表示です。 */
const initialShortcutLabel = "";

/** Chrome commands APIを使うshortcut readerです。 */
const shortcutReader = createChromeCommandShortcutReader(browser.commands);

/** Chrome tabs APIを使うshortcut settings openerです。 */
const shortcutSettingsPageOpener = createChromeShortcutSettingsPageOpener(browser.tabs);

/**
 * Popup失敗を握りつぶします。
 * @returns {void} 返り値なし。
 */
const ignorePopupError = (): void => {
  browser.runtime.getManifest();
};

/**
 * CLI pageをbackground経由で開きます。
 * @returns {Promise<void>} message送信完了Promiseです。
 */
const openCliPage = async (): Promise<void> => {
  await browser.runtime.sendMessage(createOpenCliPageMessage());
};

/**
 * Bookmark CLI settings popup appです。
 * @returns {ReactElement} Popup app elementです。
 */
export const App = (): ReactElement => {
  const [shortcutConfigured, setShortcutConfigured] = useState(false);
  const [shortcutLabel, setShortcutLabel] = useState(initialShortcutLabel);

  useEffect((): void => {
    shortcutReader
      .readCommandShortcut(openCliPageCommandName)
      .then((shortcut) => {
        setShortcutConfigured(shortcut.configured);
        setShortcutLabel(shortcut.shortcut);
      })
      .catch(ignorePopupError);
  }, []);

  /**
   * Shortcut設定画面を開きます。
   * @returns {void} 返り値なし。
   */
  const handleOpenShortcutSettings = (): void => {
    shortcutSettingsPageOpener.openShortcutSettingsPage().catch(ignorePopupError);
  };

  /**
   * CLI pageを開きます。
   * @returns {void} 返り値なし。
   */
  const handleOpenCliPage = (): void => {
    openCliPage().catch(ignorePopupError);
  };

  return (
    <SettingsPopup
      onOpenCliPage={handleOpenCliPage}
      onOpenShortcutSettings={handleOpenShortcutSettings}
      shortcutConfigured={shortcutConfigured}
      shortcutLabel={shortcutLabel}
    />
  );
};
