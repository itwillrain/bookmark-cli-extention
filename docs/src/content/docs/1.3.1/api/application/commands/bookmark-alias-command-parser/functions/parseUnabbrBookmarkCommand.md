---
editUrl: false
next: false
prev: false
title: parseUnabbrBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-alias-command-parser/functions/parseunabbrbookmarkcommand
---

> **parseUnabbrBookmarkCommand**(`queryParts`): [`UnabbrBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/unabbrbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:198](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-alias-command-parser.ts#L198)

Unabbr commandを解析します。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`UnabbrBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/unabbrbookmarkcommand/)

Unabbr commandです。

## Example

```ts
const result = parseUnabbrBookmarkCommand(["c"]);
// { kind: "unabbr", abbreviationName: "c" }
```
