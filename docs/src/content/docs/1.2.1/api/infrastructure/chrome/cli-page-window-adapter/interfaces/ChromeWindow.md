---
editUrl: false
next: false
prev: false
title: ChromeWindow
slug: 1.2.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindow
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:63](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L63)

Chrome windows APIが返すwindowの最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/windows#type-Window

## Properties

### focused?

> `readonly` `optional` **focused?**: `boolean`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:65](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L65)

Windowがfocus中かです。

***

### id?

> `readonly` `optional` **id?**: `number`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:67](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L67)

Window IDです。

***

### tabs?

> `readonly` `optional` **tabs?**: readonly [`ChromeWindowTab`](/1.2.1/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowtab/)\[]

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:69](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/cli-page-window-adapter.ts#L69)

Window内tab一覧です。
