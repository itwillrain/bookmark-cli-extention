---
editUrl: false
next: false
prev: false
title: listFrequentBookmarks
slug: 1.2.0/api/application/bookmarks/bookmark-usage-use-case/functions/listfrequentbookmarks
---

> **listFrequentBookmarks**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`UsageBookmarksValue`](/1.2.0/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksvalue/)>>

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:87](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-usage-use-case.ts#L87)

よく開くBookmarkを取得。

## Parameters

### input

[`UsageBookmarksInput`](/1.2.0/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksinput/)

利用統計Bookmark一覧入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`UsageBookmarksValue`](/1.2.0/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksvalue/)>>

よく開くBookmark一覧結果。

## Example

```ts
const result = await listFrequentBookmarks({
  limit: 10,
  repository,
  usageByBookmarkId,
});
```
