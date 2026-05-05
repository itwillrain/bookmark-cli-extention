---
editUrl: false
next: false
prev: false
title: parseAliasBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-alias-command-parser/functions/parsealiasbookmarkcommand
---

> **parseAliasBookmarkCommand**(`query`): [`AliasBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-alias-command-parser.ts#L99)

Alias commandを解析します。

## Parameters

### query

`string`

command名を除いた入力です。

## Returns

[`AliasBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand/)

Alias commandです。

## Example

```ts
const result = parseAliasBookmarkCommand("c=clear");
// { kind: "alias", operation: "set", aliasName: "c", commandInput: "clear" }
```
