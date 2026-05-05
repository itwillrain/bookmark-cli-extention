---
editUrl: false
next: false
prev: false
title: resolveBookmarkSearchResultByResultNumber
slug: 1.2.0/api/application/bookmarks/go-bookmark-result-number/functions/resolvebookmarksearchresultbyresultnumber
---

> **resolveBookmarkSearchResultByResultNumber**(`input`): [`BookmarkSearchResultByResultNumber`](/1.2.0/api/application/bookmarks/go-bookmark-result-number/type-aliases/bookmarksearchresultbyresultnumber/)

Defined in: [application/bookmarks/go-bookmark-result-number.ts:66](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/go-bookmark-result-number.ts#L66)

直前結果番号からBookmark検索結果を解決します。

## Parameters

### input

[`ResolveBookmarkSearchResultByResultNumberInput`](/1.2.0/api/application/bookmarks/go-bookmark-result-number/interfaces/resolvebookmarksearchresultbyresultnumberinput/)

直前結果番号解決入力です。

## Returns

[`BookmarkSearchResultByResultNumber`](/1.2.0/api/application/bookmarks/go-bookmark-result-number/type-aliases/bookmarksearchresultbyresultnumber/)

Bookmark検索結果。解決できない場合はfalseです。

## Example

```ts
const result = resolveBookmarkSearchResultByResultNumber({
  lastResultEntries,
  query: "2",
});
```
