---
editUrl: false
next: false
prev: false
title: RenameBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:193](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L193)

Rename Bookmark commandです。

## Properties

### kind

> `readonly` **kind**: `"rename"`

Defined in: [application/commands/bookmark-command-types.ts:197](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L197)

Command種別です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:201](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L201)

対象の直前結果番号です。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:205](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L205)

変更後title入力です。
