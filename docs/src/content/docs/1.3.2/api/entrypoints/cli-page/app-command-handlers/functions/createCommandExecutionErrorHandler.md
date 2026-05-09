---
editUrl: false
next: false
prev: false
title: createCommandExecutionErrorHandler
slug: 1.3.2/api/entrypoints/cli-page/app-command-handlers/functions/createcommandexecutionerrorhandler
---

> **createCommandExecutionErrorHandler**(`setCommandState`, `createFailedState`): [`CommandExecutionErrorHandler`](/1.3.2/api/entrypoints/cli-page/app-command-handlers/type-aliases/commandexecutionerrorhandler/)

Defined in: [entrypoints/cli-page/app-command-handlers.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/app-command-handlers.ts#L22)

Command実行失敗handlerを作成。

## Parameters

### setCommandState

`CommandStateSetter`

command state setter。

### createFailedState

`FailedCommandStateCreator`

失敗state作成関数。

## Returns

[`CommandExecutionErrorHandler`](/1.3.2/api/entrypoints/cli-page/app-command-handlers/type-aliases/commandexecutionerrorhandler/)

Command実行失敗handler。
