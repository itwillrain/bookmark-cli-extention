---
editUrl: false
next: false
prev: false
title: makeDirectory
slug: 1.3.1/api/application/bookmarks/make-directory-use-case/functions/makedirectory
---

> **makeDirectory**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/make-directory-use-case.ts:95](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/make-directory-use-case.ts#L95)

Folderを作成。

## Parameters

### input

[`MakeDirectoryInput`](/1.3.1/api/application/bookmarks/make-directory-use-case/interfaces/makedirectoryinput/)

Folder作成use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

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
