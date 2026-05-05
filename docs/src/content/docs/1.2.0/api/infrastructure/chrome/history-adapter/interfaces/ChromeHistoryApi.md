---
editUrl: false
next: false
prev: false
title: ChromeHistoryApi
slug: 1.2.0/api/infrastructure/chrome/history-adapter/interfaces/chromehistoryapi
---

Defined in: [infrastructure/chrome/history-adapter.ts:28](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/history-adapter.ts#L28)

Chrome History APIのうちadapterが使う最小shape。

## See

https://developer.chrome.com/docs/extensions/reference/api/history

## Properties

### search

> `readonly` **search**: (`query`) => `Promise`\<readonly [`RawBrowserHistoryItem`](/1.2.0/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]>

Defined in: [infrastructure/chrome/history-adapter.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/history-adapter.ts#L30)

Chrome履歴を検索。

#### Parameters

##### query

[`ChromeHistorySearchQuery`](/1.2.0/api/infrastructure/chrome/history-adapter/interfaces/chromehistorysearchquery/)

#### Returns

`Promise`\<readonly [`RawBrowserHistoryItem`](/1.2.0/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]>
