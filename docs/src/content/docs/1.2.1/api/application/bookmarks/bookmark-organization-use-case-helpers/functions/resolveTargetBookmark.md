---
editUrl: false
next: false
prev: false
title: resolveTargetBookmark
slug: 1.2.1/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/resolvetargetbookmark
---

> **resolveTargetBookmark**(`lastResultEntries`, `targetInput`): [`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:171](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L171)

直前結果番号からBookmarkを解決。

## Parameters

### lastResultEntries

readonly [`BookmarkCliEntry`](/1.2.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

直前結果一覧。

### targetInput

`string`

対象番号入力。

## Returns

[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Bookmark解決結果。

## Example

```ts
const result = resolveTargetBookmark(lastResultEntries, targetInput);
```
