---
editUrl: false
next: false
prev: false
title: listFrequentlyOpenedBookmarks
slug: 1.3.1/api/domain/storage/bookmark-usage/functions/listfrequentlyopenedbookmarks
---

> **listFrequentlyOpenedBookmarks**(`input`): readonly [`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/storage/bookmark-usage.ts:202](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/storage/bookmark-usage.ts#L202)

よく開くBookmarkを取得。

## Parameters

### input

[`ListUsageBookmarksInput`](/1.3.1/api/domain/storage/bookmark-usage/interfaces/listusagebookmarksinput/)

Bookmark利用統計一覧入力。

## Returns

readonly [`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

よく開くBookmark一覧。

## Example

```ts
const result = listFrequentlyOpenedBookmarks({
  bookmarks,
  resultLimit: 5,
  usageByBookmarkId,
});
```
