---
editUrl: false
next: false
prev: false
title: executeBookmarkCliCommand
slug: 1.2.0/api/presentation/cli/bookmark-cli-controller/functions/executebookmarkclicommand
---

> **executeBookmarkCliCommand**(`input`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-controller.ts:418](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-controller.ts#L418)

CLI入力を解析してBookmark commandを実行します。

## Parameters

### input

`string`

CLI入力です。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
