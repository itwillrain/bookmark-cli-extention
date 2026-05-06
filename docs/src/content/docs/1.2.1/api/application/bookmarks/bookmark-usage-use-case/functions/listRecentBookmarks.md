---
editUrl: false
next: false
prev: false
title: listRecentBookmarks
slug: 1.2.1/api/application/bookmarks/bookmark-usage-use-case/functions/listrecentbookmarks
---

> **listRecentBookmarks**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`UsageBookmarksValue`](/1.2.1/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksvalue/)>>

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-usage-use-case.ts#L61)

最近開いたBookmarkを取得。

## Parameters

### input

[`UsageBookmarksInput`](/1.2.1/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksinput/)

利用統計Bookmark一覧入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`UsageBookmarksValue`](/1.2.1/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksvalue/)>>

最近開いたBookmark一覧結果。

## Example

```ts
const result = await listRecentBookmarks({
  limit: 10,
  repository,
  usageByBookmarkId,
});
```
