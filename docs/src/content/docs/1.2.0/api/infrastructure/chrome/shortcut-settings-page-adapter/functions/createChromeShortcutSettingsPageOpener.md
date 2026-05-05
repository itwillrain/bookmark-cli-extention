---
editUrl: false
next: false
prev: false
title: createChromeShortcutSettingsPageOpener
slug: 1.2.0/api/infrastructure/chrome/shortcut-settings-page-adapter/functions/createchromeshortcutsettingspageopener
---

> **createChromeShortcutSettingsPageOpener**(`apiSource`): [`ChromeShortcutSettingsPageOpener`](/1.2.0/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/chromeshortcutsettingspageopener/)

Defined in: [infrastructure/chrome/shortcut-settings-page-adapter.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/shortcut-settings-page-adapter.ts#L53)

Browser APIをshortcut設定画面openerへ変換します。

## Parameters

### apiSource

[`BrowserShortcutSettingsApiSource`](/1.2.0/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/browsershortcutsettingsapisource/)

Browser API sourceです。

## Returns

[`ChromeShortcutSettingsPageOpener`](/1.2.0/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/chromeshortcutsettingspageopener/)

Shortcut設定画面openerです。

## See

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands/openShortcutSettings
