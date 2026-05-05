---
editUrl: false
next: false
prev: false
title: ChromeWindowGetAllQuery
slug: 1.2.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowgetallquery
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:44](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/cli-page-window-adapter.ts#L44)

Chrome windows.getAllに渡す入力です。

## See

https://developer.chrome.com/docs/extensions/reference/api/windows#method-getAll

## Properties

### populate

> `readonly` **populate**: `boolean`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/cli-page-window-adapter.ts#L46)

Window内tab情報を含めるかです。

***

### windowTypes

> `readonly` **windowTypes**: [`ChromeWindowCreateType`](/1.2.0/api/infrastructure/chrome/cli-page-window-adapter/type-aliases/chromewindowcreatetype/)\[]

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/cli-page-window-adapter.ts#L48)

取得対象window種別です。
