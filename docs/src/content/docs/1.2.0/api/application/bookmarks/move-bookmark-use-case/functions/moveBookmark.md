---
editUrl: false
next: false
prev: false
title: moveBookmark
slug: 1.2.0/api/application/bookmarks/move-bookmark-use-case/functions/movebookmark
---

> **moveBookmark**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/move-bookmark-use-case.ts:107](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/move-bookmark-use-case.ts#L107)

Bookmarkを移動。

## Parameters

### input

[`MoveBookmarkInput`](/1.2.0/api/application/bookmarks/move-bookmark-use-case/interfaces/movebookmarkinput/)

Bookmark移動use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Bookmark移動結果。

## Example

```ts
const result = await moveBookmark({
  currentDirectory: "/Work",
  lastResultEntries,
  organizer,
  repository,
  targetFolderPathInput: "../Finance",
  targetInput: "1",
});
```
