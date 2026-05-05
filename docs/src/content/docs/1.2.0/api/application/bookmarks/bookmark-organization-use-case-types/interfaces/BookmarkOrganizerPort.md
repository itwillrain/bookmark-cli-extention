---
editUrl: false
next: false
prev: false
title: BookmarkOrganizerPort
slug: 1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport
---

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L42)

Bookmark整理port。

## Properties

### createFolder

> `readonly` **createFolder**: (`input`) => `Promise`\<[`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:44](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L44)

Folderを作成。

#### Parameters

##### input

[`CreateFolderInput`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/createfolderinput/)

#### Returns

`Promise`\<[`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

***

### moveEntry

> `readonly` **moveEntry**: (`input`) => `Promise`\<[`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L46)

Bookmarkを移動。

#### Parameters

##### input

[`MoveEntryInput`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/moveentryinput/)

#### Returns

`Promise`\<[`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

***

### removeEntry

> `readonly` **removeEntry**: (`input`) => `Promise`\<`void`>

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L48)

Bookmarkを削除。

#### Parameters

##### input

[`RemoveEntryInput`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/removeentryinput/)

#### Returns

`Promise`\<`void`>

***

### removeFolderTree

> `readonly` **removeFolderTree**: (`input`) => `Promise`\<`void`>

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:50](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L50)

Folder subtreeを削除。

#### Parameters

##### input

[`RemoveFolderTreeInput`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/removefoldertreeinput/)

#### Returns

`Promise`\<`void`>

***

### renameEntry

> `readonly` **renameEntry**: (`input`) => `Promise`\<[`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:52](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L52)

Bookmark名を変更。

#### Parameters

##### input

[`RenameEntryInput`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/renameentryinput/)

#### Returns

`Promise`\<[`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)>
