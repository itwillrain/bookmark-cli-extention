---
editUrl: false
next: false
prev: false
title: CommandParseContext
slug: 1.2.0/api/application/commands/bookmark-command-factory/interfaces/commandparsecontext
---

Defined in: [application/commands/bookmark-command-factory.ts:97](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-factory.ts#L97)

Command parse contextです。

## Properties

### commandName

> `readonly` **commandName**: `string`

Defined in: [application/commands/bookmark-command-factory.ts:101](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-factory.ts#L101)

入力されたcommand名です。

***

### normalizedInput

> `readonly` **normalizedInput**: `string`

Defined in: [application/commands/bookmark-command-factory.ts:113](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-factory.ts#L113)

正規化済み入力です。

***

### query

> `readonly` **query**: `string`

Defined in: [application/commands/bookmark-command-factory.ts:105](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-factory.ts#L105)

Command名を除いたqueryです。

***

### queryParts

> `readonly` **queryParts**: readonly `string`\[]

Defined in: [application/commands/bookmark-command-factory.ts:109](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-factory.ts#L109)

Command名を除いたtoken一覧です。
