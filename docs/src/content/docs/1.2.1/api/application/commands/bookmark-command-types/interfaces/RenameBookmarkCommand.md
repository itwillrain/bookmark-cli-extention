---
editUrl: false
next: false
prev: false
title: RenameBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:197](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L197)

Rename Bookmark commandです。

## Properties

### kind

> `readonly` **kind**: `"rename"`

Defined in: [application/commands/bookmark-command-types.ts:201](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L201)

Command種別です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:205](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L205)

対象の直前結果番号です。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:209](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L209)

変更後title入力です。
