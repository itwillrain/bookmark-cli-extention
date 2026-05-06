---
editUrl: false
next: false
prev: false
title: doesFolderPathExist
slug: 1.2.1/api/domain/bookmarks/bookmark-directory/functions/doesfolderpathexist
---

> **doesFolderPathExist**(`bookmarkTree`, `folderPath`): `boolean`

Defined in: [domain/bookmarks/bookmark-directory.ts:167](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-directory.ts#L167)

Bookmark Tree内にfolder pathが存在するかを判定します。

## Parameters

### bookmarkTree

[`BookmarkTree`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

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
