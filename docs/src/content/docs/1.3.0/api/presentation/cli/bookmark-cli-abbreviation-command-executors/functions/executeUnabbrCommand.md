---
editUrl: false
next: false
prev: false
title: executeUnabbrCommand
slug: 1.3.0/api/presentation/cli/bookmark-cli-abbreviation-command-executors/functions/executeunabbrcommand
---

> **executeUnabbrCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-abbreviation-command-executors.ts:193](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-abbreviation-command-executors.ts#L193)

Unabbr commandを実行します。

## Parameters

### command

[`UnabbrBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/unabbrbookmarkcommand/)

Unabbr commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態です。
