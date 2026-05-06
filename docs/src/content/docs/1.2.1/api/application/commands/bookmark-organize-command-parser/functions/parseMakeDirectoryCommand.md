---
editUrl: false
next: false
prev: false
title: parseMakeDirectoryCommand
slug: 1.2.1/api/application/commands/bookmark-organize-command-parser/functions/parsemakedirectorycommand
---

> **parseMakeDirectoryCommand**(`queryParts`): [`MakeDirectoryCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/makedirectorycommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:165](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-organize-command-parser.ts#L165)

Mkdir commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`MakeDirectoryCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/makedirectorycommand/)

Mkdir command。

## Example

```ts
const result = parseMakeDirectoryCommand(["./Work/Admin"]);
// { kind: "mkdir", pathInput: "./Work/Admin" }
```
