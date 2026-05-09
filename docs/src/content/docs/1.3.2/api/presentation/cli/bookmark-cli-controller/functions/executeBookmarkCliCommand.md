---
editUrl: false
next: false
prev: false
title: executeBookmarkCliCommand
slug: 1.3.2/api/presentation/cli/bookmark-cli-controller/functions/executebookmarkclicommand
---

> **executeBookmarkCliCommand**(`input`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-controller.ts:482](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-controller.ts#L482)

CLI入力を解析してBookmark commandを実行します。

## Parameters

### input

`string`

CLI入力です。

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態です。
