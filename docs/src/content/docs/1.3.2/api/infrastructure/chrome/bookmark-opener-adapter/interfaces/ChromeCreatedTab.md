---
editUrl: false
next: false
prev: false
title: ChromeCreatedTab
slug: 1.3.2/api/infrastructure/chrome/bookmark-opener-adapter/interfaces/chromecreatedtab
---

Defined in: [infrastructure/chrome/bookmark-opener-adapter.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmark-opener-adapter.ts#L23)

Chrome Tabs APIが返すtabのうちadapterが使う最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/tabs#type-Tab

## Properties

### id?

> `readonly` `optional` **id?**: `number`

Defined in: [infrastructure/chrome/bookmark-opener-adapter.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmark-opener-adapter.ts#L27)

作成されたtab IDです。

***

### title?

> `readonly` `optional` **title?**: `string`

Defined in: [infrastructure/chrome/bookmark-opener-adapter.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmark-opener-adapter.ts#L31)

作成されたtab titleです。

***

### url?

> `readonly` `optional` **url?**: `string`

Defined in: [infrastructure/chrome/bookmark-opener-adapter.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmark-opener-adapter.ts#L35)

作成されたtab URLです。
