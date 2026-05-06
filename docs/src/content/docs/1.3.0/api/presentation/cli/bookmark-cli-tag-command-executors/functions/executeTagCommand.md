---
editUrl: false
next: false
prev: false
title: executeTagCommand
slug: 1.3.0/api/presentation/cli/bookmark-cli-tag-command-executors/functions/executetagcommand
---

> **executeTagCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-tag-command-executors.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-tag-command-executors.ts#L51)

Tag commandを実行。

## Parameters

### command

[`TagBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand/)

Tag command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態。
