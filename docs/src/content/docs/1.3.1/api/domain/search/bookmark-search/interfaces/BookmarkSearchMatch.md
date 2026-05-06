---
editUrl: false
next: false
prev: false
title: BookmarkSearchMatch
slug: 1.3.1/api/domain/search/bookmark-search/interfaces/bookmarksearchmatch
---

Defined in: [domain/search/bookmark-search.ts:79](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L79)

Bookmark検索で一致したfield情報です。

## Properties

### indices

> `readonly` **indices**: readonly [`BookmarkSearchMatchRange`](/1.3.1/api/domain/search/bookmark-search/type-aliases/bookmarksearchmatchrange/)\[]

Defined in: [domain/search/bookmark-search.ts:83](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L83)

一致範囲の一覧です。

***

### key?

> `readonly` `optional` **key?**: `string`

Defined in: [domain/search/bookmark-search.ts:87](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L87)

一致した検索keyです。

***

### refIndex?

> `readonly` `optional` **refIndex?**: `number`

Defined in: [domain/search/bookmark-search.ts:91](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L91)

配列要素の参照indexです。

***

### value?

> `readonly` `optional` **value?**: `string`

Defined in: [domain/search/bookmark-search.ts:95](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L95)

一致した値です。
