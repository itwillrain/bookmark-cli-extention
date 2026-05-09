---
editUrl: false
next: false
prev: false
title: ListDirectoryValue
slug: 1.3.2/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryvalue
---

Defined in: [application/bookmarks/directory-use-cases.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/directory-use-cases.ts#L48)

Directory listの成功値です。

## Properties

### directoryPath

> `readonly` **directoryPath**: `string`

Defined in: [application/bookmarks/directory-use-cases.ts:52](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/directory-use-cases.ts#L52)

表示対象directory pathです。

***

### entries

> `readonly` **entries**: readonly [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [application/bookmarks/directory-use-cases.ts:56](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/directory-use-cases.ts#L56)

Directory直下のentry一覧です。
