---
editUrl: false
next: false
prev: false
title: TagBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:121](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L121)

Virtual tag commandです。

## Properties

### kind

> `readonly` **kind**: `"tag"`

Defined in: [application/commands/bookmark-command-types.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L125)

Command種別です。

***

### remove

> `readonly` **remove**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:129](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L129)

削除操作ならtrueです。

***

### tagInputs

> `readonly` **tagInputs**: readonly `string`\[]

Defined in: [application/commands/bookmark-command-types.ts:133](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L133)

仮想タグ入力一覧です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:137](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L137)

対象の直前結果番号です。
