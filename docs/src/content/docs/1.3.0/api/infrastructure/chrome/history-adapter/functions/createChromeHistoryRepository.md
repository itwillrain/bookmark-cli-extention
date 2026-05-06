---
editUrl: false
next: false
prev: false
title: createChromeHistoryRepository
slug: 1.3.0/api/infrastructure/chrome/history-adapter/functions/createchromehistoryrepository
---

> **createChromeHistoryRepository**(`historyApi`): [`BrowserHistoryRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [infrastructure/chrome/history-adapter.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/history-adapter.ts#L64)

Chrome History APIをApplication層のhistory repository portへ変換。

## Parameters

### historyApi

[`ChromeHistoryApi`](/1.3.0/api/infrastructure/chrome/history-adapter/interfaces/chromehistoryapi/)

Chrome History API。

## Returns

[`BrowserHistoryRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Chrome履歴取得port。
