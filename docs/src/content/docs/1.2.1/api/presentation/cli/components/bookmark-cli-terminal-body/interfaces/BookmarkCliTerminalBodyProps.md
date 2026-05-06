---
editUrl: false
next: false
prev: false
title: BookmarkCliTerminalBodyProps
slug: 1.2.1/api/presentation/cli/components/bookmark-cli-terminal-body/interfaces/bookmarkcliterminalbodyprops
---

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:22](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L22)

Bookmark CLI terminal bodyのpropsです。

## Extended by

* [`BookmarkCliScreenProps`](/1.2.1/api/presentation/cli/components/bookmark-cli-screen/interfaces/bookmarkcliscreenprops/)

## Properties

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:26](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L26)

CLI入力値です。

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

***

### onSubmit

> `readonly` **onSubmit**: () => `void`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:38](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L38)

Commandを実行するcallbackです。

#### Returns

`void`

***

### preferNerdFont

> `readonly` **preferNerdFont**: `boolean`

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:42](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L42)

Nerd Font iconを優先するかです。

***

### promptStyle

> `readonly` **promptStyle**: [`PromptStyle`](/1.2.1/api/domain/storage/extension-state/type-aliases/promptstyle/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:46](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L46)

Prompt表示styleです。

***

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.2.1/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:50](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L50)

選択中result indexです。

***

### selectedSuggestionIndex

> `readonly` **selectedSuggestionIndex**: [`CompletionCursorIndex`](/1.2.1/api/domain/cli/completion-cursor/type-aliases/completioncursorindex/)

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:54](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L54)

選択中suggestion indexです。

***

### suggestionItems

> `readonly` **suggestionItems**: readonly [`BookmarkCliSuggestionItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-suggestion-list/interfaces/bookmarkclisuggestionitem/)\[]

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:58](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L58)

入力中commandのsuggestion一覧です。

***

### transcriptEntries

> `readonly` **transcriptEntries**: readonly [`BookmarkCliTranscriptEntry`](/1.2.1/api/presentation/cli/bookmark-cli-transcript/interfaces/bookmarkclitranscriptentry/)\[]

Defined in: [presentation/cli/components/bookmark-cli-terminal-body.tsx:62](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-terminal-body.tsx#L62)

実行済みcommand transcriptです。
