---
editUrl: false
next: false
prev: false
title: BookmarkSearchDocument
slug: 1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchdocument
---

Defined in: [domain/search/bookmark-search.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L48)

Fuse.jsへ渡すBookmark検索documentです。

## Properties

### entry

> `readonly` **entry**: [`SearchableBookmarkEntry`](/1.2.1/api/domain/search/bookmark-search/type-aliases/searchablebookmarkentry/)

Defined in: [domain/search/bookmark-search.ts:68](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L68)

元のBookmark Entryです。

***

### folderPath

> `readonly` **folderPath**: `string`

Defined in: [domain/search/bookmark-search.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L60)

Bookmarkが所属するfolder pathです。

***

### id

> `readonly` **id**: `string`

Defined in: [domain/search/bookmark-search.ts:52](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L52)

Chrome Bookmark Manager上のnode IDです。

***

### title

> `readonly` **title**: `string`

Defined in: [domain/search/bookmark-search.ts:56](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L56)

Bookmark titleです。

***

### url

> `readonly` **url**: `string`

Defined in: [domain/search/bookmark-search.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L64)

Bookmark URLです。
