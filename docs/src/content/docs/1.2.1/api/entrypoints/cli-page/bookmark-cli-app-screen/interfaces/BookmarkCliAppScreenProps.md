---
editUrl: false
next: false
prev: false
title: BookmarkCliAppScreenProps
slug: 1.2.1/api/entrypoints/cli-page/bookmark-cli-app-screen/interfaces/bookmarkcliappscreenprops
---

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:14](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L14)

Bookmark CLI app screen props。

## Properties

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:16](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L16)

現在のcommand state。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:18](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L18)

CLI入力値。

***

### keyboard

> `readonly` **keyboard**: [`UseBookmarkCliKeyboardValue`](/1.2.1/api/entrypoints/cli-page/use-bookmark-cli-keyboard/interfaces/usebookmarkclikeyboardvalue/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:20](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L20)

Keyboard hook戻り値。

***

### onInputChange

> `readonly` **onInputChange**: `InputChangeHandler`

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:22](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L22)

入力値変更handler。

***

### onSubmit

> `readonly` **onSubmit**: () => `void`

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:32](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L32)

Submit callback。

#### Returns

`void`

***

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.2.1/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:24](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L24)

選択中result index。

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.2.1/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:26](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L26)

選択中suggestion index。

***

### suggestionItems

> `readonly` **suggestionItems**: readonly [`BookmarkCliSuggestionItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)\[]

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:28](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L28)

入力中commandのsuggestion一覧。

***

### transcriptEntries

> `readonly` **transcriptEntries**: readonly [`BookmarkCliTranscriptEntry`](/1.2.1/api/presentation/cli/bookmark-cli-transcript/interfaces/bookmarkclitranscriptentry/)\[]

Defined in: [entrypoints/cli-page/bookmark-cli-app-screen.tsx:30](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/bookmark-cli-app-screen.tsx#L30)

実行済みcommand transcript。
