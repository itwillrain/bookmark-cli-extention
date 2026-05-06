---
editUrl: false
next: false
prev: false
title: searchBookmarks
slug: 1.3.1/api/domain/search/bookmark-search/functions/searchbookmarks
---

> **searchBookmarks**(`entries`, `query`): readonly [`BookmarkSearchResult`](/1.3.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

Defined in: [domain/search/bookmark-search.ts:422](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L422)

Bookmark Entry一覧をFuse.jsで検索します。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

検索対象のBookmark Entry一覧です。

### query

`string`

検索queryです。

## Returns

readonly [`BookmarkSearchResult`](/1.3.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

検索結果一覧です。

## Example

```ts
const result = searchBookmarks(bookmarkTree.entries, "Stripe #finance");
```
