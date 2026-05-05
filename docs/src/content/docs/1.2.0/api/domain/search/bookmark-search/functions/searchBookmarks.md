---
editUrl: false
next: false
prev: false
title: searchBookmarks
slug: 1.2.0/api/domain/search/bookmark-search/functions/searchbookmarks
---

> **searchBookmarks**(`entries`, `query`): readonly [`BookmarkSearchResult`](/1.2.0/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

Defined in: [domain/search/bookmark-search.ts:422](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/search/bookmark-search.ts#L422)

Bookmark Entry一覧をFuse.jsで検索します。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

検索対象のBookmark Entry一覧です。

### query

`string`

検索queryです。

## Returns

readonly [`BookmarkSearchResult`](/1.2.0/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

検索結果一覧です。

## Example

```ts
const result = searchBookmarks(bookmarkTree.entries, "Stripe #finance");
```
