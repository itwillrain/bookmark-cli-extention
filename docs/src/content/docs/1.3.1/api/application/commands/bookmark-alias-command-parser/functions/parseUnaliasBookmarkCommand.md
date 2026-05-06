---
editUrl: false
next: false
prev: false
title: parseUnaliasBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-alias-command-parser/functions/parseunaliasbookmarkcommand
---

> **parseUnaliasBookmarkCommand**(`queryParts`): [`UnaliasBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:181](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-alias-command-parser.ts#L181)

Unalias commandを解析します。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`UnaliasBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Unalias commandです。

## Example

```ts
const result = parseUnaliasBookmarkCommand(["c"]);
// { kind: "unalias", aliasName: "c" }
```
