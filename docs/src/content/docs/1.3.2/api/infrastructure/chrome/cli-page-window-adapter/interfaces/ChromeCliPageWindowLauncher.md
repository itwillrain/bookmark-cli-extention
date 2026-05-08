---
editUrl: false
next: false
prev: false
title: ChromeCliPageWindowLauncher
slug: 1.3.2/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromeclipagewindowlauncher
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:363](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-adapter.ts#L363)

CLI page window launcherです。

## Properties

### closeFocusedCliPageWindow

> `readonly` **closeFocusedCliPageWindow**: (`url`) => `Promise`\<`boolean`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:365](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-adapter.ts#L365)

Focus中のCLI pageを閉じます。

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`boolean`>

***

### openCliPageWindow

> `readonly` **openCliPageWindow**: (`url`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:367](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-adapter.ts#L367)

CLI pageを別windowで開きます。

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`void`>
