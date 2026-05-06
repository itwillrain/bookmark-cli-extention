---
editUrl: false
next: false
prev: false
title: parseRenameBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-organize-command-parser/functions/parserenamebookmarkcommand
---

> **parseRenameBookmarkCommand**(`queryParts`): [`RenameBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:220](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-organize-command-parser.ts#L220)

Rename commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`RenameBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand/)

Rename command。

## Example

```ts
const result = parseRenameBookmarkCommand(["1", "Stripe", "Dashboard"]);
// { kind: "rename", targetInput: "1", titleInput: "Stripe Dashboard" }
```
