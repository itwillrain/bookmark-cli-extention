---
editUrl: false
next: false
prev: false
title: BookmarkCliCursorState
slug: 1.3.2/api/entrypoints/cli-page/use-bookmark-cli-cursor-state/interfaces/bookmarkclicursorstate
---

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L15)

Bookmark CLI cursor state。

## Properties

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.3.2/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L17)

選択中result index。

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.3.2/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L19)

選択中suggestion index。

***

### setSelectedResultIndex

> `readonly` **setSelectedResultIndex**: `ResultCursorSetter`

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L21)

Result cursor setter。

***

### setSelectedSuggestionIndex

> `readonly` **setSelectedSuggestionIndex**: `SuggestionCursorSetter`

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L23)

Suggestion cursor setter。
