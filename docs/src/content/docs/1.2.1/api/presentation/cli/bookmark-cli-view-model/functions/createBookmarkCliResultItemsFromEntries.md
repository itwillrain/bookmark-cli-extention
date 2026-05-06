---
editUrl: false
next: false
prev: false
title: createBookmarkCliResultItemsFromEntries
slug: 1.2.1/api/presentation/cli/bookmark-cli-view-model/functions/createbookmarkcliresultitemsfromentries
---

> **createBookmarkCliResultItemsFromEntries**(`entries`, `options?`): readonly [`BookmarkCliResultItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-view-model.ts:167](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-view-model.ts#L167)

Bookmark CLI entry一覧をCLI表示item一覧へ変換します。

## Parameters

### entries

readonly [`BookmarkCliEntry`](/1.2.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Bookmark CLI entry一覧です。

### options?

[`BookmarkCliResultDetailOptions`](/1.2.1/api/presentation/cli/bookmark-cli-result-details/interfaces/bookmarkcliresultdetailoptions/) = `defaultEntryResultItemsOptions`

Bookmark entry変換optionです。

## Returns

readonly [`BookmarkCliResultItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

CLI表示item一覧です。
