---
editUrl: false
next: false
prev: false
title: BookmarkCliSuggestionListProps
slug: 1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionlistprops
---

Defined in: [presentation/cli/components/bookmark-cli-suggestion-list.tsx:27](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-suggestion-list.tsx#L27)

Bookmark CLI suggestion list props。

## Properties

### onSuggestionClick

> `readonly` **onSuggestionClick**: [`BookmarkCliSuggestionClickHandler`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/type-aliases/bookmarkclisuggestionclickhandler/)

Defined in: [presentation/cli/components/bookmark-cli-suggestion-list.tsx:31](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-suggestion-list.tsx#L31)

Suggestionをpointerで確定するhandler。

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.3.2/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [presentation/cli/components/bookmark-cli-suggestion-list.tsx:29](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-suggestion-list.tsx#L29)

選択中suggestion index。

***

### style?

> `readonly` `optional` **style?**: `Readonly`\<`CSSProperties`>

Defined in: [presentation/cli/components/bookmark-cli-suggestion-list.tsx:35](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-suggestion-list.tsx#L35)

Terminal body直下のoverlay位置。

***

### suggestionItems

> `readonly` **suggestionItems**: readonly [`BookmarkCliSuggestionItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)\[]

Defined in: [presentation/cli/components/bookmark-cli-suggestion-list.tsx:33](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-suggestion-list.tsx#L33)

表示するsuggestion一覧。
