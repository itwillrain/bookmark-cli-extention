---
editUrl: false
next: false
prev: false
title: createBookmarkCliResultItems
slug: 1.2.0/api/presentation/cli/bookmark-cli-view-model/functions/createbookmarkcliresultitems
---

> **createBookmarkCliResultItems**(`results`, `options`): readonly [`BookmarkCliResultItem`](/1.2.0/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-view-model.ts:155](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-view-model.ts#L155)

Bookmark検索結果一覧をCLI表示item一覧へ変換します。

## Parameters

### results

readonly [`BookmarkSearchResult`](/1.2.0/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

Bookmark検索結果一覧です。

### options

[`BookmarkCliResultDetailOptions`](/1.2.0/api/presentation/cli/bookmark-cli-result-details/interfaces/bookmarkcliresultdetailoptions/)

Bookmark検索結果変換optionです。

## Returns

readonly [`BookmarkCliResultItem`](/1.2.0/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

CLI表示item一覧です。
