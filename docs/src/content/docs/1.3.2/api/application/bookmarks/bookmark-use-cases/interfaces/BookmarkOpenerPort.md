---
editUrl: false
next: false
prev: false
title: BookmarkOpenerPort
slug: 1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:121](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L121)

Bookmark URLを開くportです。

## Properties

### openBookmarkUrl

> `readonly` **openBookmarkUrl**: (`url`, `context?`) => `Promise`\<`void`>

Defined in: [application/bookmarks/bookmark-use-cases.ts:125](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-use-cases.ts#L125)

Bookmark URLを開きます。

#### Parameters

##### url

`string`

##### context?

[`BookmarkOpenContext`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopencontext/)

#### Returns

`Promise`\<`void`>
