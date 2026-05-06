---
editUrl: false
next: false
prev: false
title: executeChangeDirectoryCommand
slug: 1.3.1/api/presentation/cli/bookmark-cli-directory-command-executors/functions/executechangedirectorycommand
---

> **executeChangeDirectoryCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-directory-command-executors.ts:93](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-directory-command-executors.ts#L93)

Cd commandを実行します。

## Parameters

### command

[`ChangeDirectoryCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/changedirectorycommand/)

Cd commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
