---
editUrl: false
next: false
prev: false
title: BrowserHistoryRepositoryPort
slug: 1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L99)

Chrome履歴を取得するportです。

## Properties

### searchHistory

> `readonly` **searchHistory**: (`input`) => `Promise`\<readonly [`BrowserHistoryEntry`](/1.2.1/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]>

Defined in: [application/bookmarks/bookmark-use-cases.ts:103](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L103)

Chrome履歴を検索します。

#### Parameters

##### input

[`BrowserHistorySearchInput`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistorysearchinput/)

#### Returns

`Promise`\<readonly [`BrowserHistoryEntry`](/1.2.1/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]>
