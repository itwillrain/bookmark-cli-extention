---
editUrl: false
next: false
prev: false
title: suggestBookmarkDirectoryPaths
slug: 1.3.0/api/application/commands/bookmark-directory-suggestion/functions/suggestbookmarkdirectorypaths
---

> **suggestBookmarkDirectoryPaths**(`input`): readonly [`BookmarkDirectorySuggestion`](/1.3.0/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Defined in: [application/commands/bookmark-directory-suggestion.ts:735](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-directory-suggestion.ts#L735)

Bookmark Treeからdirectory path suggestionを返す。

## Parameters

### input

[`SuggestBookmarkDirectoryPathsInput`](/1.3.0/api/application/commands/bookmark-directory-suggestion/interfaces/suggestbookmarkdirectorypathsinput/)

Directory path suggestion入力。

## Returns

readonly [`BookmarkDirectorySuggestion`](/1.3.0/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Directory path suggestion一覧。

## Example

```ts
const result = suggestBookmarkDirectoryPaths({ bookmarkTree, currentDirectory: "/Work", inputValue: "cd ./Ad" });
```
