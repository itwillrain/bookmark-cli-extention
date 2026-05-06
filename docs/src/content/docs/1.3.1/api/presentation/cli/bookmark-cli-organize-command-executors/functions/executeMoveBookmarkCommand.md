---
editUrl: false
next: false
prev: false
title: executeMoveBookmarkCommand
slug: 1.3.1/api/presentation/cli/bookmark-cli-organize-command-executors/functions/executemovebookmarkcommand
---

> **executeMoveBookmarkCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-organize-command-executors.ts:232](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-organize-command-executors.ts#L232)

Mv commandを実行。

## Parameters

### command

[`MoveBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand/)

Mv command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
