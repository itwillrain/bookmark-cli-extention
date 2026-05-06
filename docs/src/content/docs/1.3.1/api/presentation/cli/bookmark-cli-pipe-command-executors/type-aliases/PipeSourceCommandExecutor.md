---
editUrl: false
next: false
prev: false
title: PipeSourceCommandExecutor
slug: 1.3.1/api/presentation/cli/bookmark-cli-pipe-command-executors/type-aliases/pipesourcecommandexecutor
---

> **PipeSourceCommandExecutor** = (`command`, `dependencies`) => `Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-pipe-command-executors.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-pipe-command-executors.ts#L17)

Pipe source commandを実行する関数です。

## Parameters

### command

[`PipeSourceBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/type-aliases/pipesourcebookmarkcommand/)

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>
