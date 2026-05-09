---
editUrl: false
next: false
prev: false
title: parseRemoveBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-organize-command-parser/functions/parseremovebookmarkcommand
---

> **parseRemoveBookmarkCommand**(`queryParts`): [`RemoveBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:201](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-organize-command-parser.ts#L201)

Rm commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`RemoveBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand/)

Rm command。

## Example

```ts
const result = parseRemoveBookmarkCommand(["-f", "3"]);
// { kind: "rm", force: true, recursive: false, targetInput: "3" }
```
