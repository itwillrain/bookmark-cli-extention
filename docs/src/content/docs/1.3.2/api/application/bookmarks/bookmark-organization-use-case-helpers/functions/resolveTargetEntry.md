---
editUrl: false
next: false
prev: false
title: resolveTargetEntry
slug: 1.3.2/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/resolvetargetentry
---

> **resolveTargetEntry**(`lastResultEntries`, `targetInput`): [`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:194](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L194)

直前結果番号からBookmark entryを解決。

## Parameters

### lastResultEntries

readonly [`BookmarkCliEntry`](/1.3.2/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

直前結果一覧。

### targetInput

`string`

対象番号入力。

## Returns

[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Entry解決結果。

## Example

```ts
const result = resolveTargetEntry(lastResultEntries, targetInput);
```
