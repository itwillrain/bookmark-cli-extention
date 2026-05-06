---
editUrl: false
next: false
prev: false
title: parseFindBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-search-command-parser/functions/parsefindbookmarkcommand
---

> **parseFindBookmarkCommand**(`queryParts`): [`FindBookmarkCommand`](/1.3.0/api/application/commands/bookmark-search-command-types/interfaces/findbookmarkcommand/)

Defined in: [application/commands/bookmark-search-command-parser.ts:67](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-search-command-parser.ts#L67)

Find commandを解析。

## Parameters

### queryParts

readonly `string`\[]

command名を除いたtoken一覧。

## Returns

[`FindBookmarkCommand`](/1.3.0/api/application/commands/bookmark-search-command-types/interfaces/findbookmarkcommand/)

Find command。

## Example

```ts
const result = parseFindBookmarkCommand(["-l", "Stripe", "#finance"]);
// { kind: "find", long: true, query: "Stripe #finance" }
```
