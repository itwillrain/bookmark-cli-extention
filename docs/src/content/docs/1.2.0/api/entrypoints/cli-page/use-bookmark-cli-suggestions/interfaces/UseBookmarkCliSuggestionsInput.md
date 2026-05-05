---
editUrl: false
next: false
prev: false
title: UseBookmarkCliSuggestionsInput
slug: 1.2.0/api/entrypoints/cli-page/use-bookmark-cli-suggestions/interfaces/usebookmarkclisuggestionsinput
---

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:16](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L16)

Bookmark CLI suggestion hook入力。

## Properties

### commandAliases

> `readonly` **commandAliases**: readonly [`CommandAlias`](/1.2.0/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L18)

Command alias一覧。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L20)

現在ディレクトリ。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L22)

現在のCLI入力値。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L24)

Bookmark Tree取得port。
