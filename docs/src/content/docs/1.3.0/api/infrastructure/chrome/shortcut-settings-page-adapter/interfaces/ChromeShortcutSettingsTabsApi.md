---
editUrl: false
next: false
prev: false
title: ChromeShortcutSettingsTabsApi
slug: 1.3.0/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/chromeshortcutsettingstabsapi
---

Defined in: [infrastructure/chrome/shortcut-settings-page-adapter.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/shortcut-settings-page-adapter.ts#L19)

Shortcut設定画面を開くために使うChrome tabs APIの最小shapeです。

## Properties

### create

> `readonly` **create**: (`input`) => `Promise`\<`unknown`>

Defined in: [infrastructure/chrome/shortcut-settings-page-adapter.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/shortcut-settings-page-adapter.ts#L21)

Tabを作成します。

#### Parameters

##### input

[`ChromeTabCreateInput`](/1.3.0/api/infrastructure/chrome/shortcut-settings-page-adapter/interfaces/chrometabcreateinput/)

#### Returns

`Promise`\<`unknown`>
