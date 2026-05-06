---
editUrl: false
next: false
prev: false
title: executeTagCommand
slug: 1.2.1/api/presentation/cli/bookmark-cli-tag-command-executors/functions/executetagcommand
---

> **executeTagCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-tag-command-executors.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-tag-command-executors.ts#L51)

Tag commandを実行。

## Parameters

### command

[`TagBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand/)

Tag command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態。
