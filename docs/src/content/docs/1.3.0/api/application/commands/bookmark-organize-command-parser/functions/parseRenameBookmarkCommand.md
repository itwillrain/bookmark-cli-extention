---
editUrl: false
next: false
prev: false
title: parseRenameBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-organize-command-parser/functions/parserenamebookmarkcommand
---

> **parseRenameBookmarkCommand**(`queryParts`): [`RenameBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:220](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-organize-command-parser.ts#L220)

Rename commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`RenameBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand/)

Rename command。

## Example

```ts
const result = parseRenameBookmarkCommand(["1", "Stripe", "Dashboard"]);
// { kind: "rename", targetInput: "1", titleInput: "Stripe Dashboard" }
```
