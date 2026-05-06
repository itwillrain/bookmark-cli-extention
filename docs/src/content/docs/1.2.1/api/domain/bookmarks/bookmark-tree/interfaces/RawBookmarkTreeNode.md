---
editUrl: false
next: false
prev: false
title: RawBookmarkTreeNode
slug: 1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode
---

Defined in: [domain/bookmarks/bookmark-tree.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree.ts#L19)

Chrome Bookmarks APIから受け取るnodeのうち、Domain層が必要とする最小shapeです。

## Properties

### children?

> `readonly` `optional` **children?**: readonly `RawBookmarkTreeNode`\[]

Defined in: [domain/bookmarks/bookmark-tree.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree.ts#L39)

子node一覧です。

***

### folderType?

> `readonly` `optional` **folderType?**: [`BookmarkFolderType`](/1.2.1/api/domain/bookmarks/bookmark-tree/type-aliases/bookmarkfoldertype/)

Defined in: [domain/bookmarks/bookmark-tree.ts:44](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree.ts#L44)

Browserが付与するtop-level folder種別です。

#### See

https://developer.chrome.com/docs/extensions/reference/api/bookmarks#type-FolderType

***

### id

> `readonly` **id**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree.ts#L23)

Chrome Bookmark Manager上のnode IDです。

***

### parentId?

> `readonly` `optional` **parentId?**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree.ts#L27)

親node IDです。

***

### title

> `readonly` **title**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree.ts#L31)

表示名です。

***

### url?

> `readonly` `optional` **url?**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/bookmark-tree.ts#L35)

Bookmark URLです。
