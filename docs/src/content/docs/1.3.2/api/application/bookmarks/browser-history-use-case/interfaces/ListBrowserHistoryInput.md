---
editUrl: false
next: false
prev: false
title: ListBrowserHistoryInput
slug: 1.3.2/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryinput
---

Defined in: [application/bookmarks/browser-history-use-case.ts:9](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/browser-history-use-case.ts#L9)

Chrome閲覧履歴一覧入力。

## Properties

### historyRepository?

> `readonly` `optional` **historyRepository?**: [`BrowserHistoryRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [application/bookmarks/browser-history-use-case.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/browser-history-use-case.ts#L11)

Chrome履歴取得port。

***

### limit?

> `readonly` `optional` **limit?**: `number`

Defined in: [application/bookmarks/browser-history-use-case.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/browser-history-use-case.ts#L13)

表示件数。

***

### query

> `readonly` **query**: `string`

Defined in: [application/bookmarks/browser-history-use-case.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/browser-history-use-case.ts#L15)

Chrome履歴検索query。
