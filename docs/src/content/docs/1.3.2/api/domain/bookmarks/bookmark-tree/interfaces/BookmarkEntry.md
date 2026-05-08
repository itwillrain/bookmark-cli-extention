---
editUrl: false
next: false
prev: false
title: BookmarkEntry
slug: 1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry
---

Defined in: [domain/bookmarks/bookmark-tree.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L62)

疑似CLIで扱うBookmarkまたはfolderの正規化済みentryです。

## Properties

### childrenCount

> `readonly` **childrenCount**: `number`

Defined in: [domain/bookmarks/bookmark-tree.ts:94](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L94)

直下の子node数です。

***

### folderPath

> `readonly` **folderPath**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:90](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L90)

疑似CLIで表示するfolder pathです。

***

### folderType?

> `readonly` `optional` **folderType?**: [`BookmarkFolderType`](/1.3.2/api/domain/bookmarks/bookmark-tree/type-aliases/bookmarkfoldertype/)

Defined in: [domain/bookmarks/bookmark-tree.ts:82](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L82)

Browserが付与するtop-level folder種別です。

***

### id

> `readonly` **id**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:66](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L66)

Chrome Bookmark Manager上のnode IDです。

***

### kind

> `readonly` **kind**: [`BookmarkEntryKind`](/1.3.2/api/domain/bookmarks/bookmark-tree/type-aliases/bookmarkentrykind/)

Defined in: [domain/bookmarks/bookmark-tree.ts:78](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L78)

Bookmarkまたはfolderを表す種別です。

***

### parentId

> `readonly` **parentId**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:70](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L70)

親node IDです。

***

### title

> `readonly` **title**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:74](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L74)

表示名です。

***

### url?

> `readonly` `optional` **url?**: `string`

Defined in: [domain/bookmarks/bookmark-tree.ts:86](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-tree.ts#L86)

Bookmark URLです。
