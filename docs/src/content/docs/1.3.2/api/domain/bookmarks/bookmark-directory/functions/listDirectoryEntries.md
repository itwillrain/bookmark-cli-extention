---
editUrl: false
next: false
prev: false
title: listDirectoryEntries
slug: 1.3.2/api/domain/bookmarks/bookmark-directory/functions/listdirectoryentries
---

> **listDirectoryEntries**(`bookmarkTree`, `directoryPath`, `options?`): readonly [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/bookmarks/bookmark-directory.ts:189](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/bookmark-directory.ts#L189)

指定directory直下のentry一覧をfolder-firstで取得します。

## Parameters

### bookmarkTree

[`BookmarkTree`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

対象のBookmark Treeです。

### directoryPath

`string`

directory pathです。

### options?

[`ListDirectoryEntriesOptions`](/1.3.2/api/domain/bookmarks/bookmark-directory/interfaces/listdirectoryentriesoptions/) = `defaultListDirectoryEntriesOptions`

Directory entry表示optionです。

## Returns

readonly [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

directory直下のentry一覧です。

## Example

```ts
const result = listDirectoryEntries(bookmarkTree, "/Work", { all: false });
```
