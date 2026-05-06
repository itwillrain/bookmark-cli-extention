---
editUrl: false
next: false
prev: false
title: createGoBookmarkPathSuggestions
slug: 1.3.0/api/application/commands/bookmark-go-path-suggestion/functions/creategobookmarkpathsuggestions
---

> **createGoBookmarkPathSuggestions**(`input`): readonly [`BookmarkDirectorySuggestion`](/1.3.0/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Defined in: [application/commands/bookmark-go-path-suggestion.ts:88](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-go-path-suggestion.ts#L88)

Bookmark path suggestion対象command向けBookmark path suggestionを作成。

## Parameters

### input

[`CreateGoBookmarkPathSuggestionsInput`](/1.3.0/api/application/commands/bookmark-go-path-suggestion/interfaces/creategobookmarkpathsuggestionsinput/)

Go bookmark suggestion入力。

## Returns

readonly [`BookmarkDirectorySuggestion`](/1.3.0/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

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
