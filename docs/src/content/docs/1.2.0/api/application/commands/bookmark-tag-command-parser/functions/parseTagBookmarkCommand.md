---
editUrl: false
next: false
prev: false
title: parseTagBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-tag-command-parser/functions/parsetagbookmarkcommand
---

> **parseTagBookmarkCommand**(`queryParts`): [`TagBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand/)

Defined in: [application/commands/bookmark-tag-command-parser.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-tag-command-parser.ts#L34)

Tag commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`TagBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand/)

Tag command。

## Example

```ts
const result = parseTagBookmarkCommand(["--remove", "2", "#prod"]);
// { kind: "tag", remove: true, targetInput: "2", tagInputs: ["#prod"] }
```
