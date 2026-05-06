---
editUrl: false
next: false
prev: false
title: resolveTargetBookmark
slug: 1.3.0/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/resolvetargetbookmark
---

> **resolveTargetBookmark**(`lastResultEntries`, `targetInput`): [`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:171](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L171)

直前結果番号からBookmarkを解決。

## Parameters

### lastResultEntries

readonly [`BookmarkCliEntry`](/1.3.0/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

直前結果一覧。

### targetInput

`string`

対象番号入力。

## Returns

[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Bookmark解決結果。

## Example

```ts
const result = resolveTargetBookmark(lastResultEntries, targetInput);
```
