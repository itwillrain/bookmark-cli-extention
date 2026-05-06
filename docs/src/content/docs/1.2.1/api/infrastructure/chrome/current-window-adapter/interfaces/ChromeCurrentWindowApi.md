---
editUrl: false
next: false
prev: false
title: ChromeCurrentWindowApi
slug: 1.2.1/api/infrastructure/chrome/current-window-adapter/interfaces/chromecurrentwindowapi
---

Defined in: [infrastructure/chrome/current-window-adapter.ts:14](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/current-window-adapter.ts#L14)

現在windowを閉じるために使うChrome windows APIの最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/windows

## Properties

### getCurrent

> `readonly` **getCurrent**: () => `Promise`\<[`ChromeCurrentWindow`](/1.2.1/api/infrastructure/chrome/current-window-adapter/interfaces/chromecurrentwindow/)>

Defined in: [infrastructure/chrome/current-window-adapter.ts:16](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/current-window-adapter.ts#L16)

現在windowを取得します。

#### Returns

`Promise`\<[`ChromeCurrentWindow`](/1.2.1/api/infrastructure/chrome/current-window-adapter/interfaces/chromecurrentwindow/)>

***

### remove

> `readonly` **remove**: (`windowId`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/current-window-adapter.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/current-window-adapter.ts#L18)

Windowを閉じます。

#### Parameters

##### windowId

`number`

#### Returns

`Promise`\<`void`>
