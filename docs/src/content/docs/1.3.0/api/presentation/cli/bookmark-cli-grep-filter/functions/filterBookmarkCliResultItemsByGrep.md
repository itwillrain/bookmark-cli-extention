---
editUrl: false
next: false
prev: false
title: filterBookmarkCliResultItemsByGrep
slug: 1.3.0/api/presentation/cli/bookmark-cli-grep-filter/functions/filterbookmarkcliresultitemsbygrep
---

> **filterBookmarkCliResultItemsByGrep**(`resultItems`, `queryInput`): [`BookmarkCliGrepFilterResult`](/1.3.0/api/presentation/cli/bookmark-cli-grep-filter/interfaces/bookmarkcligrepfilterresult/)

Defined in: [presentation/cli/bookmark-cli-grep-filter.ts:76](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-grep-filter.ts#L76)

Result item一覧をgrep queryで絞り込みます。

## Parameters

### resultItems

readonly [`BookmarkCliResultItem`](/1.3.0/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

result item一覧です。

### queryInput

`string`

grep query入力です。

## Returns

[`BookmarkCliGrepFilterResult`](/1.3.0/api/presentation/cli/bookmark-cli-grep-filter/interfaces/bookmarkcligrepfilterresult/)

grep filter結果です。
