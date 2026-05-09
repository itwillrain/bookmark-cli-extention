---
editUrl: false
next: false
prev: false
title: executeParsedOrganizeCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-organize-command-router/functions/executeparsedorganizecommand
---

> **executeParsedOrganizeCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-organize-command-router.ts:33](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-organize-command-router.ts#L33)

整理系commandを実行。

## Parameters

### command

[`ParsedBookmarkCommand`](/1.3.2/api/application/commands/bookmark-command-types/type-aliases/parsedbookmarkcommand/)

Parsed command。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
