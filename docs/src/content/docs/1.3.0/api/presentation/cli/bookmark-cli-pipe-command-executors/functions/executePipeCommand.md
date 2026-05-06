---
editUrl: false
next: false
prev: false
title: executePipeCommand
slug: 1.3.0/api/presentation/cli/bookmark-cli-pipe-command-executors/functions/executepipecommand
---

> **executePipeCommand**(`command`, `dependencies`, `executeSource`): `Promise`\<[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-pipe-command-executors.ts:207](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-pipe-command-executors.ts#L207)

Pipe commandを実行します。

## Parameters

### command

[`PipeBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/pipebookmarkcommand/)

pipe commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

### executeSource

[`PipeSourceCommandExecutor`](/1.3.0/api/presentation/cli/bookmark-cli-pipe-command-executors/type-aliases/pipesourcecommandexecutor/)

pipe source executorです。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
