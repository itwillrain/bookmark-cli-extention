---
editUrl: false
next: false
prev: false
title: SearchableBookmarkEntry
slug: 1.2.0/api/domain/search/bookmark-search/type-aliases/searchablebookmarkentry
---

> **SearchableBookmarkEntry** = [`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/) & `object`

Defined in: [domain/search/bookmark-search.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/search/bookmark-search.ts#L11)

URLを持つBookmark Entryです。

## Type Declaration

### kind

> `readonly` **kind**: `"bookmark"`

Bookmark種別です。

### url

> `readonly` **url**: `string`

Bookmark URLです。
