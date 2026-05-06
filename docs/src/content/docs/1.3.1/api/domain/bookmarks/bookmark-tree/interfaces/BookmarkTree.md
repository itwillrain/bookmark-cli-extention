---
editUrl: false
next: false
prev: false
title: BookmarkTree
slug: 1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree
---

Defined in: [domain/bookmarks/bookmark-tree.ts:100](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/bookmarks/bookmark-tree.ts#L100)

正規化済みBookmark Treeです。

## Properties

### bookmarks

> `readonly` **bookmarks**: readonly [`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/bookmarks/bookmark-tree.ts:116](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/bookmarks/bookmark-tree.ts#L116)

Bookmarkだけを巡回順に並べた一覧です。

***

### entries

> `readonly` **entries**: readonly [`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/bookmarks/bookmark-tree.ts:108](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/bookmarks/bookmark-tree.ts#L108)

Bookmarkとfolderを巡回順に並べた一覧です。

***

### folders

> `readonly` **folders**: readonly [`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/bookmarks/bookmark-tree.ts:112](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/bookmarks/bookmark-tree.ts#L112)

Folderだけを巡回順に並べた一覧です。

***

### rootBookmarkParentId?

> `readonly` `optional` **rootBookmarkParentId?**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:104](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/bookmarks/bookmark-tree.ts#L104)

疑似CLI rootへ新規作成または移動するときに使うbrowser root直下container IDです。
