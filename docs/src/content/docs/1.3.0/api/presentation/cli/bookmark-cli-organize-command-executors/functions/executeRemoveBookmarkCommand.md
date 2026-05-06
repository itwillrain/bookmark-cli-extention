---
editUrl: false
next: false
prev: false
title: executeRemoveBookmarkCommand
slug: 1.3.0/api/presentation/cli/bookmark-cli-organize-command-executors/functions/executeremovebookmarkcommand
---

> **executeRemoveBookmarkCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-organize-command-executors.ts:261](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-organize-command-executors.ts#L261)

Rm commandを実行。

## Parameters

### command

[`RemoveBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand/)

Rm command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
