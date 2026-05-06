---
editUrl: false
next: false
prev: false
title: executeShowDirectoryTreeCommand
slug: 1.2.1/api/presentation/cli/bookmark-cli-directory-command-executors/functions/executeshowdirectorytreecommand
---

> **executeShowDirectoryTreeCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-directory-command-executors.ts:146](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-directory-command-executors.ts#L146)

Tree commandを実行します。

## Parameters

### command

[`ShowDirectoryTreeCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/showdirectorytreecommand/)

Tree commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
