---
editUrl: false
next: false
prev: false
title: ChromeHistorySearchQuery
slug: 1.3.2/api/infrastructure/chrome/history-adapter/interfaces/chromehistorysearchquery
---

Defined in: [infrastructure/chrome/history-adapter.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/history-adapter.ts#L15)

Chrome History APIの検索query。

## See

https://developer.chrome.com/docs/extensions/reference/api/history#method-search

## Properties

### maxResults?

> `readonly` `optional` **maxResults?**: `number`

Defined in: [infrastructure/chrome/history-adapter.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/history-adapter.ts#L17)

検索件数上限。

***

### startTime?

> `readonly` `optional` **startTime?**: `number`

Defined in: [infrastructure/chrome/history-adapter.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/history-adapter.ts#L19)

検索開始日時。epoch milliseconds。

***

### text

> `readonly` **text**: `string`

Defined in: [infrastructure/chrome/history-adapter.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/history-adapter.ts#L21)

検索文字列。
