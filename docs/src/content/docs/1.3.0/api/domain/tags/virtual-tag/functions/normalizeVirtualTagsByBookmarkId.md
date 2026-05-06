---
editUrl: false
next: false
prev: false
title: normalizeVirtualTagsByBookmarkId
slug: 1.3.0/api/domain/tags/virtual-tag/functions/normalizevirtualtagsbybookmarkid
---

> **normalizeVirtualTagsByBookmarkId**(`virtualTagsByBookmarkId?`): [`VirtualTagsByBookmarkId`](/1.3.0/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Defined in: [domain/tags/virtual-tag.ts:307](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/tags/virtual-tag.ts#L307)

未指定の仮想タグrecordを空recordへ補正。

## Parameters

### virtualTagsByBookmarkId?

`Readonly`\<`Record`\<`string`, readonly `string`\[]>>

Bookmark ID別仮想タグ。

## Returns

[`VirtualTagsByBookmarkId`](/1.3.0/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Bookmark ID別仮想タグ。

## Example

```ts
const result = normalizeVirtualTagsByBookmarkId(undefined);
// {}
```
