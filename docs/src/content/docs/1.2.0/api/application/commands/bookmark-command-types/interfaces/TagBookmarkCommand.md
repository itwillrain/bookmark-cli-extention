---
editUrl: false
next: false
prev: false
title: TagBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:117](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L117)

Virtual tag commandです。

## Properties

### kind

> `readonly` **kind**: `"tag"`

Defined in: [application/commands/bookmark-command-types.ts:121](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L121)

Command種別です。

***

### remove

> `readonly` **remove**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L125)

削除操作ならtrueです。

***

### tagInputs

> `readonly` **tagInputs**: readonly `string`\[]

Defined in: [application/commands/bookmark-command-types.ts:129](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L129)

仮想タグ入力一覧です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:133](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L133)

対象の直前結果番号です。
