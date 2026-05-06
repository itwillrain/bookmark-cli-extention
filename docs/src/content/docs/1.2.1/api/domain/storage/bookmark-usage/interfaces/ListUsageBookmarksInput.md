---
editUrl: false
next: false
prev: false
title: ListUsageBookmarksInput
slug: 1.2.1/api/domain/storage/bookmark-usage/interfaces/listusagebookmarksinput
---

Defined in: [domain/storage/bookmark-usage.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/bookmark-usage.ts#L35)

Bookmark利用統計一覧入力。

## Properties

### bookmarks

> `readonly` **bookmarks**: readonly [`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/storage/bookmark-usage.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/bookmark-usage.ts#L37)

Bookmark entry一覧。

***

### resultLimit

> `readonly` **resultLimit**: `number`

Defined in: [domain/storage/bookmark-usage.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/bookmark-usage.ts#L39)

表示件数。

***

### usageByBookmarkId

> `readonly` **usageByBookmarkId**: [`UsageByBookmarkId`](/1.2.1/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

Defined in: [domain/storage/bookmark-usage.ts:41](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/bookmark-usage.ts#L41)

Bookmark IDごとの利用統計。
