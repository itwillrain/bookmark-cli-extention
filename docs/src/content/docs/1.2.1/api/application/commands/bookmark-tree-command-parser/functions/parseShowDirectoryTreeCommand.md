---
editUrl: false
next: false
prev: false
title: parseShowDirectoryTreeCommand
slug: 1.2.1/api/application/commands/bookmark-tree-command-parser/functions/parseshowdirectorytreecommand
---

> **parseShowDirectoryTreeCommand**(`queryParts`): [`ShowDirectoryTreeCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/showdirectorytreecommand/)

Defined in: [application/commands/bookmark-tree-command-parser.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-tree-command-parser.ts#L153)

Tree commandを作ります。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`ShowDirectoryTreeCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/showdirectorytreecommand/)

Tree commandです。

## Example

```ts
const result = parseShowDirectoryTreeCommand(["--depth", "2", "./Work"]);
// { kind: "tree", depth: 2, pathInput: "./Work" }
```
