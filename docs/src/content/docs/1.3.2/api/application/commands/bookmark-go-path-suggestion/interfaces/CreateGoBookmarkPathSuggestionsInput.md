---
editUrl: false
next: false
prev: false
title: CreateGoBookmarkPathSuggestionsInput
slug: 1.3.2/api/application/commands/bookmark-go-path-suggestion/interfaces/creategobookmarkpathsuggestionsinput
---

Defined in: [application/commands/bookmark-go-path-suggestion.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-go-path-suggestion.ts#L13)

Go bookmark suggestion入力。

## Properties

### bookmarks

> `readonly` **bookmarks**: readonly [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [application/commands/bookmark-go-path-suggestion.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-go-path-suggestion.ts#L15)

Bookmark entry一覧。

***

### commandName

> `readonly` **commandName**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-go-path-suggestion.ts#L17)

Command名。

***

### commandPrefix

> `readonly` **commandPrefix**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-go-path-suggestion.ts#L19)

補完結果の前に付けるcommand部分。

***

### parentPath

> `readonly` **parentPath**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-go-path-suggestion.ts#L21)

親folder path。

***

### pathCompletionBase

> `readonly` **pathCompletionBase**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-go-path-suggestion.ts#L23)

補完入力として保持するbase。

***

### titlePrefix

> `readonly` **titlePrefix**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-go-path-suggestion.ts#L25)

Bookmark title prefix。
