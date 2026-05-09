---
editUrl: false
next: false
prev: false
title: parseListDirectoryCommand
slug: 1.3.2/api/application/commands/bookmark-list-command-parser/functions/parselistdirectorycommand
---

> **parseListDirectoryCommand**(`commandName`, `queryParts`): [`ListDirectoryCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/listdirectorycommand/)

Defined in: [application/commands/bookmark-list-command-parser.ts:183](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-list-command-parser.ts#L183)

Ls commandを作ります。

## Parameters

### commandName

`string`

入力されたcommand名です。

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`ListDirectoryCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/listdirectorycommand/)

Ls commandです。

## Example

```ts
const result = parseListDirectoryCommand("ll", ["-a", "./Work"]);
// { kind: "ls", options: { all: true, long: true }, pathInput: "./Work" }
```
