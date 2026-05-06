---
editUrl: false
next: false
prev: false
title: ChromeWindowGetAllQuery
slug: 1.3.0/api/infrastructure/chrome/cli-page-window-adapter/interfaces/chromewindowgetallquery
---

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:44](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L44)

Chrome windows.getAllに渡す入力です。

## See

https://developer.chrome.com/docs/extensions/reference/api/windows#method-getAll

## Properties

### populate

> `readonly` **populate**: `boolean`

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L46)

Window内tab情報を含めるかです。

***

### windowTypes

> `readonly` **windowTypes**: [`ChromeWindowCreateType`](/1.3.0/api/infrastructure/chrome/cli-page-window-adapter/type-aliases/chromewindowcreatetype/)\[]

Defined in: [infrastructure/chrome/cli-page-window-adapter.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/cli-page-window-adapter.ts#L48)

取得対象window種別です。
