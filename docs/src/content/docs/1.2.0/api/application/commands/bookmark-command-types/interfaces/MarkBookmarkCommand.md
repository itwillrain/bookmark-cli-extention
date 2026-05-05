---
editUrl: false
next: false
prev: false
title: MarkBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-command-types/interfaces/markbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:95](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L95)

Mark commandです。

## Properties

### allowDuplicate

> `readonly` **allowDuplicate**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L99)

重複URLの保存を許可するかです。

***

### kind

> `readonly` **kind**: `"mark"`

Defined in: [application/commands/bookmark-command-types.ts:103](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L103)

Command種別です。

***

### targetFolderPathInput

> `readonly` **targetFolderPathInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:107](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L107)

保存先folder path入力です。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:111](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L111)

Bookmark title入力です。
