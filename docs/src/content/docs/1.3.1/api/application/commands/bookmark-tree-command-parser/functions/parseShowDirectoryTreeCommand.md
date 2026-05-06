---
editUrl: false
next: false
prev: false
title: parseShowDirectoryTreeCommand
slug: 1.3.1/api/application/commands/bookmark-tree-command-parser/functions/parseshowdirectorytreecommand
---

> **parseShowDirectoryTreeCommand**(`queryParts`): [`ShowDirectoryTreeCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/showdirectorytreecommand/)

Defined in: [application/commands/bookmark-tree-command-parser.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-tree-command-parser.ts#L153)

Tree commandを作ります。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧です。

## Returns

[`ShowDirectoryTreeCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/showdirectorytreecommand/)

Tree commandです。

## Example

```ts
const result = parseShowDirectoryTreeCommand(["--depth", "2", "./Work"]);
// { kind: "tree", depth: 2, pathInput: "./Work" }
```
