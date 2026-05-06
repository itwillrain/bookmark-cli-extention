---
editUrl: false
next: false
prev: false
title: ChromeBookmarksApi
slug: 1.3.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi
---

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/bookmarks-adapter.ts#L27)

Chrome Bookmarks APIのうちadapterが使う最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/bookmarks

## Extended by

* [`ChromeBookmarksMutationApi`](/1.3.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksmutationapi/)

## Properties

### create

> `readonly` **create**: (`createProperties`) => `Promise`\<[`RawBookmarkTreeNode`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/bookmarks-adapter.ts#L31)

Chrome Bookmarkを作成します。

#### Parameters

##### createProperties

[`ChromeBookmarkCreateProperties`](/1.3.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarkcreateproperties/)

#### Returns

`Promise`\<[`RawBookmarkTreeNode`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)>

***

### getTree

> `readonly` **getTree**: () => `Promise`\<readonly [`RawBookmarkTreeNode`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)\[]>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/bookmarks-adapter.ts#L37)

Chrome Bookmark Treeを取得します。

#### Returns

`Promise`\<readonly [`RawBookmarkTreeNode`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)\[]>
