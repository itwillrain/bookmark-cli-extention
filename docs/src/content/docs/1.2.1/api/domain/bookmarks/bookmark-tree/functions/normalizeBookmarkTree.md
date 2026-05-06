---
editUrl: false
next: false
prev: false
title: normalizeBookmarkTree
slug: 1.2.1/api/domain/bookmarks/bookmark-tree/functions/normalizebookmarktree
---

> **normalizeBookmarkTree**(`nodes`): [`BookmarkTree`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

Defined in: [domain/bookmarks/bookmark-tree.ts:394](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree.ts#L394)

Chrome Bookmark Treeを疑似CLI向けの平坦なBookmark Treeへ正規化します。

## Parameters

### nodes

readonly [`RawBookmarkTreeNode`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)\[]

Chrome Bookmarks API由来のroot node一覧です。

## Returns

[`BookmarkTree`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

正規化済みBookmark Treeです。

## Example

```ts
const result = normalizeBookmarkTree(chromeBookmarkTreeNodes);
```
