---
editUrl: false
next: false
prev: false
title: executeAliasCommand
slug: 1.2.0/api/presentation/cli/bookmark-cli-alias-command-executors/functions/executealiascommand
---

> **executeAliasCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-alias-command-executors.ts:145](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-alias-command-executors.ts#L145)

Alias commandを実行します。

## Parameters

### command

[`AliasBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/aliasbookmarkcommand/)

Alias commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態です。
