---
editUrl: false
next: false
prev: false
title: parseUnaliasBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-alias-command-parser/functions/parseunaliasbookmarkcommand
---

> **parseUnaliasBookmarkCommand**(`queryParts`): [`UnaliasBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:181](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-alias-command-parser.ts#L181)

Unalias commandを解析します。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`UnaliasBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Unalias commandです。

## Example

```ts
const result = parseUnaliasBookmarkCommand(["c"]);
// { kind: "unalias", aliasName: "c" }
```
