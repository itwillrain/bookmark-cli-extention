---
editUrl: false
next: false
prev: false
title: executeParsedUsageCommand
slug: 1.3.1/api/presentation/cli/bookmark-cli-usage-command-router/functions/executeparsedusagecommand
---

> **executeParsedUsageCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-usage-command-router.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-usage-command-router.ts#L18)

Usage commandを実行。

## Parameters

### command

[`ParsedBookmarkCommand`](/1.3.1/api/application/commands/bookmark-command-types/type-aliases/parsedbookmarkcommand/)

Parsed command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
