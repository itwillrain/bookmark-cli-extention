---
editUrl: false
next: false
prev: false
title: parseTagBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-tag-command-parser/functions/parsetagbookmarkcommand
---

> **parseTagBookmarkCommand**(`queryParts`): [`TagBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand/)

Defined in: [application/commands/bookmark-tag-command-parser.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-tag-command-parser.ts#L34)

Tag commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`TagBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand/)

Tag command。

## Example

```ts
const result = parseTagBookmarkCommand(["--remove", "2", "#prod"]);
// { kind: "tag", remove: true, targetInput: "2", tagInputs: ["#prod"] }
```
