---
editUrl: false
next: false
prev: false
title: parseFrequentBookmarksCommand
slug: 1.3.0/api/application/commands/bookmark-usage-command-parser/functions/parsefrequentbookmarkscommand
---

> **parseFrequentBookmarksCommand**(`queryParts`): [`FrequentBookmarksCommand`](/1.3.0/api/application/commands/bookmark-usage-command-types/interfaces/frequentbookmarkscommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:132](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-usage-command-parser.ts#L132)

Freq commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`FrequentBookmarksCommand`](/1.3.0/api/application/commands/bookmark-usage-command-types/interfaces/frequentbookmarkscommand/)

Freq command。

## Example

```ts
const result = parseFrequentBookmarksCommand(["--limit", "5"]);
// { kind: "freq", limit: 5 }
```
