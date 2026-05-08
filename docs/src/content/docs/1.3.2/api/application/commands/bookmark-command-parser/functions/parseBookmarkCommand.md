---
editUrl: false
next: false
prev: false
title: parseBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-parser/functions/parsebookmarkcommand
---

> **parseBookmarkCommand**(`input`): [`ParsedBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/type-aliases/parsedbookmarkcommand/)

Defined in: [application/commands/bookmark-command-parser.ts:277](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-parser.ts#L277)

Bookmark command入力を解析します。

## Parameters

### input

`string`

CLIに入力された文字列です。

## Returns

[`ParsedBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/type-aliases/parsedbookmarkcommand/)

解析済みBookmark commandです。

## Example

```ts
const result = parseBookmarkCommand("ls -l /Work | grep Stripe");
// result.kind === "pipe"
```
