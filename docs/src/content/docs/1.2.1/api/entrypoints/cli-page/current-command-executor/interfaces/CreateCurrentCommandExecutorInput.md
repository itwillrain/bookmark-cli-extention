---
editUrl: false
next: false
prev: false
title: CreateCurrentCommandExecutorInput
slug: 1.2.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput
---

Defined in: [entrypoints/cli-page/current-command-executor.ts:40](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L40)

Current command executor作成入力。

## Extended by

* [`CreateCurrentSubmitCommandInput`](/1.2.1/api/entrypoints/cli-page/current-command-submit-handler/interfaces/createcurrentsubmitcommandinput/)

## Properties

### appendExecutedCommand

> `readonly` **appendExecutedCommand**: `ExecutedCommandAppender`

Defined in: [entrypoints/cli-page/current-command-executor.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L42)

実行済みcommandをtranscriptへ追加する関数。

***

### clearExecutedCommands

> `readonly` **clearExecutedCommands**: `ExecutedCommandClearer`

Defined in: [entrypoints/cli-page/current-command-executor.ts:44](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L44)

実行済みcommand transcriptを削除する関数。

***

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/current-command-executor.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L46)

現在のcommand state。

***

### createEntryId

> `readonly` **createEntryId**: `EntryIdFactory`

Defined in: [entrypoints/cli-page/current-command-executor.ts:50](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L50)

Entry id生成関数。

***

### executeAndPersistCommand

> `readonly` **executeAndPersistCommand**: `ExecuteAndPersistCommand`

Defined in: [entrypoints/cli-page/current-command-executor.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L48)

Command実行と永続化を行う関数。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/current-command-executor.ts:52](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L52)

現在のCLI入力値。

***

### launchContext

> `readonly` **launchContext**: [`LaunchContext`](/1.2.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/) | `undefined`

Defined in: [entrypoints/cli-page/current-command-executor.ts:54](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L54)

CLI起動元タブcontext。

***

### setCommandState

> `readonly` **setCommandState**: `CommandStateSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:56](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L56)

Command state setter。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:58](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L58)

入力値setter。

***

### setSelectedResultIndex

> `readonly` **setSelectedResultIndex**: `ResultCursorSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-command-executor.ts#L60)

Result cursor setter。
