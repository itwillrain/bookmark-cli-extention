---
editUrl: false
next: false
prev: false
title: BookmarkCliAppScreenProps
slug: 1.3.2/api/entrypoints/cli-page/bookmark-cli-app-screen/interfaces/bookmarkcliappscreenprops
---

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:17](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L17)

Bookmark CLI app screen props。

## Properties

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:19](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L19)

現在のcommand state。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:21](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L21)

CLI入力値。

***

### keyboard

> `readonly` **keyboard**: [`UseBookmarkCliKeyboardValue`](/1.3.2/api/entrypoints/cli-page/use-bookmark-cli-keyboard/interfaces/usebookmarkclikeyboardvalue/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:23](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L23)

Keyboard hook戻り値。

***

### onInputChange

> `readonly` **onInputChange**: `InputChangeHandler`

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:25](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L25)

入力値変更handler。

***

### onSubmit

> `readonly` **onSubmit**: () => `void`

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:37](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L37)

Submit callback。

#### Returns

`void`

***

### onSuggestionClick

> `readonly` **onSuggestionClick**: [`BookmarkCliSuggestionClickHandler`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/type-aliases/bookmarkclisuggestionclickhandler/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:27](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L27)

Suggestionをpointerで確定するhandler。

***

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.3.2/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:29](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L29)

選択中result index。

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.3.2/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:31](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L31)

選択中suggestion index。

***

### suggestionItems

> `readonly` **suggestionItems**: readonly [`BookmarkCliSuggestionItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)\[]

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:33](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L33)

入力中commandのsuggestion一覧。

***

### transcriptEntries

> `readonly` **transcriptEntries**: readonly [`BookmarkCliTranscriptEntry`](/1.3.2/api/presentation/cli/bookmark-cli-transcript/interfaces/bookmarkclitranscriptentry/)\[]

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:35](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L35)

実行済みcommand transcript。
