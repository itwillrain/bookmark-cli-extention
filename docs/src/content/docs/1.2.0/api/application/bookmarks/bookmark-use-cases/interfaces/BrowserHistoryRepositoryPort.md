---
editUrl: false
next: false
prev: false
title: BrowserHistoryRepositoryPort
slug: 1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-use-cases.ts#L99)

Chrome履歴を取得するportです。

## Properties

### searchHistory

> `readonly` **searchHistory**: (`input`) => `Promise`\<readonly [`BrowserHistoryEntry`](/1.2.0/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]>

Defined in: [application/bookmarks/bookmark-use-cases.ts:103](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-use-cases.ts#L103)

Chrome履歴を検索します。

#### Parameters

##### input

[`BrowserHistorySearchInput`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistorysearchinput/)

#### Returns

`Promise`\<readonly [`BrowserHistoryEntry`](/1.2.0/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]>
