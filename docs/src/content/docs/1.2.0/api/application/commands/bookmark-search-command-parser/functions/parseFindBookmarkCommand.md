---
editUrl: false
next: false
prev: false
title: parseFindBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-search-command-parser/functions/parsefindbookmarkcommand
---

> **parseFindBookmarkCommand**(`queryParts`): [`FindBookmarkCommand`](/1.2.0/api/application/commands/bookmark-search-command-types/interfaces/findbookmarkcommand/)

Defined in: [application/commands/bookmark-search-command-parser.ts:67](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-search-command-parser.ts#L67)

Find commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`FindBookmarkCommand`](/1.2.0/api/application/commands/bookmark-search-command-types/interfaces/findbookmarkcommand/)

Find command。

## Example

```ts
const result = parseFindBookmarkCommand(["-l", "Stripe", "#finance"]);
// { kind: "find", long: true, query: "Stripe #finance" }
```
