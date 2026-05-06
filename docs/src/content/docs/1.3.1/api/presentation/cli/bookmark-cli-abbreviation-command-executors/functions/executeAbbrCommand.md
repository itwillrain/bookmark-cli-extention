---
editUrl: false
next: false
prev: false
title: executeAbbrCommand
slug: 1.3.1/api/presentation/cli/bookmark-cli-abbreviation-command-executors/functions/executeabbrcommand
---

> **executeAbbrCommand**(`command`, `dependencies`): [`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-abbreviation-command-executors.ts:162](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-abbreviation-command-executors.ts#L162)

Abbr commandを実行します。

## Parameters

### command

[`AbbrBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/interfaces/abbrbookmarkcommand/)

Abbr commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

画面に反映する状態です。
