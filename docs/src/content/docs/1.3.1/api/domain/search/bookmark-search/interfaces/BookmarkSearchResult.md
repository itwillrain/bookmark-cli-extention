---
editUrl: false
next: false
prev: false
title: BookmarkSearchResult
slug: 1.3.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult
---

Defined in: [domain/search/bookmark-search.ts:101](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L101)

Bookmark検索結果です。

## Properties

### entry

> `readonly` **entry**: [`SearchableEntry`](/1.3.1/api/domain/search/bookmark-search/type-aliases/searchableentry/)

Defined in: [domain/search/bookmark-search.ts:105](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L105)

検索に一致したEntryです。

***

### matches

> `readonly` **matches**: readonly [`BookmarkSearchMatch`](/1.3.1/api/domain/search/bookmark-search/interfaces/bookmarksearchmatch/)\[]

Defined in: [domain/search/bookmark-search.ts:113](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L113)

Fuse.jsが返したmatch情報です。

***

### score

> `readonly` **score**: `number`

Defined in: [domain/search/bookmark-search.ts:109](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L109)

CLI表示用の一致scoreです。
