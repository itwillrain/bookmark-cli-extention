---
editUrl: false
next: false
prev: false
title: createBookmarkCliResultItemsFromEntries
slug: 1.3.0/api/presentation/cli/bookmark-cli-view-model/functions/createbookmarkcliresultitemsfromentries
---

> **createBookmarkCliResultItemsFromEntries**(`entries`, `options?`): readonly [`BookmarkCliResultItem`](/1.3.0/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-view-model.ts:167](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-view-model.ts#L167)

Bookmark CLI entry一覧をCLI表示item一覧へ変換します。

## Parameters

### entries

readonly [`BookmarkCliEntry`](/1.3.0/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Bookmark CLI entry一覧です。

### options?

[`BookmarkCliResultDetailOptions`](/1.3.0/api/presentation/cli/bookmark-cli-result-details/interfaces/bookmarkcliresultdetailoptions/) = `defaultEntryResultItemsOptions`

Bookmark entry変換optionです。

## Returns

readonly [`BookmarkCliResultItem`](/1.3.0/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

CLI表示item一覧です。
