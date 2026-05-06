---
editUrl: false
next: false
prev: false
title: CreateCurrentCommandExecutorInput
slug: 1.3.0/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput
---

Defined in: [entrypoints/cli-page/current-command-executor.ts:41](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L41)

Current command executor作成入力。

## Extended by

* [`CreateCurrentSubmitCommandInput`](/1.3.0/api/entrypoints/cli-page/current-command-submit-handler/interfaces/createcurrentsubmitcommandinput/)

## Properties

### appendExecutedCommand

> `readonly` **appendExecutedCommand**: `ExecutedCommandAppender`

Defined in: [entrypoints/cli-page/current-command-executor.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L43)

実行済みcommandをtranscriptへ追加する関数。

***

### clearExecutedCommands

> `readonly` **clearExecutedCommands**: `ExecutedCommandClearer`

Defined in: [entrypoints/cli-page/current-command-executor.ts:45](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L45)

実行済みcommand transcriptを削除する関数。

***

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/current-command-executor.ts:47](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L47)

現在のcommand state。

***

### createEntryId

> `readonly` **createEntryId**: `EntryIdFactory`

Defined in: [entrypoints/cli-page/current-command-executor.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L51)

Entry id生成関数。

***

### executeAndPersistCommand

> `readonly` **executeAndPersistCommand**: `ExecuteAndPersistCommand`

Defined in: [entrypoints/cli-page/current-command-executor.ts:49](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L49)

Command実行と永続化を行う関数。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/current-command-executor.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L53)

現在のCLI入力値。

***

### launchContext

> `readonly` **launchContext**: [`LaunchContext`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/) | `undefined`

Defined in: [entrypoints/cli-page/current-command-executor.ts:55](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L55)

CLI起動元タブcontext。

***

### setCommandState

> `readonly` **setCommandState**: `CommandStateSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:57](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L57)

Command state setter。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:59](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L59)

入力値setter。

***

### setSelectedResultIndex

> `readonly` **setSelectedResultIndex**: `ResultCursorSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-command-executor.ts#L61)

Result cursor setter。
