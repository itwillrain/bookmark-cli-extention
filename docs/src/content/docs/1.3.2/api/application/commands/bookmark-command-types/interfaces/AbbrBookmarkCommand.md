---
editUrl: false
next: false
prev: false
title: AbbrBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/abbrbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:338](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L338)

Command abbreviation設定commandです。

## Properties

### abbreviationName

> `readonly` **abbreviationName**: `string`

Defined in: [application/commands/bookmark-command-types.ts:342](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L342)

Abbreviation名です。

***

### commandInput

> `readonly` **commandInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:346](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L346)

展開後command入力です。

***

### kind

> `readonly` **kind**: `"abbr"`

Defined in: [application/commands/bookmark-command-types.ts:350](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L350)

Command種別です。

***

### operation

> `readonly` **operation**: [`AbbrBookmarkCommandOperation`](/1.3.2/api/application/commands/bookmark-command-types/type-aliases/abbrbookmarkcommandoperation/)

Defined in: [application/commands/bookmark-command-types.ts:354](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L354)

Abbreviation操作種別です。
