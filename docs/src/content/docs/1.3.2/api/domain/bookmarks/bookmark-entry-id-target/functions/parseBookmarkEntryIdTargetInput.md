---
editUrl: false
next: false
prev: false
title: parseBookmarkEntryIdTargetInput
slug: 1.3.2/api/domain/bookmarks/bookmark-entry-id-target/functions/parsebookmarkentryidtargetinput
---

> **parseBookmarkEntryIdTargetInput**(`targetInput`): `string` | `false`

Defined in: [domain/bookmarks/bookmark-entry-id-target.ts:32](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-entry-id-target.ts#L32)

Bookmark entry ID target入力からentry IDを取り出す。

## Parameters

### targetInput

`string`

対象入力。

## Returns

`string` | `false`

Entry ID、またはID targetでなければfalse。

## Example

```ts
const entryId = parseBookmarkEntryIdTargetInput("entry-id:42");
```
