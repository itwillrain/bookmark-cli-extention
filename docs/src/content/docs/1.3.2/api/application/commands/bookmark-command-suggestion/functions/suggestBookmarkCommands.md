---
editUrl: false
next: false
prev: false
title: suggestBookmarkCommands
slug: 1.3.2/api/application/commands/bookmark-command-suggestion/functions/suggestbookmarkcommands
---

> **suggestBookmarkCommands**(`inputValue`, `aliases?`, `abbreviations?`): readonly [`BookmarkCommandSuggestion`](/1.3.2/api/application/commands/bookmark-command-suggestion/interfaces/bookmarkcommandsuggestion/)\[]

Defined in: [application/commands/bookmark-command-suggestion.ts:214](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-suggestion.ts#L214)

Bookmark CLI command suggestionを返す。

## Parameters

### inputValue

`string`

CLI入力値。

### aliases?

readonly [`CommandAlias`](/1.3.2/api/domain/cli/command-alias/interfaces/commandalias/)\[] = `[]`

command alias一覧。

### abbreviations?

readonly [`CommandAlias`](/1.3.2/api/domain/cli/command-alias/interfaces/commandalias/)\[] = `[]`

command abbreviation一覧。

## Returns

readonly [`BookmarkCommandSuggestion`](/1.3.2/api/application/commands/bookmark-command-suggestion/interfaces/bookmarkcommandsuggestion/)\[]

Command suggestion一覧。

## Example

```ts
const result = suggestBookmarkCommands(inputValue, aliases, abbreviations);
```
