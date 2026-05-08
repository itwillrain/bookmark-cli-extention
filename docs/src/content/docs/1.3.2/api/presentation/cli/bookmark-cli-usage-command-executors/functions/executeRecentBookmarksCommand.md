---
editUrl: false
next: false
prev: false
title: executeRecentBookmarksCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-usage-command-executors/functions/executerecentbookmarkscommand
---

> **executeRecentBookmarksCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-usage-command-executors.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-usage-command-executors.ts#L85)

Recent commandを実行。

## Parameters

### command

[`RecentBookmarksCommand`](/1.3.2/api/application/commands/bookmark-usage-command-types/interfaces/recentbookmarkscommand/)

Recent command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
