---
editUrl: false
next: false
prev: false
title: doesFolderPathExist
slug: 1.3.1/api/domain/bookmarks/bookmark-directory/functions/doesfolderpathexist
---

> **doesFolderPathExist**(`bookmarkTree`, `folderPath`): `boolean`

Defined in: [domain/bookmarks/bookmark-directory.ts:167](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/bookmarks/bookmark-directory.ts#L167)

Bookmark Tree内にfolder pathが存在するかを判定します。

## Parameters

### bookmarkTree

[`BookmarkTree`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

判定対象のBookmark Treeです。

### folderPath

`string`

判定するfolder pathです。

## Returns

`boolean`

folder pathが存在すればtrueです。

## Example

```ts
const result = doesFolderPathExist(bookmarkTree, "/Work/Admin");
```
