---
editUrl: false
next: false
prev: false
title: executeFindCommand
slug: 1.3.1/api/presentation/cli/bookmark-cli-search-command-executors/functions/executefindcommand
---

> **executeFindCommand**(`command`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-search-command-executors.ts:173](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-search-command-executors.ts#L173)

Find commandを実行します。

## Parameters

### command

[`FindBookmarkCommand`](/1.3.1/api/application/commands/bookmark-search-command-types/interfaces/findbookmarkcommand/)

Find commandです。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
