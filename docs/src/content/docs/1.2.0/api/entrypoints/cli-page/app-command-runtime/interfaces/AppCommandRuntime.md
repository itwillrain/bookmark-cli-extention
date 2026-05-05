---
editUrl: false
next: false
prev: false
title: AppCommandRuntime
slug: 1.2.0/api/entrypoints/cli-page/app-command-runtime/interfaces/appcommandruntime
---

Defined in: [entrypoints/cli-page/app-command-runtime.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/app-command-runtime.ts#L60)

App command runtimeです。

## Properties

### executeInputValue

> `readonly` **executeInputValue**: [`CommandInputExecutor`](/1.2.0/api/entrypoints/cli-page/current-command-executor/type-aliases/commandinputexecutor/)

Defined in: [entrypoints/cli-page/app-command-runtime.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/app-command-runtime.ts#L62)

任意のcommand入力値を実行する関数。

***

### submitCommand

> `readonly` **submitCommand**: `SubmitCommandHandler`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/app-command-runtime.ts#L64)

現在入力中のcommand submit handler。
