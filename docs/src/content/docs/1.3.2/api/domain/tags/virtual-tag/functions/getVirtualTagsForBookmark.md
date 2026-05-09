---
editUrl: false
next: false
prev: false
title: getVirtualTagsForBookmark
slug: 1.3.2/api/domain/tags/virtual-tag/functions/getvirtualtagsforbookmark
---

> **getVirtualTagsForBookmark**(`virtualTagsByBookmarkId`, `bookmarkId`): readonly `string`\[]

Defined in: [domain/tags/virtual-tag.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/tags/virtual-tag.ts#L99)

Bookmark IDに紐づく仮想タグ一覧を取得。

## Parameters

### virtualTagsByBookmarkId

[`VirtualTagsByBookmarkId`](/1.3.2/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Bookmark ID別仮想タグ。

### bookmarkId

`string`

Bookmark ID。

## Returns

readonly `string`\[]

Bookmarkの仮想タグ一覧。

## Example

```ts
const result = getVirtualTagsForBookmark({ "bookmark-1": ["prod"] }, "bookmark-1");
// ["prod"]
```
