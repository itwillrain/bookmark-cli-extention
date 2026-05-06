---
editUrl: false
next: false
prev: false
title: parseAbbrBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-alias-command-parser/functions/parseabbrbookmarkcommand
---

> **parseAbbrBookmarkCommand**(`query`): [`AbbrBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/abbrbookmarkcommand/)

Defined in: [application/commands/bookmark-alias-command-parser.ts:161](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-alias-command-parser.ts#L161)

Abbr commandを解析します。

## Parameters

### query

`string`

command名を除いた入力です。

## Returns

[`AbbrBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/abbrbookmarkcommand/)

Abbr commandです。

## Example

```ts
const result = parseAbbrBookmarkCommand("c=clear");
// { kind: "abbr", operation: "set", abbreviationName: "c", commandInput: "clear" }
```
