---
editUrl: false
next: false
prev: false
title: SearchableBookmarkEntry
slug: 1.3.0/api/domain/search/bookmark-search/type-aliases/searchablebookmarkentry
---

> **SearchableBookmarkEntry** = [`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/) & `object`

Defined in: [domain/search/bookmark-search.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/search/bookmark-search.ts#L11)

URLを持つBookmark Entryです。

## Type Declaration

### kind

> `readonly` **kind**: `"bookmark"`

Bookmark種別です。

### url

> `readonly` **url**: `string`

Bookmark URLです。
