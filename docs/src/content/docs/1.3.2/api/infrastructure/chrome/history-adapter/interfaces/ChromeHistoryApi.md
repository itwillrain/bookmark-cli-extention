---
editUrl: false
next: false
prev: false
title: ChromeHistoryApi
slug: 1.3.2/api/infrastructure/chrome/history-adapter/interfaces/chromehistoryapi
---

Defined in: [infrastructure/chrome/history-adapter.ts:28](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/history-adapter.ts#L28)

Chrome History APIのうちadapterが使う最小shape。

## See

https://developer.chrome.com/docs/extensions/reference/api/history

## Properties

### search

> `readonly` **search**: (`query`) => `Promise`\<readonly [`RawBrowserHistoryItem`](/1.3.2/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]>

Defined in: [infrastructure/chrome/history-adapter.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/history-adapter.ts#L30)

Chrome履歴を検索。

#### Parameters

##### query

[`ChromeHistorySearchQuery`](/1.3.2/api/infrastructure/chrome/history-adapter/interfaces/chromehistorysearchquery/)

#### Returns

`Promise`\<readonly [`RawBrowserHistoryItem`](/1.3.2/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]>
