---
editUrl: false
next: false
prev: false
title: createChromeHistoryRepository
slug: 1.2.1/api/infrastructure/chrome/history-adapter/functions/createchromehistoryrepository
---

> **createChromeHistoryRepository**(`historyApi`): [`BrowserHistoryRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [infrastructure/chrome/history-adapter.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/history-adapter.ts#L64)

Chrome History APIをApplication層のhistory repository portへ変換。

## Parameters

### historyApi

[`ChromeHistoryApi`](/1.2.1/api/infrastructure/chrome/history-adapter/interfaces/chromehistoryapi/)

Chrome History API。

## Returns

[`BrowserHistoryRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Chrome履歴取得port。
