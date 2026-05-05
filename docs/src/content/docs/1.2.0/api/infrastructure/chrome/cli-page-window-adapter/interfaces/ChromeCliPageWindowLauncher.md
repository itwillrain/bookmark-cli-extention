---
editUrl: false
next: false
prev: false
title: ChromeCliPageWindowLauncher
slug: 1.2.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromeclipagewindowlauncher
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:314](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/cli-page-window-adapter.ts#L314)

CLI page window launcherです。

## Properties

### closeFocusedCliPageWindow

> `readonly` **closeFocusedCliPageWindow**: (`url`) => `Promise`\<`boolean`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:316](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/cli-page-window-adapter.ts#L316)

Focus中のCLI pageを閉じます。

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`boolean`>

***

### openCliPageWindow

> `readonly` **openCliPageWindow**: (`url`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:318](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/cli-page-window-adapter.ts#L318)

CLI pageを別windowで開きます。

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`void`>
