---
editUrl: false
next: false
prev: false
title: createChromeHistoryRepository
slug: 1.3.2/api/infrastructure/chrome/history-adapter/functions/createchromehistoryrepository
---

> **createChromeHistoryRepository**(`historyApi`): [`BrowserHistoryRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [infrastructure/chrome/history-adapter.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/history-adapter.ts#L64)

Chrome History APIをApplication層のhistory repository portへ変換。

## Parameters

### historyApi

[`ChromeHistoryApi`](/1.3.2/api/infrastructure/chrome/history-adapter/interfaces/chromehistoryapi/)

Chrome History API。

## Returns

[`BrowserHistoryRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Chrome履歴取得port。
