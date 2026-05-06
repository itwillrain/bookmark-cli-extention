---
editUrl: false
next: false
prev: false
title: makeDirectory
slug: 1.3.0/api/application/bookmarks/make-directory-use-case/functions/makedirectory
---

> **makeDirectory**(`input`): `Promise`\<[`OrganizeBookmarkResult`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

Defined in: [application/bookmarks/make-directory-use-case.ts:95](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/make-directory-use-case.ts#L95)

Folderを作成。

## Parameters

### input

[`MakeDirectoryInput`](/1.3.0/api/application/bookmarks/make-directory-use-case/interfaces/makedirectoryinput/)

Folder作成use case入力。

## Returns

`Promise`\<[`OrganizeBookmarkResult`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/type-aliases/organizebookmarkresult/)>

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
