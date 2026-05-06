---
editUrl: false
next: false
prev: false
title: suggestBookmarkCommandHistory
slug: 1.2.1/api/application/commands/bookmark-command-history-suggestion/functions/suggestbookmarkcommandhistory
---

> **suggestBookmarkCommandHistory**(`input`): readonly [`BookmarkCommandSuggestion`](/1.2.1/api/application/commands/bookmark-command-suggestion/interfaces/bookmarkcommandsuggestion/)\[]

Defined in: [application/commands/bookmark-command-history-suggestion.ts:88](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-history-suggestion.ts#L88)

Command historyをfloating suggestion向けに変換。

## Parameters

### input

[`SuggestBookmarkCommandHistoryInput`](/1.2.1/api/application/commands/bookmark-command-history-suggestion/interfaces/suggestbookmarkcommandhistoryinput/)

Command history suggestion入力。

## Returns

readonly [`BookmarkCommandSuggestion`](/1.2.1/api/application/commands/bookmark-command-suggestion/interfaces/bookmarkcommandsuggestion/)\[]

Command history suggestion一覧。

## Example

```ts
const result = suggestBookmarkCommandHistory({
  commandHistory: [{ input: "go Stripe", executedAt: "2026-05-05T00:00:00.000Z" }],
  inputValue: "stripe",
});
```
