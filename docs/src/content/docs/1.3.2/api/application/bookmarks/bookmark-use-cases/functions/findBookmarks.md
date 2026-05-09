---
editUrl: false
next: false
prev: false
title: findBookmarks
slug: 1.3.2/api/application/bookmarks/bookmark-use-cases/functions/findbookmarks
---

> **findBookmarks**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`FindBookmarksValue`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/findbookmarksvalue/)>>

Defined in: [application/bookmarks/bookmark-use-cases.ts:357](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L357)

RepositoryからBookmark Treeを取得して検索します。

## Parameters

### input

[`FindBookmarksInput`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/findbookmarksinput/)

Bookmark候補検索の入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`FindBookmarksValue`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/findbookmarksvalue/)>>

Bookmark候補検索の結果です。

## Example

```ts
const result = await findBookmarks({
  query: "Stripe #finance",
  repository,
  virtualTagsByBookmarkId,
});
```
