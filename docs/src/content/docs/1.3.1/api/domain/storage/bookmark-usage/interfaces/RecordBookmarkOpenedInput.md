---
editUrl: false
next: false
prev: false
title: RecordBookmarkOpenedInput
slug: 1.3.1/api/domain/storage/bookmark-usage/interfaces/recordbookmarkopenedinput
---

Defined in: [domain/storage/bookmark-usage.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/storage/bookmark-usage.ts#L25)

Bookmark利用統計記録入力。

## Properties

### bookmarkId

> `readonly` **bookmarkId**: `string`

Defined in: [domain/storage/bookmark-usage.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/storage/bookmark-usage.ts#L27)

Bookmark ID。

***

### openedAt

> `readonly` **openedAt**: `string`

Defined in: [domain/storage/bookmark-usage.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/storage/bookmark-usage.ts#L29)

開いた日時ISO文字列。

***

### usageByBookmarkId

> `readonly` **usageByBookmarkId**: [`UsageByBookmarkId`](/1.3.1/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

Defined in: [domain/storage/bookmark-usage.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/storage/bookmark-usage.ts#L31)

Bookmark IDごとの利用統計。
