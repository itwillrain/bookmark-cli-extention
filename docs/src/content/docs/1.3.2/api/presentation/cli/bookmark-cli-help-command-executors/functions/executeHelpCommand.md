---
editUrl: false
next: false
prev: false
title: executeHelpCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-help-command-executors/functions/executehelpcommand
---

> **executeHelpCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-help-command-executors.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-help-command-executors.ts#L125)

Help commandを実行。

## Parameters

### command

[`HelpBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/helpbookmarkcommand/)

Help command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態。
