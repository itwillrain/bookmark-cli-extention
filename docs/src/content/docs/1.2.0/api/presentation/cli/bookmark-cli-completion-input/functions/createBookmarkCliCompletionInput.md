---
editUrl: false
next: false
prev: false
title: createBookmarkCliCompletionInput
slug: 1.2.0/api/presentation/cli/bookmark-cli-completion-input/functions/createbookmarkclicompletioninput
---

> **createBookmarkCliCompletionInput**(`item`, `inputValue?`): `string`

Defined in: [presentation/cli/bookmark-cli-completion-input.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-completion-input.ts#L85)

Result itemからTab補完入力を作成します。

## Parameters

### item

[`BookmarkCliResultItem`](/1.2.0/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)

補完対象result itemです。

### inputValue?

`string` = `emptyString`

現在のCLI入力値です。

## Returns

`string`

補完入力です。
