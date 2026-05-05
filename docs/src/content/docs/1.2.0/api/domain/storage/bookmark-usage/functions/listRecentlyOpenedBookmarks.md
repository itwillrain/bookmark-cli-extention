---
editUrl: false
next: false
prev: false
title: listRecentlyOpenedBookmarks
slug: 1.2.0/api/domain/storage/bookmark-usage/functions/listrecentlyopenedbookmarks
---

> **listRecentlyOpenedBookmarks**(`input`): readonly [`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/storage/bookmark-usage.ts:181](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/bookmark-usage.ts#L181)

最近開いたBookmarkを取得。

## Parameters

### input

[`ListUsageBookmarksInput`](/1.2.0/api/domain/storage/bookmark-usage/interfaces/listusagebookmarksinput/)

Bookmark利用統計一覧入力。

## Returns

readonly [`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

最近開いたBookmark一覧。

## Example

```ts
const result = listRecentlyOpenedBookmarks({
  bookmarks,
  resultLimit: 5,
  usageByBookmarkId,
});
```
