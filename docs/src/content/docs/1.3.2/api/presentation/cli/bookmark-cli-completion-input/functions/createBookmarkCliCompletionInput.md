---
editUrl: false
next: false
prev: false
title: createBookmarkCliCompletionInput
slug: 1.3.2/api/presentation/cli/bookmark-cli-completion-input/functions/createbookmarkclicompletioninput
---

> **createBookmarkCliCompletionInput**(`item`, `inputValue?`): `string`

Defined in: [presentation/cli/bookmark-cli-completion-input.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-completion-input.ts#L85)

Result itemからTab補完入力を作成します。

## Parameters

### item

[`BookmarkCliResultItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)

補完対象result itemです。

### inputValue?

`string` = `emptyString`

現在のCLI入力値です。

## Returns

`string`

補完入力です。
