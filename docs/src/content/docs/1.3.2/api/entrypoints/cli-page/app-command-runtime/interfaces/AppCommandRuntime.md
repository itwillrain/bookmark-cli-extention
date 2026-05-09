---
editUrl: false
next: false
prev: false
title: AppCommandRuntime
slug: 1.3.2/api/entrypoints/cli-page/app-command-runtime/interfaces/appcommandruntime
---

Defined in: [entrypoints/cli-page/app-command-runtime.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/app-command-runtime.ts#L60)

App command runtimeです。

## Properties

### executeInputValue

> `readonly` **executeInputValue**: [`CommandInputExecutor`](/1.3.2/api/entrypoints/cli-page/current-command-executor/type-aliases/commandinputexecutor/)

Defined in: [entrypoints/cli-page/app-command-runtime.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/app-command-runtime.ts#L62)

任意のcommand入力値を実行する関数。

***

### submitCommand

> `readonly` **submitCommand**: `SubmitCommandHandler`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/app-command-runtime.ts#L64)

現在入力中のcommand submit handler。
