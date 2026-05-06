---
editUrl: false
next: false
prev: false
title: suggestBookmarkCommands
slug: 1.2.1/api/application/commands/bookmark-command-suggestion/functions/suggestbookmarkcommands
---

> **suggestBookmarkCommands**(`inputValue`, `aliases?`): readonly [`BookmarkCommandSuggestion`](/1.2.1/api/application/commands/bookmark-command-suggestion/interfaces/bookmarkcommandsuggestion/)\[]

Defined in: [application/commands/bookmark-command-suggestion.ts:207](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-suggestion.ts#L207)

Bookmark CLI command suggestionを返す。

## Parameters

### inputValue

`string`

CLI入力値。

### aliases?

readonly [`CommandAlias`](/1.2.1/api/domain/cli/command-alias/interfaces/commandalias/)\[] = `[]`

command alias一覧。

## Returns

readonly [`BookmarkCommandSuggestion`](/1.2.1/api/application/commands/bookmark-command-suggestion/interfaces/bookmarkcommandsuggestion/)\[]

Command suggestion一覧。

## Example

```ts
const result = suggestBookmarkCommands(inputValue, aliases);
```
