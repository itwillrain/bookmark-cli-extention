---
editUrl: false
next: false
prev: false
title: AppCommandRuntime
slug: 1.2.1/api/entrypoints/cli-page/app-command-runtime/interfaces/appcommandruntime
---

Defined in: [entrypoints/cli-page/app-command-runtime.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/app-command-runtime.ts#L60)

App command runtimeです。

## Properties

### executeInputValue

> `readonly` **executeInputValue**: [`CommandInputExecutor`](/1.2.1/api/entrypoints/cli-page/current-command-executor/type-aliases/commandinputexecutor/)

Defined in: [entrypoints/cli-page/app-command-runtime.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/app-command-runtime.ts#L62)

任意のcommand入力値を実行する関数。

***

### submitCommand

> `readonly` **submitCommand**: `SubmitCommandHandler`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/app-command-runtime.ts#L64)

現在入力中のcommand submit handler。
