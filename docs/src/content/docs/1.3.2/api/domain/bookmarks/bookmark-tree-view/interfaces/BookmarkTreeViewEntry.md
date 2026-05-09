---
editUrl: false
next: false
prev: false
title: BookmarkTreeViewEntry
slug: 1.3.2/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry
---

Defined in: [domain/bookmarks/bookmark-tree-view.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree-view.ts#L62)

Bookmark Treeをtree表示するためのflat entryです。

## Properties

### depth

> `readonly` **depth**: `number`

Defined in: [domain/bookmarks/bookmark-tree-view.ts:66](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree-view.ts#L66)

表示上の階層です。

***

### entry

> `readonly` **entry**: [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)

Defined in: [domain/bookmarks/bookmark-tree-view.ts:70](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree-view.ts#L70)

表示するBookmark entryです。

***

### guide

> `readonly` **guide**: `string`

Defined in: [domain/bookmarks/bookmark-tree-view.ts:74](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree-view.ts#L74)

Tree commandでtitle前に表示するguideです。
