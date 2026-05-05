---
editUrl: false
next: false
prev: false
title: ListUsageBookmarksInput
slug: 1.2.0/api/domain/storage/bookmark-usage/interfaces/listusagebookmarksinput
---

Defined in: [domain/storage/bookmark-usage.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/bookmark-usage.ts#L35)

Bookmark利用統計一覧入力。

## Properties

### bookmarks

> `readonly` **bookmarks**: readonly [`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/storage/bookmark-usage.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/bookmark-usage.ts#L37)

Bookmark entry一覧。

***

### resultLimit

> `readonly` **resultLimit**: `number`

Defined in: [domain/storage/bookmark-usage.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/bookmark-usage.ts#L39)

表示件数。

***

### usageByBookmarkId

> `readonly` **usageByBookmarkId**: [`UsageByBookmarkId`](/1.2.0/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

Defined in: [domain/storage/bookmark-usage.ts:41](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/bookmark-usage.ts#L41)

Bookmark IDごとの利用統計。
