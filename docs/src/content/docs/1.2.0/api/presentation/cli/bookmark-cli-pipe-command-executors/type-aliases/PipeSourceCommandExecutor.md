---
editUrl: false
next: false
prev: false
title: PipeSourceCommandExecutor
slug: 1.2.0/api/presentation/cli/bookmark-cli-pipe-command-executors/type-aliases/pipesourcecommandexecutor
---

> **PipeSourceCommandExecutor** = (`command`, `dependencies`) => `Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-pipe-command-executors.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-pipe-command-executors.ts#L15)

Pipe source commandを実行する関数です。

## Parameters

### command

[`PipeSourceBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/type-aliases/pipesourcebookmarkcommand/)

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>
