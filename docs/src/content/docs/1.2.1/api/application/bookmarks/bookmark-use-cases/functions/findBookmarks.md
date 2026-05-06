---
editUrl: false
next: false
prev: false
title: findBookmarks
slug: 1.2.1/api/application/bookmarks/bookmark-use-cases/functions/findbookmarks
---

> **findBookmarks**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`FindBookmarksValue`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/findbookmarksvalue/)>>

Defined in: [application/bookmarks/bookmark-use-cases.ts:347](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L347)

RepositoryからBookmark Treeを取得して検索します。

## Parameters

### input

[`FindBookmarksInput`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/findbookmarksinput/)

Bookmark候補検索の入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`FindBookmarksValue`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/findbookmarksvalue/)>>

Bookmark候補検索の結果です。

## Example

```ts
const result = await findBookmarks({
  query: "Stripe #finance",
  repository,
  virtualTagsByBookmarkId,
});
```
