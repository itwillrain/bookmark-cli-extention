---
editUrl: false
next: false
prev: false
title: MarkBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-command-types/interfaces/markbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L99)

Mark commandです。

## Properties

### allowDuplicate

> `readonly` **allowDuplicate**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:103](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L103)

重複URLの保存を許可するかです。

***

### kind

> `readonly` **kind**: `"mark"`

Defined in: [application/commands/bookmark-command-types.ts:107](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L107)

Command種別です。

***

### targetFolderPathInput

> `readonly` **targetFolderPathInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:111](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L111)

保存先folder path入力です。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:115](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L115)

Bookmark title入力です。
