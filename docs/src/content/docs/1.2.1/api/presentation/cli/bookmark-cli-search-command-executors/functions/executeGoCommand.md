---
editUrl: false
next: false
prev: false
title: executeGoCommand
slug: 1.2.1/api/presentation/cli/bookmark-cli-search-command-executors/functions/executegocommand
---

> **executeGoCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-search-command-executors.ts:211](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-search-command-executors.ts#L211)

Go commandを実行します。

## Parameters

### command

[`GoBookmarkCommand`](/1.2.1/api/application/commands/bookmark-search-command-types/interfaces/gobookmarkcommand/)

Go commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
