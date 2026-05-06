---
editUrl: false
next: false
prev: false
title: listFrequentlyOpenedBookmarks
slug: 1.3.0/api/domain/storage/bookmark-usage/functions/listfrequentlyopenedbookmarks
---

> **listFrequentlyOpenedBookmarks**(`input`): readonly [`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/storage/bookmark-usage.ts:202](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/bookmark-usage.ts#L202)

よく開くBookmarkを取得。

## Parameters

### input

[`ListUsageBookmarksInput`](/1.3.0/api/domain/storage/bookmark-usage/interfaces/listusagebookmarksinput/)

Bookmark利用統計一覧入力。

## Returns

readonly [`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

よく開くBookmark一覧。

## Example

```ts
const result = listFrequentlyOpenedBookmarks({
  bookmarks,
  resultLimit: 5,
  usageByBookmarkId,
});
```
