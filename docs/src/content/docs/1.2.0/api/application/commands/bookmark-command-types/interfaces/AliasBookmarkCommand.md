---
editUrl: false
next: false
prev: false
title: AliasBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:250](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L250)

Command alias設定commandです。

## Properties

### aliasName

> `readonly` **aliasName**: `string`

Defined in: [application/commands/bookmark-command-types.ts:254](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L254)

Alias名です。

***

### commandInput

> `readonly` **commandInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:258](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L258)

展開後command入力です。

***

### kind

> `readonly` **kind**: `"alias"`

Defined in: [application/commands/bookmark-command-types.ts:262](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L262)

Command種別です。

***

### operation

> `readonly` **operation**: [`AliasBookmarkCommandOperation`](/1.2.0/api/application/commands/bookmark-command-types/type-aliases/aliasbookmarkcommandoperation/)

Defined in: [application/commands/bookmark-command-types.ts:266](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L266)

Alias操作種別です。
