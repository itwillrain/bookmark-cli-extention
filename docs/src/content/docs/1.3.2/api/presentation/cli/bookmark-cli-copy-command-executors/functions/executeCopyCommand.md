---
editUrl: false
next: false
prev: false
title: executeCopyCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-copy-command-executors/functions/executecopycommand
---

> **executeCopyCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-copy-command-executors.ts:245](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-copy-command-executors.ts#L245)

Copy commandを実行します。

## Parameters

### command

[`CopyBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/copybookmarkcommand/)

Copy commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
