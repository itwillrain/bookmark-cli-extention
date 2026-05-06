---
editUrl: false
next: false
prev: false
title: UseBookmarkCliKeyboardInput
slug: 1.2.1/api/entrypoints/cli-page/use-bookmark-cli-keyboard/interfaces/usebookmarkclikeyboardinput
---

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:49](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L49)

Bookmark CLI keyboard hook入力。

## Properties

### closeCliPage

> `readonly` **closeCliPage**: `CloseCliPageHandler`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L51)

CLI pageを閉じる関数。

***

### closeCommandHistoryList

> `readonly` **closeCommandHistoryList**: () => `void`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:55](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L55)

Command history一覧を閉じる関数。

#### Returns

`void`

***

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L53)

現在のcommand state。

***

### executeInputValue

> `readonly` **executeInputValue**: `CommandInputExecutor`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:57](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L57)

Command入力値を実行する関数。

***

### handleCommandExecutionError

> `readonly` **handleCommandExecutionError**: `CommandExecutionErrorHandler`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:59](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L59)

Command実行失敗handler。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L61)

現在のCLI入力値。

***

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.2.1/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:63](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L63)

選択中result index。

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.2.1/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:65](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L65)

選択中suggestion index。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:67](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L67)

入力値setter。

***

### setSelectedResultIndex

> `readonly` **setSelectedResultIndex**: `ResultCursorSetter`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:69](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L69)

Result cursor setter。

***

### setSelectedSuggestionIndex

> `readonly` **setSelectedSuggestionIndex**: `SuggestionCursorSetter`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:71](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L71)

Suggestion cursor setter。

***

### showCommandHistoryList

> `readonly` **showCommandHistoryList**: () => `boolean`

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:73](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L73)

Command history一覧を表示する関数。

#### Returns

`boolean`

***

### suggestionItems

> `readonly` **suggestionItems**: readonly [`BookmarkCliSuggestionItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)\[]

Defined in: [entrypoints/cli-page/use-bookmark-cli-keyboard.ts:75](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/use-bookmark-cli-keyboard.ts#L75)

入力中commandのsuggestion一覧。
