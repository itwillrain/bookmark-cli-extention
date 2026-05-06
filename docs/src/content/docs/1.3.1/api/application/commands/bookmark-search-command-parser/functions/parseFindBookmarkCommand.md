---
editUrl: false
next: false
prev: false
title: parseFindBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-search-command-parser/functions/parsefindbookmarkcommand
---

> **parseFindBookmarkCommand**(`queryParts`): [`FindBookmarkCommand`](/1.3.1/api/application/commands/bookmark-search-command-types/interfaces/findbookmarkcommand/)

Defined in: [application/commands/bookmark-search-command-parser.ts:67](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-search-command-parser.ts#L67)

Find commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`FindBookmarkCommand`](/1.3.1/api/application/commands/bookmark-search-command-types/interfaces/findbookmarkcommand/)

Find command。

## Example

```ts
const result = parseFindBookmarkCommand(["-l", "Stripe", "#finance"]);
// { kind: "find", long: true, query: "Stripe #finance" }
```
