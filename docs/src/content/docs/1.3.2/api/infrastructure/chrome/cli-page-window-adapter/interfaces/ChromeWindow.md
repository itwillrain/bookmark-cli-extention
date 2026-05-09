---
editUrl: false
next: false
prev: false
title: ChromeWindow
slug: 1.3.2/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindow
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:63](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-adapter.ts#L63)

Chrome windows APIが返すwindowの最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/windows#type-Window

## Properties

### focused?

> `readonly` `optional` **focused?**: `boolean`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:65](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-adapter.ts#L65)

Windowがfocus中かです。

***

### id?

> `readonly` `optional` **id?**: `number`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:67](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-adapter.ts#L67)

Window IDです。

***

### tabs?

> `readonly` `optional` **tabs?**: readonly [`ChromeWindowTab`](/1.3.2/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowtab/)\[]

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:69](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/cli-page-window-adapter.ts#L69)

Window内tab一覧です。
