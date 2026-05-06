---
editUrl: false
next: false
prev: false
title: parseUnaliasBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-alias-command-parser/functions/parseunaliasbookmarkcommand
---

> **parseUnaliasBookmarkCommand**(`queryParts`): [`UnaliasBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:119](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-alias-command-parser.ts#L119)

Unalias commandを解析します。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`UnaliasBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Unalias commandです。

## Example

```ts
const result = parseUnaliasBookmarkCommand(["c"]);
// { kind: "unalias", aliasName: "c" }
```
