---
editUrl: false
next: false
prev: false
title: getVirtualTagsForBookmark
slug: 1.3.0/api/domain/tags/virtual-tag/functions/getvirtualtagsforbookmark
---

> **getVirtualTagsForBookmark**(`virtualTagsByBookmarkId`, `bookmarkId`): readonly `string`\[]

Defined in: [domain/tags/virtual-tag.ts:99](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/tags/virtual-tag.ts#L99)

Bookmark IDに紐づく仮想タグ一覧を取得。

## Parameters

### virtualTagsByBookmarkId

[`VirtualTagsByBookmarkId`](/1.3.0/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

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
