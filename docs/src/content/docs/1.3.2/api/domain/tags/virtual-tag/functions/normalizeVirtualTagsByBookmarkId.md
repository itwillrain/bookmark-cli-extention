---
editUrl: false
next: false
prev: false
title: normalizeVirtualTagsByBookmarkId
slug: 1.3.2/api/domain/tags/virtual-tag/functions/normalizevirtualtagsbybookmarkid
---

> **normalizeVirtualTagsByBookmarkId**(`virtualTagsByBookmarkId?`): [`VirtualTagsByBookmarkId`](/1.3.2/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Defined in: [domain/tags/virtual-tag.ts:307](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/tags/virtual-tag.ts#L307)

未指定の仮想タグrecordを空recordへ補正。

## Parameters

### virtualTagsByBookmarkId?

`Readonly`\<`Record`\<`string`, readonly `string`\[]>>

Bookmark ID別仮想タグ。

## Returns

[`VirtualTagsByBookmarkId`](/1.3.2/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Bookmark ID別仮想タグ。

## Example

```ts
const result = normalizeVirtualTagsByBookmarkId(undefined);
// {}
```
