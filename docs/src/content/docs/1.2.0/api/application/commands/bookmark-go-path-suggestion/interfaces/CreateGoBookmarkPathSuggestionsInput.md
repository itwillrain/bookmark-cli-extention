---
editUrl: false
next: false
prev: false
title: CreateGoBookmarkPathSuggestionsInput
slug: 1.2.0/api/application/commands/bookmark-go-path-suggestion/interfaces/creategobookmarkpathsuggestionsinput
---

Defined in: [application/commands/bookmark-go-path-suggestion.ts:9](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-go-path-suggestion.ts#L9)

Go bookmark suggestion入力。

## Properties

### bookmarks

> `readonly` **bookmarks**: readonly [`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [application/commands/bookmark-go-path-suggestion.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-go-path-suggestion.ts#L11)

Bookmark entry一覧。

***

### commandName

> `readonly` **commandName**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-go-path-suggestion.ts#L13)

Command名。

***

### commandPrefix

> `readonly` **commandPrefix**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-go-path-suggestion.ts#L15)

補完結果の前に付けるcommand部分。

***

### parentPath

> `readonly` **parentPath**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-go-path-suggestion.ts#L17)

親folder path。

***

### pathCompletionBase

> `readonly` **pathCompletionBase**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-go-path-suggestion.ts#L19)

補完入力として保持するbase。

***

### titlePrefix

> `readonly` **titlePrefix**: `string`

Defined in: [application/commands/bookmark-go-path-suggestion.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-go-path-suggestion.ts#L21)

Bookmark title prefix。
