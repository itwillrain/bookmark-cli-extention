---
editUrl: false
next: false
prev: false
title: showDirectoryTree
slug: 1.2.0/api/application/bookmarks/tree-directory-use-case/functions/showdirectorytree
---

> **showDirectoryTree**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ShowDirectoryTreeValue`](/1.2.0/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreevalue/)>>

Defined in: [application/bookmarks/tree-directory-use-case.ts:90](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/tree-directory-use-case.ts#L90)

指定directory配下のBookmark Treeをtree表示用entry一覧にします。

## Parameters

### input

[`ShowDirectoryTreeInput`](/1.2.0/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreeinput/)

Directory tree表示の入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ShowDirectoryTreeValue`](/1.2.0/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreevalue/)>>

Directory tree表示の実行結果です。

## Example

```ts
const result = await showDirectoryTree({
  currentDirectory: "/Work",
  depth: 2,
  pathInput: "./Admin",
  repository,
});
```
