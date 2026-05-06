---
editUrl: false
next: false
prev: false
title: parseListDirectoryCommand
slug: 1.2.1/api/application/commands/bookmark-list-command-parser/functions/parselistdirectorycommand
---

> **parseListDirectoryCommand**(`commandName`, `queryParts`): [`ListDirectoryCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/listdirectorycommand/)

Defined in: [application/commands/bookmark-list-command-parser.ts:183](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-list-command-parser.ts#L183)

Ls commandを作ります。

## Parameters

### commandName

`string`

入力されたcommand名です。

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`ListDirectoryCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/listdirectorycommand/)

Ls commandです。

## Example

```ts
const result = parseListDirectoryCommand("ll", ["-a", "./Work"]);
// { kind: "ls", options: { all: true, long: true }, pathInput: "./Work" }
```
