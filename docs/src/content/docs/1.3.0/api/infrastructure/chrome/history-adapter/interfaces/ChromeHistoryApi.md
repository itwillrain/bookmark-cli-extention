---
editUrl: false
next: false
prev: false
title: ChromeHistoryApi
slug: 1.3.0/api/infrastructure/chrome/history-adapter/interfaces/chromehistoryapi
---

Defined in: [infrastructure/chrome/history-adapter.ts:28](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/history-adapter.ts#L28)

Chrome History APIのうちadapterが使う最小shape。

## See

https://developer.chrome.com/docs/extensions/reference/api/history

## Properties

### search

> `readonly` **search**: (`query`) => `Promise`\<readonly [`RawBrowserHistoryItem`](/1.3.0/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]>

Defined in: [infrastructure/chrome/history-adapter.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/history-adapter.ts#L30)

Chrome履歴を検索。

#### Parameters

##### query

[`ChromeHistorySearchQuery`](/1.3.0/api/infrastructure/chrome/history-adapter/interfaces/chromehistorysearchquery/)

#### Returns

`Promise`\<readonly [`RawBrowserHistoryItem`](/1.3.0/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]>
