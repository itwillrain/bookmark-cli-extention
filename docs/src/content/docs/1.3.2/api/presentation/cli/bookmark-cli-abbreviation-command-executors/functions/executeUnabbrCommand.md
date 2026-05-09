---
editUrl: false
next: false
prev: false
title: executeUnabbrCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-abbreviation-command-executors/functions/executeunabbrcommand
---

> **executeUnabbrCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-abbreviation-command-executors.ts:193](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-abbreviation-command-executors.ts#L193)

Unabbr commandを実行します。

## Parameters

### command

[`UnabbrBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/interfaces/unabbrbookmarkcommand/)

Unabbr commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態です。
