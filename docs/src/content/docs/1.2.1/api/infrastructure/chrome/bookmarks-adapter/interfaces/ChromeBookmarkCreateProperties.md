---
editUrl: false
next: false
prev: false
title: ChromeBookmarkCreateProperties
slug: 1.2.1/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarkcreateproperties
---

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:73](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/bookmarks-adapter.ts#L73)

Chrome Bookmarks APIでbookmarkを作成する入力です。

## See

https://developer.chrome.com/docs/extensions/reference/api/bookmarks#method-create

## Properties

### parentId?

> `readonly` `optional` **parentId?**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:77](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/bookmarks-adapter.ts#L77)

保存先parent folder IDです。

***

### title

> `readonly` **title**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:81](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/bookmarks-adapter.ts#L81)

Bookmark titleです。

***

### url?

> `readonly` `optional` **url?**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/bookmarks-adapter.ts#L85)

Bookmark URLです。
