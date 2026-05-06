---
editUrl: false
next: false
prev: false
title: listBookmarkTreeViewEntriesWithOptions
slug: 1.3.1/api/domain/bookmarks/bookmark-tree-view/functions/listbookmarktreeviewentrieswithoptions
---

> **listBookmarkTreeViewEntriesWithOptions**(`input`): readonly [`BookmarkTreeViewEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Defined in: [domain/bookmarks/bookmark-tree-view.ts:253](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/bookmarks/bookmark-tree-view.ts#L253)

指定directory配下のBookmark Treeをtree表示用flat listにします。

## Parameters

### input

[`ListBookmarkTreeViewEntriesInput`](/1.3.1/api/domain/bookmarks/bookmark-tree-view-options/interfaces/listbookmarktreeviewentriesinput/)

Bookmark Tree表示入力です。

## Returns

readonly [`BookmarkTreeViewEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

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
