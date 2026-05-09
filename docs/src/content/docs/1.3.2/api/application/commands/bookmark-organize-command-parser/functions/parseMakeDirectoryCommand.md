---
editUrl: false
next: false
prev: false
title: parseMakeDirectoryCommand
slug: 1.3.2/api/application/commands/bookmark-organize-command-parser/functions/parsemakedirectorycommand
---

> **parseMakeDirectoryCommand**(`queryParts`): [`MakeDirectoryCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/makedirectorycommand/)

Defined in: [application/commands/bookmark-organize-command-parser.ts:165](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-organize-command-parser.ts#L165)

Mkdir commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`MakeDirectoryCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/makedirectorycommand/)

Mkdir command。

## Example

```ts
const result = parseMakeDirectoryCommand(["./Work/Admin"]);
// { kind: "mkdir", pathInput: "./Work/Admin" }
```
