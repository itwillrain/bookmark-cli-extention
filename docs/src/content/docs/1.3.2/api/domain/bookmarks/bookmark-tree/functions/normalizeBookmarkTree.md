---
editUrl: false
next: false
prev: false
title: normalizeBookmarkTree
slug: 1.3.2/api/domain/bookmarks/bookmark-tree/functions/normalizebookmarktree
---

> **normalizeBookmarkTree**(`nodes`): [`BookmarkTree`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

Defined in: [domain/bookmarks/bookmark-tree.ts:394](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L394)

Chrome Bookmark Treeを疑似CLI向けの平坦なBookmark Treeへ正規化します。

## Parameters

### nodes

readonly [`RawBookmarkTreeNode`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)\[]

Chrome Bookmarks API由来のroot node一覧です。

## Returns

[`BookmarkTree`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

正規化済みBookmark Treeです。

## Example

```ts
const result = normalizeBookmarkTree(chromeBookmarkTreeNodes);
```
