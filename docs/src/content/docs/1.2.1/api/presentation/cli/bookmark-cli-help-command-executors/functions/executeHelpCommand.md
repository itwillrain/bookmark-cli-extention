---
editUrl: false
next: false
prev: false
title: executeHelpCommand
slug: 1.2.1/api/presentation/cli/bookmark-cli-help-command-executors/functions/executehelpcommand
---

> **executeHelpCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-help-command-executors.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-help-command-executors.ts#L125)

Help commandを実行。

## Parameters

### command

[`HelpBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/helpbookmarkcommand/)

Help command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態。
