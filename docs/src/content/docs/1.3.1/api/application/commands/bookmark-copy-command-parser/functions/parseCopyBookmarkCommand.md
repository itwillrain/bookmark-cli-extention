---
editUrl: false
next: false
prev: false
title: parseCopyBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-copy-command-parser/functions/parsecopybookmarkcommand
---

> **parseCopyBookmarkCommand**(`queryParts`): [`CopyBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/copybookmarkcommand/)

Defined in: [application/commands/bookmark-copy-command-parser.ts:119](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-copy-command-parser.ts#L119)

Copy commandを解析します。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`CopyBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/copybookmarkcommand/)

Copy commandです。

## Example

```ts
const result = parseCopyBookmarkCommand(["--path", "1"]);
// { kind: "copy", targetInput: "1", valueKind: "path" }
```
