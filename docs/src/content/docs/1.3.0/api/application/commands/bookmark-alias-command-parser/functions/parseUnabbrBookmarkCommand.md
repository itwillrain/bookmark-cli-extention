---
editUrl: false
next: false
prev: false
title: parseUnabbrBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-alias-command-parser/functions/parseunabbrbookmarkcommand
---

> **parseUnabbrBookmarkCommand**(`queryParts`): [`UnabbrBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/unabbrbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:198](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-alias-command-parser.ts#L198)

Unabbr commandを解析します。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`UnabbrBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/unabbrbookmarkcommand/)

Unabbr commandです。

## Example

```ts
const result = parseUnabbrBookmarkCommand(["c"]);
// { kind: "unabbr", abbreviationName: "c" }
```
