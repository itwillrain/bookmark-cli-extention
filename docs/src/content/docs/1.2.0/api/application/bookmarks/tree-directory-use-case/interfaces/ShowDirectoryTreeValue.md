---
editUrl: false
next: false
prev: false
title: ShowDirectoryTreeValue
slug: 1.2.0/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreevalue
---

Defined in: [application/bookmarks/tree-directory-use-case.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/tree-directory-use-case.ts#L39)

Directory tree表示の成功値です。

## Properties

### directoryPath

> `readonly` **directoryPath**: `string`

Defined in: [application/bookmarks/tree-directory-use-case.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/tree-directory-use-case.ts#L43)

表示対象directory pathです。

***

### entries

> `readonly` **entries**: readonly [`BookmarkTreeViewEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Defined in: [application/bookmarks/tree-directory-use-case.ts:47](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/tree-directory-use-case.ts#L47)

Tree表示用entry一覧です。
