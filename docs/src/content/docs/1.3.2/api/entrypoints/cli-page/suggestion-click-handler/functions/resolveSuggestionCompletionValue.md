---
editUrl: false
next: false
prev: false
title: resolveSuggestionCompletionValue
slug: 1.3.2/api/entrypoints/cli-page/suggestion-click-handler/functions/resolvesuggestioncompletionvalue
---

> **resolveSuggestionCompletionValue**(`suggestionItem`): `string`

Defined in: [entrypoints/cli-page/suggestion-click-handler.ts:40](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/suggestion-click-handler.ts#L40)

Suggestion itemから入力へ反映する値を取り出す。

## Parameters

### suggestionItem

[`BookmarkCliSuggestionItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)

Suggestion item。

## Returns

`string`

入力へ反映する補完値。

## Example

```ts
const value = resolveSuggestionCompletionValue({
  commandName: "./Admin",
  completion: "rm ./Admin",
  description: "/Work/Admin",
});
```
