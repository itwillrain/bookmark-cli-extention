---
editUrl: false
next: false
prev: false
title: executeMoveBookmarkCommand
slug: 1.2.1/api/presentation/cli/bookmark-cli-organize-command-executors/functions/executemovebookmarkcommand
---

> **executeMoveBookmarkCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-organize-command-executors.ts:232](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-organize-command-executors.ts#L232)

Mv commandを実行。

## Parameters

### command

[`MoveBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand/)

Mv command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
