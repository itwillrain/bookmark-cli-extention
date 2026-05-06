---
editUrl: false
next: false
prev: false
title: UsageBookmarksInput
slug: 1.3.1/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksinput
---

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/bookmark-usage-use-case.ts#L15)

利用統計Bookmark一覧入力。

## Properties

### limit?

> `readonly` `optional` **limit?**: `number`

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/bookmark-usage-use-case.ts#L17)

表示件数。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/bookmark-usage-use-case.ts#L19)

Bookmark Tree取得port。

***

### usageByBookmarkId

> `readonly` **usageByBookmarkId**: [`UsageByBookmarkId`](/1.3.1/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/bookmark-usage-use-case.ts#L21)

Bookmark IDごとの利用統計。
