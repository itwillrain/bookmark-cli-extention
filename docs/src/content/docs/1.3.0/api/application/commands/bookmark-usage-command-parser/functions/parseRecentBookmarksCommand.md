---
editUrl: false
next: false
prev: false
title: parseRecentBookmarksCommand
slug: 1.3.0/api/application/commands/bookmark-usage-command-parser/functions/parserecentbookmarkscommand
---

> **parseRecentBookmarksCommand**(`queryParts`): [`RecentBookmarksCommand`](/1.3.0/api/application/commands/bookmark-usage-command-types/interfaces/recentbookmarkscommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:118](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-usage-command-parser.ts#L118)

Recent commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`RecentBookmarksCommand`](/1.3.0/api/application/commands/bookmark-usage-command-types/interfaces/recentbookmarkscommand/)

Recent command。

## Example

```ts
const result = parseRecentBookmarksCommand(["--limit", "5"]);
// { kind: "recent", limit: 5 }
```
