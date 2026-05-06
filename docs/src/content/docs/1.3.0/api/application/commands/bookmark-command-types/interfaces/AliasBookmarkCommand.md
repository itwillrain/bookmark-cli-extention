---
editUrl: false
next: false
prev: false
title: AliasBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:298](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L298)

Command alias設定commandです。

## Properties

### aliasName

> `readonly` **aliasName**: `string`

Defined in: [application/commands/bookmark-command-types.ts:302](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L302)

Alias名です。

***

### commandInput

> `readonly` **commandInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:306](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L306)

展開後command入力です。

***

### kind

> `readonly` **kind**: `"alias"`

Defined in: [application/commands/bookmark-command-types.ts:310](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L310)

Command種別です。

***

### operation

> `readonly` **operation**: [`AliasBookmarkCommandOperation`](/1.3.0/api/application/commands/bookmark-command-types/type-aliases/aliasbookmarkcommandoperation/)

Defined in: [application/commands/bookmark-command-types.ts:314](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L314)

Alias操作種別です。
