---
editUrl: false
next: false
prev: false
title: goBookmark
slug: 1.2.1/api/application/bookmarks/bookmark-use-cases/functions/gobookmark
---

> **goBookmark**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkSearchResult`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)>>

Defined in: [application/bookmarks/bookmark-use-cases.ts:375](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L375)

最上位のBookmark候補を開きます。

## Parameters

### input

[`GoBookmarkInput`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/gobookmarkinput/)

Bookmarkを開く入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkSearchResult`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)>>

Bookmarkを開いた結果です。

## Example

```ts
const result = await goBookmark({
  opener,
  query: "Stripe Dashboard",
  repository,
});
```
