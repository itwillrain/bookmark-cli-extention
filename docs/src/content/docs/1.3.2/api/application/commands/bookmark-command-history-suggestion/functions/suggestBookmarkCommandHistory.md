---
editUrl: false
next: false
prev: false
title: suggestBookmarkCommandHistory
slug: 1.3.2/api/application/commands/bookmark-command-history-suggestion/functions/suggestbookmarkcommandhistory
---

> **suggestBookmarkCommandHistory**(`input`): readonly [`BookmarkCommandSuggestion`](/1.3.2/api/application/commands/bookmark-command-suggestion/interfaces/bookmarkcommandsuggestion/)\[]

Defined in: [application/commands/bookmark-command-history-suggestion.ts:88](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-history-suggestion.ts#L88)

Command historyをfloating suggestion向けに変換。

## Parameters

### input

[`SuggestBookmarkCommandHistoryInput`](/1.3.2/api/application/commands/bookmark-command-history-suggestion/interfaces/suggestbookmarkcommandhistoryinput/)

Command history suggestion入力。

## Returns

readonly [`BookmarkCommandSuggestion`](/1.3.2/api/application/commands/bookmark-command-suggestion/interfaces/bookmarkcommandsuggestion/)\[]

Command history suggestion一覧。

## Example

```ts
const result = suggestBookmarkCommandHistory({
  commandHistory: [{ input: "go Stripe", executedAt: "2026-05-05T00:00:00.000Z" }],
  inputValue: "stripe",
});
```
