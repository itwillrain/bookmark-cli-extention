---
editUrl: false
next: false
prev: false
title: createBookmarkSearchResultsFromEntries
slug: 1.3.0/api/domain/search/bookmark-search/functions/createbookmarksearchresultsfromentries
---

> **createBookmarkSearchResultsFromEntries**(`entries`): readonly [`BookmarkSearchResult`](/1.3.0/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

Defined in: [domain/search/bookmark-search.ts:272](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/search/bookmark-search.ts#L272)

Bookmark Entry一覧を完全一致相当の検索結果へ変換します。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

検索結果として扱うBookmark Entry一覧です。

## Returns

readonly [`BookmarkSearchResult`](/1.3.0/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

検索結果一覧です。

## Example

```ts
const result = createBookmarkSearchResultsFromEntries(bookmarkTree.bookmarks);
```
