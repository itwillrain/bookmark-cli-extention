---
editUrl: false
next: false
prev: false
title: parseMarkBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-mark-command-parser/functions/parsemarkbookmarkcommand
---

> **parseMarkBookmarkCommand**(`queryParts`): [`MarkBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/markbookmarkcommand/)

Defined in: [application/commands/bookmark-mark-command-parser.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-mark-command-parser.ts#L99)

Mark commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`MarkBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/markbookmarkcommand/)

Mark command。

## Example

```ts
const result = parseMarkBookmarkCommand(["--to", "./Work", "Stripe"]);
// { kind: "mark", targetFolderPathInput: "./Work", titleInput: "Stripe", allowDuplicate: false }
```
