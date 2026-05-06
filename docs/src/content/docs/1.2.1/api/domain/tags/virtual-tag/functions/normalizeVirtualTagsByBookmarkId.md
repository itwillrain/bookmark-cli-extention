---
editUrl: false
next: false
prev: false
title: normalizeVirtualTagsByBookmarkId
slug: 1.2.1/api/domain/tags/virtual-tag/functions/normalizevirtualtagsbybookmarkid
---

> **normalizeVirtualTagsByBookmarkId**(`virtualTagsByBookmarkId?`): [`VirtualTagsByBookmarkId`](/1.2.1/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Defined in: [domain/tags/virtual-tag.ts:307](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/tags/virtual-tag.ts#L307)

未指定の仮想タグrecordを空recordへ補正。

## Parameters

### virtualTagsByBookmarkId?

`Readonly`\<`Record`\<`string`, readonly `string`\[]>>

Bookmark ID別仮想タグ。

## Returns

[`VirtualTagsByBookmarkId`](/1.2.1/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Bookmark ID別仮想タグ。

## Example

```ts
const result = normalizeVirtualTagsByBookmarkId(undefined);
// {}
```
