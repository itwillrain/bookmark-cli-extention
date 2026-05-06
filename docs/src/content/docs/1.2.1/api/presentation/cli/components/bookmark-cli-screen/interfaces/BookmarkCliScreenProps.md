---
editUrl: false
next: false
prev: false
title: BookmarkCliScreenProps
slug: 1.2.1/api/presentation/cli/components/bookmark-cli-screen/interfaces/bookmarkcliscreenprops
---

Defined in: [presentation/cli/components/bookmark-cli-screen.tsx:15](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-screen.tsx#L15)

Bookmark CLI画面のpropsです。

## Extends

* [`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/)

## Properties

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:26](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L26)

CLI入力値です。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`inputValue`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#inputvalue)

***

### onInputChange

> `readonly` **onInputChange**: (`value`) => `void`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:30](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L30)

入力値を更新するcallbackです。

#### Parameters

##### value

`string`

#### Returns

`void`

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`onInputChange`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#oninputchange)

***

### onInputKeyDown

> `readonly` **onInputKeyDown**: (`event`) => `void`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:34](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L34)

入力欄のkey操作callbackです。

#### Parameters

##### event

[`CommandInputKeyEvent`](/1.2.1/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputkeyevent/)

#### Returns

`void`

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`onInputKeyDown`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#oninputkeydown)

***

### onSubmit

> `readonly` **onSubmit**: () => `void`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:38](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L38)

Commandを実行するcallbackです。

#### Returns

`void`

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`onSubmit`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#onsubmit)

***

### preferNerdFont

> `readonly` **preferNerdFont**: `boolean`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:42](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L42)

Nerd Font iconを優先するかです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`preferNerdFont`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#prefernerdfont)

***

### promptStyle

> `readonly` **promptStyle**: [`PromptStyle`](/1.2.1/api/domain/storage/extension-state/type-aliases/promptstyle/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:46](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L46)

Prompt表示styleです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`promptStyle`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#promptstyle)

***

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.2.1/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:50](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L50)

選択中result indexです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`selectedResultIndex`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#selectedresultindex)

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.2.1/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:54](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L54)

選択中suggestion indexです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`selectedSuggestionIndex`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#selectedsuggestionindex)

***

### statusText

> `readonly` **statusText**: `string`

Defined in: [presentation/cli/components/bookmark-cli-screen.tsx:19](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-screen.tsx#L19)

Dedicated window titleなど、外側のchromeへ渡すstatus textです。

***

### suggestionItems

> `readonly` **suggestionItems**: readonly [`BookmarkCliSuggestionItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)\[]

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:58](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L58)

入力中commandのsuggestion一覧です。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`suggestionItems`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#suggestionitems)

***

### transcriptEntries

> `readonly` **transcriptEntries**: readonly [`BookmarkCliTranscriptEntry`](/1.2.1/api/presentation/cli/bookmark-cli-transcript/interfaces/bookmarkclitranscriptentry/)\[]

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:62](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L62)

実行済みcommand transcriptです。

#### Inherited from

[`BookmarkCliTerminalBodyProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/).[`transcriptEntries`](/1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops/#transcriptentries)
