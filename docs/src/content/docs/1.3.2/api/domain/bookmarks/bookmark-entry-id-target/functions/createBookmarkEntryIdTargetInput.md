---
editUrl: false
next: false
prev: false
title: createBookmarkEntryIdTargetInput
slug: 1.3.2/api/domain/bookmarks/bookmark-entry-id-target/functions/createbookmarkentryidtargetinput
---

> **createBookmarkEntryIdTargetInput**(`entryId`): `string`

Defined in: [domain/bookmarks/bookmark-entry-id-target.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-entry-id-target.ts#L20)

Bookmark entry ID target入力を作成。

## Parameters

### entryId

`string`

Bookmark entry ID。

## Returns

`string`

Bookmark entry ID target入力。

## Example

```ts
const targetInput = createBookmarkEntryIdTargetInput("42");
// "entry-id:42"
```
