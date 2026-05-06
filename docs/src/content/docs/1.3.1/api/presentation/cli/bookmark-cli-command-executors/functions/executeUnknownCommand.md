---
editUrl: false
next: false
prev: false
title: executeUnknownCommand
slug: 1.3.1/api/presentation/cli/bookmark-cli-command-executors/functions/executeunknowncommand
---

> **executeUnknownCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-command-executors.ts:70](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-command-executors.ts#L70)

Unknown commandを実行します。

## Parameters

### command

[`UnknownBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/unknownbookmarkcommand/)

Unknown commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態です。
