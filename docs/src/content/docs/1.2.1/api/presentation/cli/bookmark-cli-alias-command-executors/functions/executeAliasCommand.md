---
editUrl: false
next: false
prev: false
title: executeAliasCommand
slug: 1.2.1/api/presentation/cli/bookmark-cli-alias-command-executors/functions/executealiascommand
---

> **executeAliasCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-alias-command-executors.ts:145](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-alias-command-executors.ts#L145)

Alias commandを実行します。

## Parameters

### command

[`AliasBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand/)

Alias commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態です。
