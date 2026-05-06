---
editUrl: false
next: false
prev: false
title: FindBookmarksInput
slug: 1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/findbookmarksinput
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:121](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L121)

Bookmark候補検索の入力です。

## Properties

### historyRepository?

> `readonly` `optional` **historyRepository?**: [`BrowserHistoryRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L125)

Chrome履歴取得portです。

***

### query

> `readonly` **query**: `string`

Defined in: [application/bookmarks/bookmark-use-cases.ts:129](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L129)

検索queryです。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:133](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L133)

Bookmark Tree取得portです。

***

### virtualTagsByBookmarkId?

> `readonly` `optional` **virtualTagsByBookmarkId?**: `Readonly`\<`Record`\<`string`, readonly `string`\[]>>

Defined in: [application/bookmarks/bookmark-use-cases.ts:137](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L137)

Bookmark IDごとの仮想タグ一覧です。
