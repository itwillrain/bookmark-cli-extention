---
editUrl: false
next: false
prev: false
title: parseRecentBookmarksCommand
slug: 1.3.2/api/application/commands/bookmark-usage-command-parser/functions/parserecentbookmarkscommand
---

> **parseRecentBookmarksCommand**(`queryParts`): [`RecentBookmarksCommand`](/1.3.2/api/application/commands/bookmark-usage-command-types/interfaces/recentbookmarkscommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:118](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-usage-command-parser.ts#L118)

Recent commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`RecentBookmarksCommand`](/1.3.2/api/application/commands/bookmark-usage-command-types/interfaces/recentbookmarkscommand/)

Recent command。

## Example

```ts
const result = parseRecentBookmarksCommand(["--limit", "5"]);
// { kind: "recent", limit: 5 }
```
