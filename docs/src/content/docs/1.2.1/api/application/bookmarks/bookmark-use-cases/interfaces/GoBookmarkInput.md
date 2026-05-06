---
editUrl: false
next: false
prev: false
title: GoBookmarkInput
slug: 1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/gobookmarkinput
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L153)

Bookmarkを開く入力です。

## Properties

### historyRepository?

> `readonly` `optional` **historyRepository?**: [`BrowserHistoryRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:157](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L157)

Chrome履歴取得portです。

***

### lastResultEntries?

> `readonly` `optional` **lastResultEntries?**: readonly [`BookmarkCliEntry`](/1.2.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [application/bookmarks/bookmark-use-cases.ts:161](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L161)

直前結果一覧です。

***

### opener

> `readonly` **opener**: [`BookmarkOpenerPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:165](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L165)

Bookmark URLを開くportです。

***

### query

> `readonly` **query**: `string`

Defined in: [application/bookmarks/bookmark-use-cases.ts:169](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L169)

検索queryです。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:173](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L173)

Bookmark Tree取得portです。

***

### virtualTagsByBookmarkId?

> `readonly` `optional` **virtualTagsByBookmarkId?**: `Readonly`\<`Record`\<`string`, readonly `string`\[]>>

Defined in: [application/bookmarks/bookmark-use-cases.ts:177](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L177)

Bookmark IDごとの仮想タグ一覧です。
