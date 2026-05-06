---
editUrl: false
next: false
prev: false
title: createChromeShortcutSettingsPageOpener
slug: 1.2.1/api/infrastructure/chrome/shortcut-settings-page-adapter/functions/createchromeshortcutsettingspageopener
---

> **createChromeShortcutSettingsPageOpener**(`apiSource`): [`ChromeShortcutSettingsPageOpener`](/1.2.1/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/chromeshortcutsettingspageopener/)

Defined in: [infrastructure/chrome/shortcut-settings-page-adapter.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/shortcut-settings-page-adapter.ts#L53)

Browser APIをshortcut設定画面openerへ変換します。

## Parameters

### apiSource

[`BrowserShortcutSettingsApiSource`](/1.2.1/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/browsershortcutsettingsapisource/)

Browser API sourceです。

## Returns

[`ChromeShortcutSettingsPageOpener`](/1.2.1/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/chromeshortcutsettingspageopener/)

Shortcut設定画面openerです。

## See

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands/openShortcutSettings
