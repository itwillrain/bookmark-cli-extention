---
editUrl: false
next: false
prev: false
title: CommandParseContext
slug: 1.3.0/api/application/commands/bookmark-command-factory/interfaces/commandparsecontext
---

Defined in: [application/commands/bookmark-command-factory.ts:109](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-factory.ts#L109)

Command parse contextです。

## Properties

### commandName

> `readonly` **commandName**: `string`

Defined in: [application/commands/bookmark-command-factory.ts:113](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-factory.ts#L113)

入力されたcommand名です。

***

### normalizedInput

> `readonly` **normalizedInput**: `string`

Defined in: [application/commands/bookmark-command-factory.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-factory.ts#L125)

正規化済み入力です。

***

### query

> `readonly` **query**: `string`

Defined in: [application/commands/bookmark-command-factory.ts:117](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-factory.ts#L117)

Command名を除いたqueryです。

***

### queryParts

> `readonly` **queryParts**: readonly `string`\[]

Defined in: [application/commands/bookmark-command-factory.ts:121](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-factory.ts#L121)

Command名を除いたtoken一覧です。
