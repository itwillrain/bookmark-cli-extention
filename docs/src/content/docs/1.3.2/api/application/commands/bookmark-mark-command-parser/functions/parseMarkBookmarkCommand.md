---
editUrl: false
next: false
prev: false
title: parseMarkBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-mark-command-parser/functions/parsemarkbookmarkcommand
---

> **parseMarkBookmarkCommand**(`queryParts`): [`MarkBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/markbookmarkcommand/)

Defined in: [application/commands/bookmark-mark-command-parser.ts:114](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-mark-command-parser.ts#L114)

Mark commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`MarkBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/markbookmarkcommand/)

Mark command。

## Example

```ts
const result = parseMarkBookmarkCommand(["--to", "./Work", "Stripe"]);
// { kind: "mark", targetFolderPathInput: "./Work", titleInput: "Stripe", titleSpecified: true, allowDuplicate: false }
```
