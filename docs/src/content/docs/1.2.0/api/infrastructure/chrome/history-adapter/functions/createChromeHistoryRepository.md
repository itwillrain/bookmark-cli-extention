---
editUrl: false
next: false
prev: false
title: createChromeHistoryRepository
slug: 1.2.0/api/infrastructure/chrome/history-adapter/functions/createchromehistoryrepository
---

> **createChromeHistoryRepository**(`historyApi`): [`BrowserHistoryRepositoryPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [infrastructure/chrome/history-adapter.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/history-adapter.ts#L64)

Chrome History APIをApplication層のhistory repository portへ変換。

## Parameters

### historyApi

[`ChromeHistoryApi`](/1.2.0/api/infrastructure/chrome/history-adapter/interfaces/chromehistoryapi/)

Chrome History API。

## Returns

[`BrowserHistoryRepositoryPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Chrome履歴取得port。
