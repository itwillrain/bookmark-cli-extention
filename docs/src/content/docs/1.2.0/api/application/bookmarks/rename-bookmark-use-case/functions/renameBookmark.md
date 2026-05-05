---
editUrl: false
next: false
prev: false
title: renameBookmark
slug: 1.2.0/api/application/bookmarks/rename-bookmark-use-case/functions/renamebookmark
---

> **renameBookmark**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/rename-bookmark-use-case.ts:93](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/rename-bookmark-use-case.ts#L93)

Bookmark名を変更。

## Parameters

### input

[`RenameBookmarkInput`](/1.2.0/api/application/bookmarks/rename-bookmark-use-case/interfaces/renamebookmarkinput/)

Bookmark名称変更use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Bookmark名称変更結果。

## Example

```ts
const result = await renameBookmark({
  currentDirectory: "/Work",
  lastResultEntries,
  organizer,
  repository,
  targetInput: "1",
  titleInput: "Stripe Dashboard",
});
```
