---
editUrl: false
next: false
prev: false
title: BrowserShortcutSettingsCommandsApi
slug: 1.3.0/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/browsershortcutsettingscommandsapi
---

Defined in: [infrastructure/chrome/shortcut-settings-page-adapter.ts:5](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/shortcut-settings-page-adapter.ts#L5)

Firefox shortcut設定画面を開くcommands APIの最小shapeです。

## Properties

### getAll

> `readonly` **getAll**: () => `Promise`\<readonly `unknown`\[]>

Defined in: [infrastructure/chrome/shortcut-settings-page-adapter.ts:7](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/shortcut-settings-page-adapter.ts#L7)

Command一覧を取得します。

#### Returns

`Promise`\<readonly `unknown`\[]>

***

### openShortcutSettings?

> `readonly` `optional` **openShortcutSettings?**: () => `Promise`\<`unknown`>

Defined in: [infrastructure/chrome/shortcut-settings-page-adapter.ts:9](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/shortcut-settings-page-adapter.ts#L9)

Shortcut設定画面を開きます。

#### Returns

`Promise`\<`unknown`>
