---
editUrl: false
next: false
prev: false
title: removeBookmark
slug: 1.2.0/api/application/bookmarks/remove-bookmark-use-case/functions/removebookmark
---

> **removeBookmark**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:134](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/remove-bookmark-use-case.ts#L134)

Bookmarkを削除または確認待ち結果を返す。

## Parameters

### input

[`RemoveBookmarkInput`](/1.2.0/api/application/bookmarks/remove-bookmark-use-case/interfaces/removebookmarkinput/)

Bookmark削除use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Bookmark削除結果。

## Example

```ts
const result = await removeBookmark({
  currentDirectory: "/Work",
  force: false,
  lastResultEntries,
  organizer,
  recursive: false,
  repository,
  targetInput: "1",
});
```
