---
editUrl: false
next: false
prev: false
title: SearchableBookmarkEntry
slug: 1.3.2/api/domain/search/bookmark-search/type-aliases/searchablebookmarkentry
---

> **SearchableBookmarkEntry** = [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/) & `object`

Defined in: [domain/search/bookmark-search.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/search/bookmark-search.ts#L11)

URLを持つBookmark Entryです。

## Type Declaration

### kind

> `readonly` **kind**: `"bookmark"`

Bookmark種別です。

### url

> `readonly` **url**: `string`

Bookmark URLです。
