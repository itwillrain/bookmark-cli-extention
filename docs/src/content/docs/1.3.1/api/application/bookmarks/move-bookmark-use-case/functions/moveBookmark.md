---
editUrl: false
next: false
prev: false
title: moveBookmark
slug: 1.3.1/api/application/bookmarks/move-bookmark-use-case/functions/movebookmark
---

> **moveBookmark**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/move-bookmark-use-case.ts:107](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/move-bookmark-use-case.ts#L107)

Bookmarkを移動。

## Parameters

### input

[`MoveBookmarkInput`](/1.3.1/api/application/bookmarks/move-bookmark-use-case/interfaces/movebookmarkinput/)

Bookmark移動use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

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
