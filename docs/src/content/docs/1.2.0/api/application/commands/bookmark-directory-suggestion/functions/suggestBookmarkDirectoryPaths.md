---
editUrl: false
next: false
prev: false
title: suggestBookmarkDirectoryPaths
slug: 1.2.0/api/application/commands/bookmark-directory-suggestion/functions/suggestbookmarkdirectorypaths
---

> **suggestBookmarkDirectoryPaths**(`input`): readonly [`BookmarkDirectorySuggestion`](/1.2.0/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Defined in: [application/commands/bookmark-directory-suggestion.ts:283](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-directory-suggestion.ts#L283)

Bookmark Treeからdirectory path suggestionを返す。

## Parameters

### input

[`SuggestBookmarkDirectoryPathsInput`](/1.2.0/api/application/commands/bookmark-directory-suggestion/interfaces/suggestbookmarkdirectorypathsinput/)

Directory path suggestion入力。

## Returns

readonly [`BookmarkDirectorySuggestion`](/1.2.0/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Directory path suggestion一覧。

## Example

```ts
const result = suggestBookmarkDirectoryPaths({ bookmarkTree, currentDirectory: "/Work", inputValue: "cd ./Ad" });
```
