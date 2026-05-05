---
editUrl: false
next: false
prev: false
title: ChromeBookmarkCreateProperties
slug: 1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarkcreateproperties
---

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:73](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L73)

Chrome Bookmarks APIでbookmarkを作成する入力です。

## See

https://developer.chrome.com/docs/extensions/reference/api/bookmarks#method-create

## Properties

### parentId?

> `readonly` `optional` **parentId?**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:77](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L77)

保存先parent folder IDです。

***

### title

> `readonly` **title**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:81](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L81)

Bookmark titleです。

***

### url?

> `readonly` `optional` **url?**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L85)

Bookmark URLです。
