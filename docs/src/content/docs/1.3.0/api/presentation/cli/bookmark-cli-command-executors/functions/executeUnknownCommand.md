---
editUrl: false
next: false
prev: false
title: executeUnknownCommand
slug: 1.3.0/api/presentation/cli/bookmark-cli-command-executors/functions/executeunknowncommand
---

> **executeUnknownCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-command-executors.ts:70](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-executors.ts#L70)

Unknown commandを実行します。

## Parameters

### command

[`UnknownBookmarkCommand`](/1.3.0/api/application/commands/bookmark-command-types/interfaces/unknownbookmarkcommand/)

Unknown commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態です。
