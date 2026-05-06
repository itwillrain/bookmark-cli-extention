---
editUrl: false
next: false
prev: false
title: BookmarkCliResultDetailOptions
slug: 1.3.1/api/presentation/cli/bookmark-cli-result-details/interfaces/bookmarkcliresultdetailoptions
---

Defined in: [presentation/cli/bookmark-cli-result-details.ts:8](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-result-details.ts#L8)

Bookmark entry詳細変換option。

## Properties

### long

> `readonly` **long**: `boolean`

Defined in: [presentation/cli/bookmark-cli-result-details.ts:10](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-result-details.ts#L10)

詳細情報を表示するか。

***

### usageByBookmarkId?

> `readonly` `optional` **usageByBookmarkId?**: `Readonly`\<`Record`\<`string`, [`BookmarkUsage`](/1.3.1/api/domain/storage/extension-state/interfaces/bookmarkusage/)>>

Defined in: [presentation/cli/bookmark-cli-result-details.ts:12](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-result-details.ts#L12)

Bookmark IDごとの利用統計。

***

### virtualTagsByBookmarkId?

> `readonly` `optional` **virtualTagsByBookmarkId?**: `Readonly`\<`Record`\<`string`, readonly `string`\[]>>

Defined in: [presentation/cli/bookmark-cli-result-details.ts:14](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-result-details.ts#L14)

Bookmark IDごとの仮想タグ一覧。
