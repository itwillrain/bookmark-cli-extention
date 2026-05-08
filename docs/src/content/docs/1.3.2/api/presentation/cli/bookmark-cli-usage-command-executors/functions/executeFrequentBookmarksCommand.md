---
editUrl: false
next: false
prev: false
title: executeFrequentBookmarksCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-usage-command-executors/functions/executefrequentbookmarkscommand
---

> **executeFrequentBookmarksCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-usage-command-executors.ts:101](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-usage-command-executors.ts#L101)

Freq commandを実行。

## Parameters

### command

[`FrequentBookmarksCommand`](/1.3.2/api/application/commands/bookmark-usage-command-types/interfaces/frequentbookmarkscommand/)

Freq command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
