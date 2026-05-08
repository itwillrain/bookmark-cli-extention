---
editUrl: false
next: false
prev: false
title: GoBookmarkInput
slug: 1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/gobookmarkinput
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:163](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L163)

Bookmarkを開く入力です。

## Properties

### historyRepository?

> `readonly` `optional` **historyRepository?**: [`BrowserHistoryRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:167](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L167)

Chrome履歴取得portです。

***

### lastResultEntries?

> `readonly` `optional` **lastResultEntries?**: readonly [`BookmarkCliEntry`](/1.3.2/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [application/bookmarks/bookmark-use-cases.ts:171](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L171)

直前結果一覧です。

***

### opener

> `readonly` **opener**: [`BookmarkOpenerPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:175](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L175)

Bookmark URLを開くportです。

***

### query

> `readonly` **query**: `string`

Defined in: [application/bookmarks/bookmark-use-cases.ts:179](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L179)

検索queryです。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:183](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L183)

Bookmark Tree取得portです。

***

### virtualTagsByBookmarkId?

> `readonly` `optional` **virtualTagsByBookmarkId?**: `Readonly`\<`Record`\<`string`, readonly `string`\[]>>

Defined in: [application/bookmarks/bookmark-use-cases.ts:187](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L187)

Bookmark IDごとの仮想タグ一覧です。
