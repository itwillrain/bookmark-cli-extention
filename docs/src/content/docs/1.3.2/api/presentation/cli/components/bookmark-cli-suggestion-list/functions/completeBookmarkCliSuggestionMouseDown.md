---
editUrl: false
next: false
prev: false
title: completeBookmarkCliSuggestionMouseDown
slug: 1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/functions/completebookmarkclisuggestionmousedown
---

> **completeBookmarkCliSuggestionMouseDown**(`input`): `void`

Defined in: [presentation/cli/components/bookmark-cli-suggestion-list.tsx:171](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-suggestion-list.tsx#L171)

Suggestion itemのmouse downを入力補完として処理。

## Parameters

### input

[`CompleteBookmarkCliSuggestionMouseDownInput`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/completebookmarkclisuggestionmousedowninput/)

Suggestion mouse downの補完入力。

## Returns

`void`

返り値なし。

## Example

```ts
completeBookmarkCliSuggestionMouseDown({ event, onSuggestionClick, suggestionItem });
```
