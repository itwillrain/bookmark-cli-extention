---
editUrl: false
next: false
prev: false
title: CompletionKeyboardActionInput
slug: 1.3.2/api/entrypoints/cli-page/completion-keyboard/interfaces/completionkeyboardactioninput
---

Defined in: [entrypoints/cli-page/completion-keyboard.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L37)

Completion keyboard action入力。

## Properties

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/completion-keyboard.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L39)

現在のcommand state。

***

### event

> `readonly` **event**: [`CommandInputKeyEvent`](/1.3.2/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputkeyevent/)

Defined in: [entrypoints/cli-page/completion-keyboard.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L43)

入力欄key event。

***

### executeInputValue

> `readonly` **executeInputValue**: `CommandInputExecutor`

Defined in: [entrypoints/cli-page/completion-keyboard.ts:41](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L41)

Command入力値を実行する関数。

***

### handleCommandExecutionError

> `readonly` **handleCommandExecutionError**: `CommandExecutionErrorHandler`

Defined in: [entrypoints/cli-page/completion-keyboard.ts:45](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L45)

Command実行失敗handler。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/completion-keyboard.ts:47](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L47)

現在のCLI入力値。

***

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.3.2/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [entrypoints/cli-page/completion-keyboard.ts:49](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L49)

選択中result index。

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.3.2/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [entrypoints/cli-page/completion-keyboard.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L51)

選択中suggestion index。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/completion-keyboard.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L53)

入力値setter。

***

### setSelectedResultIndex

> `readonly` **setSelectedResultIndex**: `ResultCursorSetter`

Defined in: [entrypoints/cli-page/completion-keyboard.ts:55](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L55)

Result cursor setter。

***

### setSelectedSuggestionIndex

> `readonly` **setSelectedSuggestionIndex**: `SuggestionCursorSetter`

Defined in: [entrypoints/cli-page/completion-keyboard.ts:57](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L57)

Suggestion cursor setter。

***

### suggestionItems

> `readonly` **suggestionItems**: readonly [`BookmarkCliSuggestionItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)\[]

Defined in: [entrypoints/cli-page/completion-keyboard.ts:59](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/completion-keyboard.ts#L59)

入力中commandのsuggestion一覧。
