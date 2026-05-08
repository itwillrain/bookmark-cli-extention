---
editUrl: false
next: false
prev: false
title: suggestBookmarkDirectoryPaths
slug: 1.3.2/api/application/commands/bookmark-directory-suggestion/functions/suggestbookmarkdirectorypaths
---

> **suggestBookmarkDirectoryPaths**(`input`): readonly [`BookmarkDirectorySuggestion`](/1.3.2/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Defined in: [application/commands/bookmark-directory-suggestion.ts:760](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-directory-suggestion.ts#L760)

Bookmark Treeからdirectory path suggestionを返す。

## Parameters

### input

[`SuggestBookmarkDirectoryPathsInput`](/1.3.2/api/application/commands/bookmark-directory-suggestion/interfaces/suggestbookmarkdirectorypathsinput/)

Directory path suggestion入力。

## Returns

readonly [`BookmarkDirectorySuggestion`](/1.3.2/api/application/commands/bookmark-directory-suggestion/interfaces/bookmarkdirectorysuggestion/)\[]

Directory path suggestion一覧。

## Example

```ts
const result = suggestBookmarkDirectoryPaths({ bookmarkTree, currentDirectory: "/Work", inputValue: "cd ./Ad" });
```
