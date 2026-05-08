---
editUrl: false
next: false
prev: false
title: executeListDirectoryCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-directory-command-executors/functions/executelistdirectorycommand
---

> **executeListDirectoryCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-directory-command-executors.ts:59](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-directory-command-executors.ts#L59)

Ls commandを実行します。

## Parameters

### command

[`ListDirectoryCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/listdirectorycommand/)

Ls commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
