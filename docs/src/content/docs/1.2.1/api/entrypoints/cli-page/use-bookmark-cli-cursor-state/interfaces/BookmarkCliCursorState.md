---
editUrl: false
next: false
prev: false
title: BookmarkCliCursorState
slug: 1.2.1/api/entrypoints/cli-page/use-bookmark-cli-cursor-state/interfaces/bookmarkclicursorstate
---

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L15)

Bookmark CLI cursor state。

## Properties

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.2.1/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L17)

選択中result index。

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.2.1/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L19)

選択中suggestion index。

***

### setSelectedResultIndex

> `readonly` **setSelectedResultIndex**: `ResultCursorSetter`

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L21)

Result cursor setter。

***

### setSelectedSuggestionIndex

> `readonly` **setSelectedSuggestionIndex**: `SuggestionCursorSetter`

Defined in: [entrypoints/cli-page/use-bookmark-cli-cursor-state.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-cursor-state.ts#L23)

Suggestion cursor setter。
