---
editUrl: false
next: false
prev: false
title: parseMoveBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-organize-command-parser/functions/parsemovebookmarkcommand
---

> **parseMoveBookmarkCommand**(`queryParts`): [`MoveBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:180](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-organize-command-parser.ts#L180)

Mv commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`MoveBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand/)

Mv command。

## Example

```ts
const result = parseMoveBookmarkCommand(["2", "../Finance"]);
// { kind: "mv", targetInput: "2", targetFolderPathInput: "../Finance" }
```
