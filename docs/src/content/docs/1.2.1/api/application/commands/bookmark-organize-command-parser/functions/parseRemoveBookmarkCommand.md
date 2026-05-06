---
editUrl: false
next: false
prev: false
title: parseRemoveBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-organize-command-parser/functions/parseremovebookmarkcommand
---

> **parseRemoveBookmarkCommand**(`queryParts`): [`RemoveBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:201](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-organize-command-parser.ts#L201)

Rm commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`RemoveBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand/)

Rm command。

## Example

```ts
const result = parseRemoveBookmarkCommand(["-f", "3"]);
// { kind: "rm", force: true, recursive: false, targetInput: "3" }
```
