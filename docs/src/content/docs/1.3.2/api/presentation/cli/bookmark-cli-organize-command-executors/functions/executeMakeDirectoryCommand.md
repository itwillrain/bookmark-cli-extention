---
editUrl: false
next: false
prev: false
title: executeMakeDirectoryCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-organize-command-executors/functions/executemakedirectorycommand
---

> **executeMakeDirectoryCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-organize-command-executors.ts:205](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-organize-command-executors.ts#L205)

Mkdir commandを実行。

## Parameters

### command

[`MakeDirectoryCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/makedirectorycommand/)

Mkdir command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
