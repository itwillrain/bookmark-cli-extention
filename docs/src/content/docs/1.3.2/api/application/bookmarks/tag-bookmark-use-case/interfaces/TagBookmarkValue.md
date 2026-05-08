---
editUrl: false
next: false
prev: false
title: TagBookmarkValue
slug: 1.3.2/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkvalue
---

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:32](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/tag-bookmark-use-case.ts#L32)

仮想タグ更新成功値。

## Properties

### entry

> `readonly` **entry**: [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/) & `object`

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/tag-bookmark-use-case.ts#L34)

更新対象Bookmark Entry。

#### Type Declaration

##### kind

> `readonly` **kind**: `"bookmark"`

##### url

> `readonly` **url**: `string`

***

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:36](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/tag-bookmark-use-case.ts#L36)

更新後の拡張状態。

***

### tags

> `readonly` **tags**: readonly `string`\[]

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/tag-bookmark-use-case.ts#L38)

更新対象の仮想タグ一覧。
