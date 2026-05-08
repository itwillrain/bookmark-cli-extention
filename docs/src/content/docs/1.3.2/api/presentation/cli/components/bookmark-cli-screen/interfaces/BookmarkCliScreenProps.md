---
editUrl: false
next: false
prev: false
title: BookmarkCliScreenProps
slug: 1.3.2/api/presentation/cli/components/bookmark-cli-screen/interfaces/bookmarkcliscreenprops
---

Defined in: [presentation/cli/components/bookmark-cli-screen.tsx:15](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-screen.tsx#L15)

Bookmark CLI画面のpropsです。

## Extends

* [`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/)

## Properties

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:27](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L27)

CLI入力値です。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`inputValue`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#inputvalue)

***

### onInputChange

> `readonly` **onInputChange**: (`value`) => `void`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:31](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L31)

入力値を更新するcallbackです。

#### Parameters

##### value

`string`

#### Returns

`void`

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`onInputChange`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#oninputchange)

***

### onInputKeyDown

> `readonly` **onInputKeyDown**: (`event`) => `void`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:35](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L35)

入力欄のkey操作callbackです。

#### Parameters

##### event

[`CommandInputKeyEvent`](/1.3.2/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputkeyevent/)

#### Returns

`void`

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`onInputKeyDown`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#oninputkeydown)

***

### onSubmit

> `readonly` **onSubmit**: () => `void`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:43](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L43)

Commandを実行するcallbackです。

#### Returns

`void`

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`onSubmit`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#onsubmit)

***

### onSuggestionClick

> `readonly` **onSuggestionClick**: [`BookmarkCliSuggestionClickHandler`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/type-aliases/bookmarkclisuggestionclickhandler/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:39](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L39)

Suggestionをpointerで確定するcallbackです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`onSuggestionClick`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#onsuggestionclick)

***

### preferNerdFont

> `readonly` **preferNerdFont**: `boolean`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:47](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L47)

Nerd Font iconを優先するかです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`preferNerdFont`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#prefernerdfont)

***

### promptStyle

> `readonly` **promptStyle**: [`PromptStyle`](/1.3.2/api/domain/storage/extension-state/type-aliases/promptstyle/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:51](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L51)

Prompt表示styleです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`promptStyle`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#promptstyle)

***

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.3.2/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:55](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L55)

選択中result indexです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`selectedResultIndex`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#selectedresultindex)

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.3.2/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:59](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L59)

選択中suggestion indexです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`selectedSuggestionIndex`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#selectedsuggestionindex)

***

### statusText

> `readonly` **statusText**: `string`

Defined in: [presentation/cli/components/bookmark-cli-screen.tsx:19](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-screen.tsx#L19)

Dedicated window titleなど、外側のchromeへ渡すstatus textです。

***

### suggestionItems

> `readonly` **suggestionItems**: readonly [`BookmarkCliSuggestionItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)\[]

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:63](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L63)

入力中commandのsuggestion一覧です。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`suggestionItems`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#suggestionitems)

***

### transcriptEntries

> `readonly` **transcriptEntries**: readonly [`BookmarkCliTranscriptEntry`](/1.3.2/api/presentation/cli/bookmark-cli-transcript/interfaces/bookmarkclitranscriptentry/)\[]

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:67](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L67)

実行済みcommand transcriptです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`transcriptEntries`](/1.3.2/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#transcriptentries)
