---
editUrl: false
next: false
prev: false
title: renameBookmark
slug: 1.3.2/api/application/bookmarks/rename-bookmark-use-case/functions/renamebookmark
---

> **renameBookmark**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/rename-bookmark-use-case.ts:93](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/rename-bookmark-use-case.ts#L93)

Bookmark名を変更。

## Parameters

### input

[`RenameBookmarkInput`](/1.3.2/api/application/bookmarks/rename-bookmark-use-case/interfaces/renamebookmarkinput/)

Bookmark名称変更use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

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
