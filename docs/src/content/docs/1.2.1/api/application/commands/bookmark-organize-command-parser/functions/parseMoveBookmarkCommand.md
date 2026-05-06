---
editUrl: false
next: false
prev: false
title: parseMoveBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-organize-command-parser/functions/parsemovebookmarkcommand
---

> **parseMoveBookmarkCommand**(`queryParts`): [`MoveBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:180](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-organize-command-parser.ts#L180)

Mv commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`MoveBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand/)

Mv command。

## Example

```ts
const result = parseMoveBookmarkCommand(["2", "../Finance"]);
// { kind: "mv", targetInput: "2", targetFolderPathInput: "../Finance" }
```
