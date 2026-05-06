---
editUrl: false
next: false
prev: false
title: RecordBookmarkOpenedInput
slug: 1.3.0/api/domain/storage/bookmark-usage/interfaces/recordbookmarkopenedinput
---

Defined in: [domain/storage/bookmark-usage.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/bookmark-usage.ts#L25)

Bookmark利用統計記録入力。

## Properties

### bookmarkId

> `readonly` **bookmarkId**: `string`

Defined in: [domain/storage/bookmark-usage.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/bookmark-usage.ts#L27)

Bookmark ID。

***

### openedAt

> `readonly` **openedAt**: `string`

Defined in: [domain/storage/bookmark-usage.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/bookmark-usage.ts#L29)

開いた日時ISO文字列。

***

### usageByBookmarkId

> `readonly` **usageByBookmarkId**: [`UsageByBookmarkId`](/1.3.0/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

Defined in: [domain/storage/bookmark-usage.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/bookmark-usage.ts#L31)

Bookmark IDごとの利用統計。
