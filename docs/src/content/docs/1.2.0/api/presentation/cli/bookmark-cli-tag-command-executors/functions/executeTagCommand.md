---
editUrl: false
next: false
prev: false
title: executeTagCommand
slug: 1.2.0/api/presentation/cli/bookmark-cli-tag-command-executors/functions/executetagcommand
---

> **executeTagCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-tag-command-executors.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-tag-command-executors.ts#L51)

Tag commandを実行。

## Parameters

### command

[`TagBookmarkCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand/)

Tag command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態。
