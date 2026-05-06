---
editUrl: false
next: false
prev: false
title: UsageBookmarksInput
slug: 1.3.0/api/application/bookmarks/bookmark-usage-use-case/interfaces/usagebookmarksinput
---

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-usage-use-case.ts#L15)

利用統計Bookmark一覧入力。

## Properties

### limit?

> `readonly` `optional` **limit?**: `number`

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-usage-use-case.ts#L17)

表示件数。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-usage-use-case.ts#L19)

Bookmark Tree取得port。

***

### usageByBookmarkId

> `readonly` **usageByBookmarkId**: [`UsageByBookmarkId`](/1.3.0/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

Defined in: [application/bookmarks/bookmark-usage-use-case.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-usage-use-case.ts#L21)

Bookmark IDごとの利用統計。
