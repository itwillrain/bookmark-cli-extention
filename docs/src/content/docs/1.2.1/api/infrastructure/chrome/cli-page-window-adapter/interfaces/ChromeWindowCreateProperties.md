---
editUrl: false
next: false
prev: false
title: ChromeWindowCreateProperties
slug: 1.2.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowcreateproperties
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:16](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L16)

Chrome windows.createに渡す入力です。

## See

https://developer.chrome.com/docs/extensions/reference/api/windows#method-create

## Properties

### focused

> `readonly` **focused**: `boolean`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L18)

作成したwindowへfocusするかです。

***

### height

> `readonly` **height**: `number`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L20)

Windowの高さです。

***

### type

> `readonly` **type**: [`ChromeWindowCreateType`](/1.2.1/api/infrastructure/chrome/cli-page-window-adapter/type-aliases/chromewindowcreatetype/)

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L22)

Window種別です。

***

### url

> `readonly` **url**: `string`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L24)

Windowで開くURLです。

***

### width

> `readonly` **width**: `number`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:26](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L26)

Windowの幅です。
