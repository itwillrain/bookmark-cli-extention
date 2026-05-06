---
editUrl: false
next: false
prev: false
title: parseBrowserHistoryCommand
slug: 1.3.1/api/application/commands/bookmark-usage-command-parser/functions/parsebrowserhistorycommand
---

> **parseBrowserHistoryCommand**(`queryParts`): [`BrowserHistoryCommand`](/1.3.1/api/application/commands/bookmark-usage-command-types/interfaces/browserhistorycommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:146](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-usage-command-parser.ts#L146)

History commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`BrowserHistoryCommand`](/1.3.1/api/application/commands/bookmark-usage-command-types/interfaces/browserhistorycommand/)

History command。

## Example

```ts
const result = parseBrowserHistoryCommand(["--limit", "5", "Stripe"]);
// { kind: "history", limit: 5, query: "Stripe" }
```
