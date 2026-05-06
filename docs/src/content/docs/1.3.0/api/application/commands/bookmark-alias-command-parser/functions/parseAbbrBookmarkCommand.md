---
editUrl: false
next: false
prev: false
title: parseAbbrBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-alias-command-parser/functions/parseabbrbookmarkcommand
---

> **parseAbbrBookmarkCommand**(`query`): [`AbbrBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/abbrbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:161](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-alias-command-parser.ts#L161)

Abbr commandを解析します。

## Parameters

### query

`string`

command名を除いた入力です。

## Returns

[`AbbrBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/abbrbookmarkcommand/)

Abbr commandです。

## Example

```ts
const result = parseAbbrBookmarkCommand("c=clear");
// { kind: "abbr", operation: "set", abbreviationName: "c", commandInput: "clear" }
```
