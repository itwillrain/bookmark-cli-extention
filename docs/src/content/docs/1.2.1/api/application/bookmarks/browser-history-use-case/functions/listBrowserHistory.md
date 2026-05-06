---
editUrl: false
next: false
prev: false
title: listBrowserHistory
slug: 1.2.1/api/application/bookmarks/browser-history-use-case/functions/listbrowserhistory
---

> **listBrowserHistory**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListBrowserHistoryValue`](/1.2.1/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryvalue/)>>

Defined in: [application/bookmarks/browser-history-use-case.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/browser-history-use-case.ts#L61)

Chrome閲覧履歴を取得。

## Parameters

### input

[`ListBrowserHistoryInput`](/1.2.1/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryinput/)

Chrome閲覧履歴一覧入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListBrowserHistoryValue`](/1.2.1/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryvalue/)>>

Chrome閲覧履歴一覧結果。

## Example

```ts
const result = await listBrowserHistory({
  historyRepository,
  limit: 25,
  query: "Stripe",
});
```
