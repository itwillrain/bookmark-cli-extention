---
editUrl: false
next: false
prev: false
title: parseBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-command-parser/functions/parsebookmarkcommand
---

> **parseBookmarkCommand**(`input`): [`ParsedBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/type-aliases/parsedbookmarkcommand/)

Defined in: [application/commands/bookmark-command-parser.ts:257](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-parser.ts#L257)

Bookmark command入力を解析します。

## Parameters

### input

`string`

CLIに入力された文字列です。

## Returns

[`ParsedBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/type-aliases/parsedbookmarkcommand/)

解析済みBookmark commandです。

## Example

```ts
const result = parseBookmarkCommand("ls -l /Work | grep Stripe");
// result.kind === "pipe"
```
