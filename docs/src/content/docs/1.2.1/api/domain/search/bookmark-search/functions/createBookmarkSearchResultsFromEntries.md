---
editUrl: false
next: false
prev: false
title: createBookmarkSearchResultsFromEntries
slug: 1.2.1/api/domain/search/bookmark-search/functions/createbookmarksearchresultsfromentries
---

> **createBookmarkSearchResultsFromEntries**(`entries`): readonly [`BookmarkSearchResult`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

Defined in: [domain/search/bookmark-search.ts:272](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L272)

Bookmark Entry一覧を完全一致相当の検索結果へ変換します。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

検索結果として扱うBookmark Entry一覧です。

## Returns

readonly [`BookmarkSearchResult`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

検索結果一覧です。

## Example

```ts
const result = createBookmarkSearchResultsFromEntries(bookmarkTree.bookmarks);
```
