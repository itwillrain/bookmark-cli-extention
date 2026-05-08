---
editUrl: false
next: false
prev: false
title: AliasBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:302](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L302)

Command alias設定commandです。

## Properties

### aliasName

> `readonly` **aliasName**: `string`

Defined in: [application/commands/bookmark-command-types.ts:306](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L306)

Alias名です。

***

### commandInput

> `readonly` **commandInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:310](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L310)

展開後command入力です。

***

### kind

> `readonly` **kind**: `"alias"`

Defined in: [application/commands/bookmark-command-types.ts:314](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L314)

Command種別です。

***

### operation

> `readonly` **operation**: [`AliasBookmarkCommandOperation`](/1.3.2/api/application/commands/bookmark-command-types/type-aliases/aliasbookmarkcommandoperation/)

Defined in: [application/commands/bookmark-command-types.ts:318](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L318)

Alias操作種別です。
