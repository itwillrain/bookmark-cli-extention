---
editUrl: false
next: false
prev: false
title: ChromeBookmarkCreateProperties
slug: 1.3.2/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarkcreateproperties
---

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:77](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmarks-adapter.ts#L77)

Chrome Bookmarks APIでbookmarkを作成する入力です。

## See

https://developer.chrome.com/docs/extensions/reference/api/bookmarks#method-create

## Properties

### parentId?

> `readonly` `optional` **parentId?**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:81](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmarks-adapter.ts#L81)

保存先parent folder IDです。

***

### title

> `readonly` **title**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmarks-adapter.ts#L85)

Bookmark titleです。

***

### url?

> `readonly` `optional` **url?**: `string`

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:89](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmarks-adapter.ts#L89)

Bookmark URLです。
