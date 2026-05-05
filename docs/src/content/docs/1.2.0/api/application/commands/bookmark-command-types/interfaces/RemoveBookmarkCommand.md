---
editUrl: false
next: false
prev: false
title: RemoveBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:171](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L171)

Remove Bookmark commandです。

## Properties

### force

> `readonly` **force**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:175](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L175)

確認なしで削除するかです。

***

### kind

> `readonly` **kind**: `"rm"`

Defined in: [application/commands/bookmark-command-types.ts:179](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L179)

Command種別です。

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:183](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L183)

Folder配下も再帰的に削除するかです。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:187](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L187)

対象の直前結果番号です。
