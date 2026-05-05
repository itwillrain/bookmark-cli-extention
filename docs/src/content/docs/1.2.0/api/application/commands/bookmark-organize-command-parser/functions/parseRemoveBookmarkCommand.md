---
editUrl: false
next: false
prev: false
title: parseRemoveBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-organize-command-parser/functions/parseremovebookmarkcommand
---

> **parseRemoveBookmarkCommand**(`queryParts`): [`RemoveBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:201](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-organize-command-parser.ts#L201)

Rm commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`RemoveBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand/)

Rm command。

## Example

```ts
const result = parseRemoveBookmarkCommand(["-f", "3"]);
// { kind: "rm", force: true, recursive: false, targetInput: "3" }
```
