---
editUrl: false
next: false
prev: false
title: parseMoveBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-organize-command-parser/functions/parsemovebookmarkcommand
---

> **parseMoveBookmarkCommand**(`queryParts`): [`MoveBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:180](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-organize-command-parser.ts#L180)

Mv commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`MoveBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand/)

Mv command。

## Example

```ts
const result = parseMoveBookmarkCommand(["2", "../Finance"]);
// { kind: "mv", targetInput: "2", targetFolderPathInput: "../Finance" }
```
