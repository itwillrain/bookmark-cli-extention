---
editUrl: false
next: false
prev: false
title: CreateCurrentSubmitCommandInput
slug: 1.3.1/api/entrypoints/cli-page/current-command-submit-handler/interfaces/createcurrentsubmitcommandinput
---

Defined in: [entrypoints/cli-page/current-command-submit-handler.ts:8](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-submit-handler.ts#L8)

Submit handler作成入力。

## Extends

* [`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/)

## Properties

### appendExecutedCommand

> `readonly` **appendExecutedCommand**: `ExecutedCommandAppender`

Defined in: [entrypoints/cli-page/current-command-executor.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L43)

実行済みcommandをtranscriptへ追加する関数。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`appendExecutedCommand`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#appendexecutedcommand)

***

### clearExecutedCommands

> `readonly` **clearExecutedCommands**: `ExecutedCommandClearer`

Defined in: [entrypoints/cli-page/current-command-executor.ts:45](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L45)

実行済みcommand transcriptを削除する関数。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`clearExecutedCommands`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#clearexecutedcommands)

***

### commandState

> `readonly` **commandState**: [`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [entrypoints/cli-page/current-command-executor.ts:47](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L47)

現在のcommand state。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`commandState`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#commandstate)

***

### createEntryId

> `readonly` **createEntryId**: `EntryIdFactory`

Defined in: [entrypoints/cli-page/current-command-executor.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L51)

Entry id生成関数。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`createEntryId`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#createentryid)

***

### executeAndPersistCommand

> `readonly` **executeAndPersistCommand**: `ExecuteAndPersistCommand`

Defined in: [entrypoints/cli-page/current-command-executor.ts:49](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L49)

Command実行と永続化を行う関数。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`executeAndPersistCommand`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#executeandpersistcommand)

***

### handleCommandExecutionError

> `readonly` **handleCommandExecutionError**: [`CommandExecutionErrorHandler`](/1.3.1/api/entrypoints/cli-page/app-command-handlers/type-aliases/commandexecutionerrorhandler/)

Defined in: [entrypoints/cli-page/current-command-submit-handler.ts:10](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-submit-handler.ts#L10)

Command実行失敗handler。

***

### inputValue

> `readonly` **inputValue**: `string`

Defined in: [entrypoints/cli-page/current-command-executor.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L53)

現在のCLI入力値。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`inputValue`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#inputvalue)

***

### launchContext

> `readonly` **launchContext**: [`LaunchContext`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/) | `undefined`

Defined in: [entrypoints/cli-page/current-command-executor.ts:55](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L55)

CLI起動元タブcontext。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`launchContext`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#launchcontext)

***

### setCommandState

> `readonly` **setCommandState**: `CommandStateSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:57](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L57)

Command state setter。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`setCommandState`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#setcommandstate)

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:59](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L59)

入力値setter。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`setInputValue`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#setinputvalue)

***

### setSelectedResultIndex

> `readonly` **setSelectedResultIndex**: `ResultCursorSetter`

Defined in: [entrypoints/cli-page/current-command-executor.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-command-executor.ts#L61)

Result cursor setter。

#### Inherited from

[`CreateCurrentCommandExecutorInput`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/).[`setSelectedResultIndex`](/1.3.1/api/entrypoints/cli-page/current-command-executor/interfaces/createcurrentcommandexecutorinput/#setselectedresultindex)
