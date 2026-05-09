---
editUrl: false
next: false
prev: false
title: parseBrowserHistoryCommand
slug: 1.3.2/api/application/commands/bookmark-usage-command-parser/functions/parsebrowserhistorycommand
---

> **parseBrowserHistoryCommand**(`queryParts`): [`BrowserHistoryCommand`](/1.3.2/api/application/commands/bookmark-usage-command-types/interfaces/browserhistorycommand/)

Defined in: [application/commands/bookmark-usage-command-parser.ts:146](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-usage-command-parser.ts#L146)

History commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command query token一覧。

## Returns

[`BrowserHistoryCommand`](/1.3.2/api/application/commands/bookmark-usage-command-types/interfaces/browserhistorycommand/)

History command。

## Example

```ts
const result = parseBrowserHistoryCommand(["--limit", "5", "Stripe"]);
// { kind: "history", limit: 5, query: "Stripe" }
```
