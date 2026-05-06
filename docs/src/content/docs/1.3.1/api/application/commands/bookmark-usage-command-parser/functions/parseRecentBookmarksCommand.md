---
editUrl: false
next: false
prev: false
title: parseRecentBookmarksCommand
slug: 1.3.1/api/application/commands/bookmark-usage-command-parser/functions/parserecentbookmarkscommand
---

> **parseRecentBookmarksCommand**(`queryParts`): [`RecentBookmarksCommand`](/1.3.1/api/application/commands/bookmark-usage-command-types/interfaces/recentbookmarkscommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:118](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-usage-command-parser.ts#L118)

Recent commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`RecentBookmarksCommand`](/1.3.1/api/application/commands/bookmark-usage-command-types/interfaces/recentbookmarkscommand/)

Recent command。

## Example

```ts
const result = parseRecentBookmarksCommand(["--limit", "5"]);
// { kind: "recent", limit: 5 }
```
