---
editUrl: false
next: false
prev: false
title: listFrequentBookmarks
slug: 1.3.2/api/application/bookmarks/bookmark-usage-use-case/functions/listfrequentbookmarks
---

> **listFrequentBookmarks**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`UsageBookmarksValue`](/1.3.2/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksvalue/)>>

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:87](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-usage-use-case.ts#L87)

よく開くBookmarkを取得。

## Parameters

### input

[`UsageBookmarksInput`](/1.3.2/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksinput/)

利用統計Bookmark一覧入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`UsageBookmarksValue`](/1.3.2/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksvalue/)>>

よく開くBookmark一覧結果。

## Example

```ts
const result = await listFrequentBookmarks({
  limit: 10,
  repository,
  usageByBookmarkId,
});
```
