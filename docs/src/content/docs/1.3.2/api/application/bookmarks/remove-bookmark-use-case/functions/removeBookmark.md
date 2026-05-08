---
editUrl: false
next: false
prev: false
title: removeBookmark
slug: 1.3.2/api/application/bookmarks/remove-bookmark-use-case/functions/removebookmark
---

> **removeBookmark**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:265](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/remove-bookmark-use-case.ts#L265)

Bookmarkを削除または確認待ち結果を返す。

## Parameters

### input

[`RemoveBookmarkInput`](/1.3.2/api/application/bookmarks/remove-bookmark-use-case/interfaces/removebookmarkinput/)

Bookmark削除use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

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
