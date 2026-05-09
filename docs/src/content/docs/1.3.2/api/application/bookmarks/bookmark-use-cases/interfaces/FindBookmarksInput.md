---
editUrl: false
next: false
prev: false
title: FindBookmarksInput
slug: 1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/findbookmarksinput
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:131](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L131)

Bookmark候補検索の入力です。

## Properties

### historyRepository?

> `readonly` `optional` **historyRepository?**: [`BrowserHistoryRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:135](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L135)

Chrome履歴取得portです。

***

### query

> `readonly` **query**: `string`

Defined in: [application/bookmarks/bookmark-use-cases.ts:139](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L139)

検索queryです。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:143](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L143)

Bookmark Tree取得portです。

***

### virtualTagsByBookmarkId?

> `readonly` `optional` **virtualTagsByBookmarkId?**: `Readonly`\<`Record`\<`string`, readonly `string`\[]>>

Defined in: [application/bookmarks/bookmark-use-cases.ts:147](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L147)

Bookmark IDごとの仮想タグ一覧です。
