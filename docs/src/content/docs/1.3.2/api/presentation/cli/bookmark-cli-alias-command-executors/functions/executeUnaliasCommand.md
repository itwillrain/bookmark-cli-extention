---
editUrl: false
next: false
prev: false
title: executeUnaliasCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-alias-command-executors/functions/executeunaliascommand
---

> **executeUnaliasCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-alias-command-executors.ts:171](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-alias-command-executors.ts#L171)

Unalias commandを実行します。

## Parameters

### command

[`UnaliasBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/unaliasbookmarkcommand/)

Unalias commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態です。
