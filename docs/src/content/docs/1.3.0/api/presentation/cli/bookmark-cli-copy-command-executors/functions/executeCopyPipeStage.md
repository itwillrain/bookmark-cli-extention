---
editUrl: false
next: false
prev: false
title: executeCopyPipeStage
slug: 1.3.0/api/presentation/cli/bookmark-cli-copy-command-executors/functions/executecopypipestage
---

> **executeCopyPipeStage**(`state`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-copy-command-executors.ts:274](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-copy-command-executors.ts#L274)

Copy pipe stageを実行します。

## Parameters

### state

[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

pipe source実行状態です。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

copy後stateです。
