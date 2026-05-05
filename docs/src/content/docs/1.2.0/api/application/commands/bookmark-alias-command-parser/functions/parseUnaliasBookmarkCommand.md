---
editUrl: false
next: false
prev: false
title: parseUnaliasBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-alias-command-parser/functions/parseunaliasbookmarkcommand
---

> **parseUnaliasBookmarkCommand**(`queryParts`): [`UnaliasBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:119](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-alias-command-parser.ts#L119)

Unalias commandを解析します。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`UnaliasBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Unalias commandです。

## Example

```ts
const result = parseUnaliasBookmarkCommand(["c"]);
// { kind: "unalias", aliasName: "c" }
```
