---
editUrl: false
next: false
prev: false
title: AppCommandRuntime
slug: 1.3.0/api/entrypoints/cli-page/app-command-runtime/interfaces/appcommandruntime
---

Defined in: [entrypoints/cli-page/app-command-runtime.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/app-command-runtime.ts#L60)

App command runtimeです。

## Properties

### executeInputValue

> `readonly` **executeInputValue**: [`CommandInputExecutor`](/1.3.0/api/entrypoints/cli-page/current-command-executor/type-aliases/commandinputexecutor/)

Defined in: [entrypoints/cli-page/app-command-runtime.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/app-command-runtime.ts#L62)

任意のcommand入力値を実行する関数。

***

### submitCommand

> `readonly` **submitCommand**: `SubmitCommandHandler`

Defined in: [entrypoints/cli-page/app-command-runtime.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/app-command-runtime.ts#L64)

現在入力中のcommand submit handler。
