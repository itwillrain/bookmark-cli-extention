---
editUrl: false
next: false
prev: false
title: parseUnaliasBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-alias-command-parser/functions/parseunaliasbookmarkcommand
---

> **parseUnaliasBookmarkCommand**(`queryParts`): [`UnaliasBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:181](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-alias-command-parser.ts#L181)

Unalias commandを解析します。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`UnaliasBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Unalias commandです。

## Example

```ts
const result = parseUnaliasBookmarkCommand(["c"]);
// { kind: "unalias", aliasName: "c" }
```
