---
editUrl: false
next: false
prev: false
title: CreateAppCommandRuntimeInput
slug: 1.3.1/api/entrypoints/cli-page/app-command-runtime/interfaces/createappcommandruntimeinput
---

Defined in: [entrypoints/cli-page/app-command-runtime.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L34)

App command runtime作成入力です。

## Properties

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/app-command-runtime.ts:36](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L36)

現在のcommand state。

***

### createEntryId

> `readonly` **createEntryId**: `EntryIdFactory`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L38)

Entry id生成関数。

***

### executeAndPersistCommand

> `readonly` **executeAndPersistCommand**: `ExecuteAndPersistCommand`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:40](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L40)

Command実行と永続化を行う関数。

***

### handleCommandExecutionError

> `readonly` **handleCommandExecutionError**: [`CommandExecutionErrorHandler`](/1.3.1/api/entrypoints/cli-page/app-command-handlers/type-aliases/commandexecutionerrorhandler/)

Defined in: [entrypoints/cli-page/app-command-runtime.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L42)

Command実行失敗handler。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:44](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L44)

現在のCLI入力値。

***

### launchContext

> `readonly` **launchContext**: [`LaunchContext`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/) | `undefined`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L46)

CLI起動元タブcontext。

***

### setCommandState

> `readonly` **setCommandState**: `CommandStateSetter`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L48)

Command state setter。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:50](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L50)

入力値setter。

***

### setSelectedResultIndex

> `readonly` **setSelectedResultIndex**: `ResultCursorSetter`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:52](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L52)

Result cursor setter。

***

### transcript

> `readonly` **transcript**: [`UseBookmarkCliTranscriptValue`](/1.3.1/api/entrypoints/cli-page/use-bookmark-cli-transcript/interfaces/usebookmarkclitranscriptvalue/)

Defined in: [entrypoints/cli-page/app-command-runtime.ts:54](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/app-command-runtime.ts#L54)

Transcript hook戻り値。
