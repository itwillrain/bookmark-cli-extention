---
editUrl: false
next: false
prev: false
title: UseBookmarkCliSuggestionsInput
slug: 1.3.2/api/entrypoints/cli-page/use-bookmark-cli-suggestions/interfaces/usebookmarkclisuggestionsinput
---

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:16](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L16)

Bookmark CLI suggestion hook入力。

## Properties

### commandAbbreviations

> `readonly` **commandAbbreviations**: readonly [`CommandAlias`](/1.3.2/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L18)

Command abbreviation一覧。

***

### commandAliases

> `readonly` **commandAliases**: readonly [`CommandAlias`](/1.3.2/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L20)

Command alias一覧。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L22)

現在ディレクトリ。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L24)

現在のCLI入力値。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-suggestions.ts:26](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-suggestions.ts#L26)

Bookmark Tree取得port。
