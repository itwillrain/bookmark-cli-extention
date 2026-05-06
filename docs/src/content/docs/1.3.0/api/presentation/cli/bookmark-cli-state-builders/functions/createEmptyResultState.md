---
editUrl: false
next: false
prev: false
title: createEmptyResultState
slug: 1.3.0/api/presentation/cli/bookmark-cli-state-builders/functions/createemptyresultstate
---

> **createEmptyResultState**(`dependencies`, `statusText`): [`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-state-builders.ts:45](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-state-builders.ts#L45)

Result itemなしの状態を作ります。

## Parameters

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

### statusText

`string`

Status lineに表示するtextです。

## Returns

[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Result itemなしの状態です。
