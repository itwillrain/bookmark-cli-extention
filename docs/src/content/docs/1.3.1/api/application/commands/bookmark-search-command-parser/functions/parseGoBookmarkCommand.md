---
editUrl: false
next: false
prev: false
title: parseGoBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-search-command-parser/functions/parsegobookmarkcommand
---

> **parseGoBookmarkCommand**(`queryParts`): [`GoBookmarkCommand`](/1.3.1/api/application/commands/bookmark-search-command-types/interfaces/gobookmarkcommand/)

Defined in: [application/commands/bookmark-search-command-parser.ts:82](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-search-command-parser.ts#L82)

Go commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`GoBookmarkCommand`](/1.3.1/api/application/commands/bookmark-search-command-types/interfaces/gobookmarkcommand/)

Go command。

## Example

```ts
const result = parseGoBookmarkCommand(["Stripe", "Dashboard"]);
// { kind: "go", long: false, query: "Stripe Dashboard" }
```
