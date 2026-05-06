---
editUrl: false
next: false
prev: false
title: parseFrequentBookmarksCommand
slug: 1.2.1/api/application/commands/bookmark-usage-command-parser/functions/parsefrequentbookmarkscommand
---

> **parseFrequentBookmarksCommand**(`queryParts`): [`FrequentBookmarksCommand`](/1.2.1/api/application/commands/bookmark-usage-command-types/interfaces/frequentbookmarkscommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:132](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-usage-command-parser.ts#L132)

Freq commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`FrequentBookmarksCommand`](/1.2.1/api/application/commands/bookmark-usage-command-types/interfaces/frequentbookmarkscommand/)

Freq command。

## Example

```ts
const result = parseFrequentBookmarksCommand(["--limit", "5"]);
// { kind: "freq", limit: 5 }
```
