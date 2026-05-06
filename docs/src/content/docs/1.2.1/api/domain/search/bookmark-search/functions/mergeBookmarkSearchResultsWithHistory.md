---
editUrl: false
next: false
prev: false
title: mergeBookmarkSearchResultsWithHistory
slug: 1.2.1/api/domain/search/bookmark-search/functions/mergebookmarksearchresultswithhistory
---

> **mergeBookmarkSearchResultsWithHistory**(`input`): readonly [`BookmarkSearchResult`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

Defined in: [domain/search/bookmark-search.ts:456](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L456)

Bookmark検索結果とChrome履歴候補をmergeします。

## Parameters

### input

merge入力です。

#### bookmarkResults

readonly [`BookmarkSearchResult`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

Bookmark検索結果一覧です。

#### historyEntries

readonly [`BrowserHistoryEntry`](/1.2.1/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]

Chrome履歴entry一覧です。

## Returns

readonly [`BookmarkSearchResult`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchresult/)\[]

merge済み検索結果一覧です。

## Example

```ts
const result = mergeBookmarkSearchResultsWithHistory({
  bookmarkResults,
  historyEntries,
});
```
