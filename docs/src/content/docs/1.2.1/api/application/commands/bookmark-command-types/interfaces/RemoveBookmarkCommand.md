---
editUrl: false
next: false
prev: false
title: RemoveBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:175](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L175)

Remove Bookmark commandです。

## Properties

### force

> `readonly` **force**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:179](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L179)

確認なしで削除するかです。

***

### kind

> `readonly` **kind**: `"rm"`

Defined in: [application/commands/bookmark-command-types.ts:183](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L183)

Command種別です。

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:187](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L187)

Folder配下も再帰的に削除するかです。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:191](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L191)

対象の直前結果番号です。
