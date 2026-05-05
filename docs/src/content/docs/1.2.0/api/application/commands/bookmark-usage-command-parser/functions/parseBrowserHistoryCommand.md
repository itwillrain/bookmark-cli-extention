---
editUrl: false
next: false
prev: false
title: parseBrowserHistoryCommand
slug: 1.2.0/api/application/commands/bookmark-usage-command-parser/functions/parsebrowserhistorycommand
---

> **parseBrowserHistoryCommand**(`queryParts`): [`BrowserHistoryCommand`](/1.2.0/api/application/commands/bookmark-usage-command-types/interfaces/browserhistorycommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:146](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-usage-command-parser.ts#L146)

History commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`BrowserHistoryCommand`](/1.2.0/api/application/commands/bookmark-usage-command-types/interfaces/browserhistorycommand/)

History command。

## Example

```ts
const result = parseBrowserHistoryCommand(["--limit", "5", "Stripe"]);
// { kind: "history", limit: 5, query: "Stripe" }
```
