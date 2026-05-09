---
editUrl: false
next: false
prev: false
title: createBookmarkSearchResultsFromEntries
slug: 1.3.2/api/domain/search/bookmark-search/functions/createbookmarksearchresultsfromentries
---

> **createBookmarkSearchResultsFromEntries**(`entries`): readonly [`BookmarkSearchResult`](/1.3.2/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

Defined in: [domain/search/bookmark-search.ts:272](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/search/bookmark-search.ts#L272)

Bookmark Entry一覧を完全一致相当の検索結果へ変換します。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

検索結果として扱うBookmark Entry一覧です。

## Returns

readonly [`BookmarkSearchResult`](/1.3.2/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

検索結果一覧です。

## Example

```ts
const result = createBookmarkSearchResultsFromEntries(bookmarkTree.bookmarks);
```
