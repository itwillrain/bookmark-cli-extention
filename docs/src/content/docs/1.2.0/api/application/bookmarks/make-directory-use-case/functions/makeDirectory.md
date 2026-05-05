---
editUrl: false
next: false
prev: false
title: makeDirectory
slug: 1.2.0/api/application/bookmarks/make-directory-use-case/functions/makedirectory
---

> **makeDirectory**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/make-directory-use-case.ts:95](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/make-directory-use-case.ts#L95)

Folderを作成。

## Parameters

### input

[`MakeDirectoryInput`](/1.2.0/api/application/bookmarks/make-directory-use-case/interfaces/makedirectoryinput/)

Folder作成use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

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
