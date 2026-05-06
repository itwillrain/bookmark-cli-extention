---
editUrl: false
next: false
prev: false
title: executePipeCommand
slug: 1.2.1/api/presentation/cli/bookmark-cli-pipe-command-executors/functions/executepipecommand
---

> **executePipeCommand**(`command`, `dependencies`, `executeSource`): `Promise`\<[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-pipe-command-executors.ts:121](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-pipe-command-executors.ts#L121)

Pipe commandを実行します。

## Parameters

### command

[`PipeBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/pipebookmarkcommand/)

pipe commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

### executeSource

[`PipeSourceCommandExecutor`](/1.2.1/api/presentation/cli/bookmark-cli-pipe-command-executors/type-aliases/pipesourcecommandexecutor/)

pipe source executorです。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
