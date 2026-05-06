---
editUrl: false
next: false
prev: false
title: filterBookmarkCliResultItemsByGrep
slug: 1.2.1/api/presentation/cli/bookmark-cli-grep-filter/functions/filterbookmarkcliresultitemsbygrep
---

> **filterBookmarkCliResultItemsByGrep**(`resultItems`, `queryInput`): [`BookmarkCliGrepFilterResult`](/1.2.1/api/presentation/cli/bookmark-cli-grep-filter/interfaces/bookmarkcligrepfilterresult/)

Defined in: [presentation/cli/bookmark-cli-grep-filter.ts:76](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-grep-filter.ts#L76)

Result item一覧をgrep queryで絞り込みます。

## Parameters

### resultItems

readonly [`BookmarkCliResultItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

result item一覧です。

### queryInput

`string`

grep query入力です。

## Returns

[`BookmarkCliGrepFilterResult`](/1.2.1/api/presentation/cli/bookmark-cli-grep-filter/interfaces/bookmarkcligrepfilterresult/)

grep filter結果です。
