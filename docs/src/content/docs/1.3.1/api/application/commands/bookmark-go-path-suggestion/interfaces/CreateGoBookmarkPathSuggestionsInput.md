---
editUrl: false
next: false
prev: false
title: CreateGoBookmarkPathSuggestionsInput
slug: 1.3.1/api/application/commands/bookmark-go-path-suggestion/interfaces/creategobookmarkpathsuggestionsinput
---

Defined in: [application/commands/bookmark-go-path-suggestion.ts:12](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-go-path-suggestion.ts#L12)

Go bookmark suggestion入力。

## Properties

### bookmarks

> `readonly` **bookmarks**: readonly [`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [application/commands/bookmark-go-path-suggestion.ts:14](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-go-path-suggestion.ts#L14)

Bookmark entry一覧。

***

### commandName

> `readonly` **commandName**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:16](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-go-path-suggestion.ts#L16)

Command名。

***

### commandPrefix

> `readonly` **commandPrefix**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-go-path-suggestion.ts#L18)

補完結果の前に付けるcommand部分。

***

### parentPath

> `readonly` **parentPath**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-go-path-suggestion.ts#L20)

親folder path。

***

### pathCompletionBase

> `readonly` **pathCompletionBase**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-go-path-suggestion.ts#L22)

補完入力として保持するbase。

***

### titlePrefix

> `readonly` **titlePrefix**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-go-path-suggestion.ts#L24)

Bookmark title prefix。
