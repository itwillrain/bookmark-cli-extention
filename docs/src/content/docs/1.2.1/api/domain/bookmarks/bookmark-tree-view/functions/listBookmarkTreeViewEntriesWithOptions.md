---
editUrl: false
next: false
prev: false
title: listBookmarkTreeViewEntriesWithOptions
slug: 1.2.1/api/domain/bookmarks/bookmark-tree-view/functions/listbookmarktreeviewentrieswithoptions
---

> **listBookmarkTreeViewEntriesWithOptions**(`input`): readonly [`BookmarkTreeViewEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Defined in: [domain/bookmarks/bookmark-tree-view.ts:253](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree-view.ts#L253)

指定directory配下のBookmark Treeをtree表示用flat listにします。

## Parameters

### input

[`ListBookmarkTreeViewEntriesInput`](/1.2.1/api/domain/bookmarks/bookmark-tree-view-options/interfaces/listbookmarktreeviewentriesinput/)

Bookmark Tree表示入力です。

## Returns

readonly [`BookmarkTreeViewEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Tree表示用flat listです。

## Example

```ts
const result = listBookmarkTreeViewEntriesWithOptions({
  bookmarkTree,
  directoryPath: "/Work",
  maxDepth: 2,
  options: { directoriesOnly: false },
});
```
