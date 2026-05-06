---
editUrl: false
next: false
prev: false
title: executeGoCommand
slug: 1.3.0/api/presentation/cli/bookmark-cli-search-command-executors/functions/executegocommand
---

> **executeGoCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-search-command-executors.ts:211](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-search-command-executors.ts#L211)

Go commandを実行します。

## Parameters

### command

[`GoBookmarkCommand`](/1.3.0/api/application/commands/bookmark-search-command-types/interfaces/gobookmarkcommand/)

Go commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
