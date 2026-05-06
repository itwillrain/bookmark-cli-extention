---
editUrl: false
next: false
prev: false
title: ChromeCliPageWindowLauncher
slug: 1.3.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromeclipagewindowlauncher
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:363](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/cli-page-window-adapter.ts#L363)

CLI page window launcherです。

## Properties

### closeFocusedCliPageWindow

> `readonly` **closeFocusedCliPageWindow**: (`url`) => `Promise`\<`boolean`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:365](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/cli-page-window-adapter.ts#L365)

Focus中のCLI pageを閉じます。

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`boolean`>

***

### openCliPageWindow

> `readonly` **openCliPageWindow**: (`url`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:367](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/cli-page-window-adapter.ts#L367)

CLI pageを別windowで開きます。

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`void`>
