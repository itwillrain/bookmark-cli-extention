---
editUrl: false
next: false
prev: false
title: showDirectoryTree
slug: 1.2.1/api/application/bookmarks/tree-directory-use-case/functions/showdirectorytree
---

> **showDirectoryTree**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ShowDirectoryTreeValue`](/1.2.1/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreevalue/)>>

Defined in: [application/bookmarks/tree-directory-use-case.ts:94](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/tree-directory-use-case.ts#L94)

指定directory配下のBookmark Treeをtree表示用entry一覧にします。

## Parameters

### input

[`ShowDirectoryTreeInput`](/1.2.1/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreeinput/)

Directory tree表示の入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ShowDirectoryTreeValue`](/1.2.1/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreevalue/)>>

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
