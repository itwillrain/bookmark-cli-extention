---
editUrl: false
next: false
prev: false
title: parseRenameBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-organize-command-parser/functions/parserenamebookmarkcommand
---

> **parseRenameBookmarkCommand**(`queryParts`): [`RenameBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:220](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-organize-command-parser.ts#L220)

Rename commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`RenameBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand/)

Rename command。

## Example

```ts
const result = parseRenameBookmarkCommand(["1", "Stripe", "Dashboard"]);
// { kind: "rename", targetInput: "1", titleInput: "Stripe Dashboard" }
```
