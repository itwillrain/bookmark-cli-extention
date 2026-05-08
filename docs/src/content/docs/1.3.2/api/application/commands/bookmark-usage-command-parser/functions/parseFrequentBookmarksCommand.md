---
editUrl: false
next: false
prev: false
title: parseFrequentBookmarksCommand
slug: 1.3.2/api/application/commands/bookmark-usage-command-parser/functions/parsefrequentbookmarkscommand
---

> **parseFrequentBookmarksCommand**(`queryParts`): [`FrequentBookmarksCommand`](/1.3.2/api/application/commands/bookmark-usage-command-types/interfaces/frequentbookmarkscommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:132](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-usage-command-parser.ts#L132)

Freq commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`FrequentBookmarksCommand`](/1.3.2/api/application/commands/bookmark-usage-command-types/interfaces/frequentbookmarkscommand/)

Freq command。

## Example

```ts
const result = parseFrequentBookmarksCommand(["--limit", "5"]);
// { kind: "freq", limit: 5 }
```
