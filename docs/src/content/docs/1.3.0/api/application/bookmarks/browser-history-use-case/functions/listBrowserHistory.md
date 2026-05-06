---
editUrl: false
next: false
prev: false
title: listBrowserHistory
slug: 1.3.0/api/application/bookmarks/browser-history-use-case/functions/listbrowserhistory
---

> **listBrowserHistory**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListBrowserHistoryValue`](/1.3.0/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryvalue/)>>

Defined in: [application/bookmarks/browser-history-use-case.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/browser-history-use-case.ts#L61)

Chrome閲覧履歴を取得。

## Parameters

### input

[`ListBrowserHistoryInput`](/1.3.0/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryinput/)

Chrome閲覧履歴一覧入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListBrowserHistoryValue`](/1.3.0/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryvalue/)>>

Chrome閲覧履歴一覧結果。

## Example

```ts
const result = await listBrowserHistory({
  historyRepository,
  limit: 25,
  query: "Stripe",
});
```
