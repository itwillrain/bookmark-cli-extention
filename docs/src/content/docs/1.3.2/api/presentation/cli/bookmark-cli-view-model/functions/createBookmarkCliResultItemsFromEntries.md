---
editUrl: false
next: false
prev: false
title: createBookmarkCliResultItemsFromEntries
slug: 1.3.2/api/presentation/cli/bookmark-cli-view-model/functions/createbookmarkcliresultitemsfromentries
---

> **createBookmarkCliResultItemsFromEntries**(`entries`, `options?`): readonly [`BookmarkCliResultItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-view-model.ts:167](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-view-model.ts#L167)

Bookmark CLI entry一覧をCLI表示item一覧へ変換します。

## Parameters

### entries

readonly [`BookmarkCliEntry`](/1.3.2/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Bookmark CLI entry一覧です。

### options?

[`BookmarkCliResultDetailOptions`](/1.3.2/api/presentation/cli/bookmark-cli-result-details/interfaces/bookmarkcliresultdetailoptions/) = `defaultEntryResultItemsOptions`

Bookmark entry変換optionです。

## Returns

readonly [`BookmarkCliResultItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

CLI表示item一覧です。
