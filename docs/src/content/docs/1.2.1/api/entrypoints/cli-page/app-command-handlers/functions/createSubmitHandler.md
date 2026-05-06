---
editUrl: false
next: false
prev: false
title: createSubmitHandler
slug: 1.2.1/api/entrypoints/cli-page/app-command-handlers/functions/createsubmithandler
---

> **createSubmitHandler**(`executeCurrentCommand`, `handleError`): () => `void`

Defined in: [entrypoints/cli-page/app-command-handlers.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/app-command-handlers.ts#L43)

Submit handlerを作成。

## Parameters

### executeCurrentCommand

[`ExecuteCurrentCommand`](/1.2.1/api/entrypoints/cli-page/app-command-handlers/type-aliases/executecurrentcommand/)

現在command実行関数。

### handleError

[`CommandExecutionErrorHandler`](/1.2.1/api/entrypoints/cli-page/app-command-handlers/type-aliases/commandexecutionerrorhandler/)

command実行失敗handler。

## Returns

Submit handler。

() => `void`
