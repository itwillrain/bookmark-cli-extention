---
editUrl: false
next: false
prev: false
title: executeBrowserHistoryCommand
slug: 1.2.0/api/presentation/cli/bookmark-cli-history-command-executors/functions/executebrowserhistorycommand
---

> **executeBrowserHistoryCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-history-command-executors.ts:63](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-history-command-executors.ts#L63)

History commandを実行。

## Parameters

### command

[`BrowserHistoryCommand`](/1.2.0/api/application/commands/bookmark-usage-command-types/interfaces/browserhistorycommand/)

History command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
