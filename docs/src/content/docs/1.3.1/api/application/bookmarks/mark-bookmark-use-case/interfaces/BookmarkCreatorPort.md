---
editUrl: false
next: false
prev: false
title: BookmarkCreatorPort
slug: 1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport
---

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:36](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L36)

Bookmark作成port。

## Properties

### createBookmark

> `readonly` **createBookmark**: (`input`) => `Promise`\<[`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L38)

Bookmarkを作成。

#### Parameters

##### input

[`CreatedBookmarkInput`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/createdbookmarkinput/)

#### Returns

`Promise`\<[`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>
