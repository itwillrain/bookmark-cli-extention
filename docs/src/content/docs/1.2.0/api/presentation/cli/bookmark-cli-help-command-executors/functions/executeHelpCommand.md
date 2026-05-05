---
editUrl: false
next: false
prev: false
title: executeHelpCommand
slug: 1.2.0/api/presentation/cli/bookmark-cli-help-command-executors/functions/executehelpcommand
---

> **executeHelpCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-help-command-executors.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-help-command-executors.ts#L125)

Help commandを実行。

## Parameters

### command

[`HelpBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/helpbookmarkcommand/)

Help command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態。
