---
editUrl: false
next: false
prev: false
title: recordBookmarkOpened
slug: 1.2.0/api/domain/storage/bookmark-usage/functions/recordbookmarkopened
---

> **recordBookmarkOpened**(`input`): [`UsageByBookmarkId`](/1.2.0/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

Defined in: [domain/storage/bookmark-usage.ts:155](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/bookmark-usage.ts#L155)

Bookmarkを開いた利用統計を記録。

## Parameters

### input

[`RecordBookmarkOpenedInput`](/1.2.0/api/domain/storage/bookmark-usage/interfaces/recordbookmarkopenedinput/)

Bookmark利用統計記録入力。

## Returns

[`UsageByBookmarkId`](/1.2.0/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

更新後の利用統計。

## Example

```ts
const result = recordBookmarkOpened({
  bookmarkId: "bookmark-1",
  openedAt: "2026-05-05T00:00:00.000Z",
  usageByBookmarkId: {},
});
// { "bookmark-1": { openCount: 1, lastOpenedAt: "2026-05-05T00:00:00.000Z" } }
```
