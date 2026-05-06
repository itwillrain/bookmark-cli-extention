---
editUrl: false
next: false
prev: false
title: normalizeBookmarkTree
slug: 1.3.0/api/domain/bookmarks/bookmark-tree/functions/normalizebookmarktree
---

> **normalizeBookmarkTree**(`nodes`): [`BookmarkTree`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

Defined in: [domain/bookmarks/bookmark-tree.ts:394](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/bookmarks/bookmark-tree.ts#L394)

Chrome Bookmark Treeを疑似CLI向けの平坦なBookmark Treeへ正規化します。

## Parameters

### nodes

readonly [`RawBookmarkTreeNode`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)\[]

Chrome Bookmarks API由来のroot node一覧です。

## Returns

[`BookmarkTree`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

正規化済みBookmark Treeです。

## Example

```ts
const result = normalizeBookmarkTree(chromeBookmarkTreeNodes);
```
