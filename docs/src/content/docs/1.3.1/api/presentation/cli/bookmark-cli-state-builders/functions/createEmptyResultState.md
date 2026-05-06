---
editUrl: false
next: false
prev: false
title: createEmptyResultState
slug: 1.3.1/api/presentation/cli/bookmark-cli-state-builders/functions/createemptyresultstate
---

> **createEmptyResultState**(`dependencies`, `statusText`): [`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Defined in: [presentation/cli/bookmark-cli-state-builders.ts:45](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-state-builders.ts#L45)

Result itemなしの状態を作ります。

## Parameters

### dependencies

[`BookmarkCliCommandDependencies`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies/)

command実行に必要な依存です。

### statusText

`string`

Status lineに表示するtextです。

## Returns

[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

Result itemなしの状態です。
