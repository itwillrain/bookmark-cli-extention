---
editUrl: false
next: false
prev: false
title: parseAliasBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-alias-command-parser/functions/parsealiasbookmarkcommand
---

> **parseAliasBookmarkCommand**(`query`): [`AliasBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:141](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-alias-command-parser.ts#L141)

Alias commandを解析します。

## Parameters

### query

`string`

command名を除いた入力です。

## Returns

[`AliasBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand/)

Alias commandです。

## Example

```ts
const result = parseAliasBookmarkCommand("c=clear");
// { kind: "alias", operation: "set", aliasName: "c", commandInput: "clear" }
```
