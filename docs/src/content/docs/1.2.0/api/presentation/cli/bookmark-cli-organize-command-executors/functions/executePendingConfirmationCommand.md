---
editUrl: false
next: false
prev: false
title: executePendingConfirmationCommand
slug: 1.2.0/api/presentation/cli/bookmark-cli-organize-command-executors/functions/executependingconfirmationcommand
---

> **executePendingConfirmationCommand**(`inputValue`, `dependencies`): `Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

Defined in: [presentation/cli/bookmark-cli-organize-command-executors.ts:292](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-organize-command-executors.ts#L292)

確認待ち入力を処理。

## Parameters

### inputValue

`string`

確認入力。

### dependencies

[`BookmarkCliCommandDependencies`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存。

## Returns

`Promise`\<[`BookmarkCliCommandState`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)>

画面に反映する状態。
