---
editUrl: false
next: false
prev: false
title: listBrowserHistory
slug: 1.3.2/api/application/bookmarks/browser-history-use-case/functions/listbrowserhistory
---

> **listBrowserHistory**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListBrowserHistoryValue`](/1.3.2/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryvalue/)>>

Defined in: [application/bookmarks/browser-history-use-case.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/browser-history-use-case.ts#L61)

Chrome閲覧履歴を取得。

## Parameters

### input

[`ListBrowserHistoryInput`](/1.3.2/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryinput/)

Chrome閲覧履歴一覧入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListBrowserHistoryValue`](/1.3.2/api/application/bookmarks/browser-history-use-case/interfaces/listbrowserhistoryvalue/)>>

Chrome閲覧履歴一覧結果。

## Example

```ts
const result = await listBrowserHistory({
  historyRepository,
  limit: 25,
  query: "Stripe",
});
```
