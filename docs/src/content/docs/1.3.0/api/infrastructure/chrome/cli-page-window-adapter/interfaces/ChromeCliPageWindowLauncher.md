---
editUrl: false
next: false
prev: false
title: ChromeCliPageWindowLauncher
slug: 1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromeclipagewindowlauncher
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:314](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L314)

CLI page window launcherです。

## Properties

### closeFocusedCliPageWindow

> `readonly` **closeFocusedCliPageWindow**: (`url`) => `Promise`\<`boolean`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:316](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L316)

Focus中のCLI pageを閉じます。

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`boolean`>

***

### openCliPageWindow

> `readonly` **openCliPageWindow**: (`url`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:318](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L318)

CLI pageを別windowで開きます。

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`void`>
