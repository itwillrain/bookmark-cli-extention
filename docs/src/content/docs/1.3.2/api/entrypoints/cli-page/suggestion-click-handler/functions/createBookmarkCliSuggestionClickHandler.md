---
editUrl: false
next: false
prev: false
title: createBookmarkCliSuggestionClickHandler
slug: 1.3.2/api/entrypoints/cli-page/suggestion-click-handler/functions/createbookmarkclisuggestionclickhandler
---

> **createBookmarkCliSuggestionClickHandler**(`input`): [`BookmarkCliSuggestionClickHandler`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/type-aliases/bookmarkclisuggestionclickhandler/)

Defined in: [entrypoints/cli-page/suggestion-click-handler.ts:58](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/suggestion-click-handler.ts#L58)

Pointerで選ばれたsuggestionを入力へ確定するhandlerを作成。

## Parameters

### input

[`CreateBookmarkCliSuggestionClickHandlerInput`](/1.3.2/api/entrypoints/cli-page/suggestion-click-handler/interfaces/createbookmarkclisuggestionclickhandlerinput/)

Suggestion click handler作成入力。

## Returns

[`BookmarkCliSuggestionClickHandler`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/type-aliases/bookmarkclisuggestionclickhandler/)

Suggestion click handler。

## Example

```ts
const handleSuggestionClick = createBookmarkCliSuggestionClickHandler({
  setInputValue,
  setSelectedResultIndex,
  setSelectedSuggestionIndex,
});
```
