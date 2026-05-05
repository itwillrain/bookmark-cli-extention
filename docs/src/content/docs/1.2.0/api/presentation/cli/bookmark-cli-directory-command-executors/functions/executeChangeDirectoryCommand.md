---
editUrl: false
next: false
prev: false
title: executeChangeDirectoryCommand
slug: 1.2.0/api/presentation/cli/bookmark-cli-directory-command-executors/functions/executechangedirectorycommand
---

> **executeChangeDirectoryCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-directory-command-executors.ts:93](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-directory-command-executors.ts#L93)

Cd commandを実行します。

## Parameters

### command

[`ChangeDirectoryCommand`](/1.2.0/api/application/commands/bookmark-command-types/interfaces/changedirectorycommand/)

Cd commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
