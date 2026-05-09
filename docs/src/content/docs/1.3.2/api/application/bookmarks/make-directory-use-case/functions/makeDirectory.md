---
editUrl: false
next: false
prev: false
title: makeDirectory
slug: 1.3.2/api/application/bookmarks/make-directory-use-case/functions/makedirectory
---

> **makeDirectory**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/make-directory-use-case.ts:95](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/make-directory-use-case.ts#L95)

Folderを作成。

## Parameters

### input

[`MakeDirectoryInput`](/1.3.2/api/application/bookmarks/make-directory-use-case/interfaces/makedirectoryinput/)

Folder作成use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Folder作成結果。

## Example

```ts
const result = await makeDirectory({
  currentDirectory: "/Work",
  organizer,
  pathInput: "./Admin",
  repository,
});
```
