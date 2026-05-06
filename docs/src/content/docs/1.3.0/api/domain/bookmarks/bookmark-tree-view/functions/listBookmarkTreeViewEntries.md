---
editUrl: false
next: false
prev: false
title: listBookmarkTreeViewEntries
slug: 1.3.0/api/domain/bookmarks/bookmark-tree-view/functions/listbookmarktreeviewentries
---

> **listBookmarkTreeViewEntries**(`bookmarkTree`, `directoryPath`, `maxDepth`): readonly [`BookmarkTreeViewEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Defined in: [domain/bookmarks/bookmark-tree-view.ts:283](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/bookmarks/bookmark-tree-view.ts#L283)

指定directory配下のBookmark Treeを標準optionでtree表示用flat listにします。

## Parameters

### bookmarkTree

[`BookmarkTree`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

対象のBookmark Treeです。

### directoryPath

`string`

起点directory pathです。

### maxDepth

`number`

表示する最大depthです。

## Returns

readonly [`BookmarkTreeViewEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Tree表示用flat listです。

## Example

```ts
const result = listBookmarkTreeViewEntries(bookmarkTree, "/Work", 2);
```
