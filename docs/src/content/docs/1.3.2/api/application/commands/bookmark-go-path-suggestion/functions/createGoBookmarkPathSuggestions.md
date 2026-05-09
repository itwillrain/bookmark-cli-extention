---
editUrl: false
next: false
prev: false
title: createGoBookmarkPathSuggestions
slug: 1.3.2/api/application/commands/bookmark-go-path-suggestion/functions/creategobookmarkpathsuggestions
---

> **createGoBookmarkPathSuggestions**(`input`): readonly [`BookmarkDirectorySuggestion`](/1.3.2/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Defined in: [application/commands/bookmark-go-path-suggestion.ts:109](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-go-path-suggestion.ts#L109)

Bookmark path suggestion対象command向けBookmark path suggestionを作成。

## Parameters

### input

[`CreateGoBookmarkPathSuggestionsInput`](/1.3.2/api/application/commands/bookmark-go-path-suggestion/interfaces/creategobookmarkpathsuggestionsinput/)

Go bookmark suggestion入力。

## Returns

readonly [`BookmarkDirectorySuggestion`](/1.3.2/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Bookmark suggestion一覧。

## Example

```ts
const result = createGoBookmarkPathSuggestions({
  bookmarks,
  commandName: "go",
  commandPrefix: "go ./",
  parentPath: "/Work",
  pathCompletionBase: "./",
  titlePrefix: "Str",
});
```
