---
editUrl: false
next: false
prev: false
title: ChromeBookmarksMutationApi
slug: 1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksmutationapi
---

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:44](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L44)

Chrome Bookmarks APIのうち書き込みadapterが使うshapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/bookmarks

## Extends

* [`ChromeBookmarksApi`](/1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/)

## Properties

### create

> `readonly` **create**: (`createProperties`) => `Promise`\<[`RawBookmarkTreeNode`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L31)

Chrome Bookmarkを作成します。

#### Parameters

##### createProperties

[`ChromeBookmarkCreateProperties`](/1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarkcreateproperties/)

#### Returns

`Promise`\<[`RawBookmarkTreeNode`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)>

#### Inherited from

[`ChromeBookmarksApi`](/1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/).[`create`](/1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/#create)

***

### getTree

> `readonly` **getTree**: () => `Promise`\<readonly [`RawBookmarkTreeNode`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)\[]>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L37)

Chrome Bookmark Treeを取得します。

#### Returns

`Promise`\<readonly [`RawBookmarkTreeNode`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)\[]>

#### Inherited from

[`ChromeBookmarksApi`](/1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/).[`getTree`](/1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/#gettree)

***

### move

> `readonly` **move**: (`id`, `destination`) => `Promise`\<[`RawBookmarkTreeNode`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L48)

Chrome Bookmarkを移動します。

#### Parameters

##### id

`string`

##### destination

[`ChromeBookmarkMoveDestination`](/1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarkmovedestination/)

#### Returns

`Promise`\<[`RawBookmarkTreeNode`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)>

***

### remove

> `readonly` **remove**: (`id`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:55](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L55)

Chrome Bookmarkを削除します。

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`void`>

***

### removeTree

> `readonly` **removeTree**: (`id`) => `Promise`\<`void`>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:59](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L59)

Chrome Bookmark folder subtreeを削除します。

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`void`>

***

### update

> `readonly` **update**: (`id`, `changes`) => `Promise`\<[`RawBookmarkTreeNode`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)>

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:63](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/bookmarks-adapter.ts#L63)

Chrome Bookmarkを更新します。

#### Parameters

##### id

`string`

##### changes

[`ChromeBookmarkUpdateProperties`](/1.2.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarkupdateproperties/)

#### Returns

`Promise`\<[`RawBookmarkTreeNode`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/rawbookmarktreenode/)>
