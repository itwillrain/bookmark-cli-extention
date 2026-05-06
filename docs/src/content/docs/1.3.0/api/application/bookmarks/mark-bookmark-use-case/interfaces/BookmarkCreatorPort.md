---
editUrl: false
next: false
prev: false
title: BookmarkCreatorPort
slug: 1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport
---

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:36](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/mark-bookmark-use-case.ts#L36)

Bookmark作成port。

## Properties

### createBookmark

> `readonly` **createBookmark**: (`input`) => `Promise`\<[`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/mark-bookmark-use-case.ts#L38)

Bookmarkを作成。

#### Parameters

##### input

[`CreatedBookmarkInput`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/createdbookmarkinput/)

#### Returns

`Promise`\<[`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>
