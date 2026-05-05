---
editUrl: false
next: false
prev: false
title: listBookmarkTreeViewEntries
slug: 1.2.0/api/domain/bookmarks/bookmark-tree-view/functions/listbookmarktreeviewentries
---

> **listBookmarkTreeViewEntries**(`bookmarkTree`, `directoryPath`, `maxDepth`): readonly [`BookmarkTreeViewEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Defined in: [domain/bookmarks/bookmark-tree-view.ts:223](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/bookmarks/bookmark-tree-view.ts#L223)

指定directory配下のBookmark Treeをtree表示用flat listにします。

## Parameters

### bookmarkTree

[`BookmarkTree`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

対象のBookmark Treeです。

### directoryPath

`string`

起点directory pathです。

### maxDepth

`number`

表示する最大depthです。

## Returns

readonly [`BookmarkTreeViewEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Tree表示用flat listです。

## Example

```ts
const result = listBookmarkTreeViewEntries(bookmarkTree, "/Work", 2);
```
