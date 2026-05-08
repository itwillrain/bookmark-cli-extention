---
editUrl: false
next: false
prev: false
title: goBookmark
slug: 1.3.2/api/application/bookmarks/bookmark-use-cases/functions/gobookmark
---

> **goBookmark**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkSearchResult`](/1.3.2/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)>>

Defined in: [application/bookmarks/bookmark-use-cases.ts:385](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L385)

最上位のBookmark候補を開きます。

## Parameters

### input

[`GoBookmarkInput`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/gobookmarkinput/)

Bookmarkを開く入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkSearchResult`](/1.3.2/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)>>

Bookmarkを開いた結果です。

## Example

```ts
const result = await goBookmark({
  opener,
  query: "Stripe Dashboard",
  repository,
});
```
