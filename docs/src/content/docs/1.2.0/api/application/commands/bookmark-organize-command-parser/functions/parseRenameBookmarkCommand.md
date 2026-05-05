---
editUrl: false
next: false
prev: false
title: parseRenameBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-organize-command-parser/functions/parserenamebookmarkcommand
---

> **parseRenameBookmarkCommand**(`queryParts`): [`RenameBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:224](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-organize-command-parser.ts#L224)

Rename commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`RenameBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand/)

Rename command。

## Example

```ts
const result = parseRenameBookmarkCommand(["1", "Stripe", "Dashboard"]);
// { kind: "rename", targetInput: "1", titleInput: "Stripe Dashboard" }
```
