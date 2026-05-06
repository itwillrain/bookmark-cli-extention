---
editUrl: false
next: false
prev: false
title: ShowDirectoryTreeValue
slug: 1.3.1/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreevalue
---

Defined in: [application/bookmarks/tree-directory-use-case.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/tree-directory-use-case.ts#L43)

Directory tree表示の成功値です。

## Properties

### directoryPath

> `readonly` **directoryPath**: `string`

Defined in: [application/bookmarks/tree-directory-use-case.ts:47](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/tree-directory-use-case.ts#L47)

表示対象directory pathです。

***

### entries

> `readonly` **entries**: readonly [`BookmarkTreeViewEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Defined in: [application/bookmarks/tree-directory-use-case.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/tree-directory-use-case.ts#L51)

Tree表示用entry一覧です。
