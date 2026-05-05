---
editUrl: false
next: false
prev: false
title: createGoBookmarkPathSuggestions
slug: 1.2.0/api/application/commands/bookmark-go-path-suggestion/functions/creategobookmarkpathsuggestions
---

> **createGoBookmarkPathSuggestions**(`input`): readonly [`BookmarkDirectorySuggestion`](/1.2.0/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Defined in: [application/commands/bookmark-go-path-suggestion.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-go-path-suggestion.ts#L85)

Go command向けBookmark path suggestionを作成。

## Parameters

### input

[`CreateGoBookmarkPathSuggestionsInput`](/1.2.0/api/application/commands/bookmark-go-path-suggestion/interfaces/creategobookmarkpathsuggestionsinput/)

Go bookmark suggestion入力。

## Returns

readonly [`BookmarkDirectorySuggestion`](/1.2.0/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

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
