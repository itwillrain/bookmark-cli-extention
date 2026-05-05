---
editUrl: false
next: false
prev: false
title: entryMatchesVirtualTags
slug: 1.2.0/api/domain/tags/virtual-tag/functions/entrymatchesvirtualtags
---

> **entryMatchesVirtualTags**(`entry`, `virtualTagsByBookmarkId`, `tags`): `boolean`

Defined in: [domain/tags/virtual-tag.ts:261](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/tags/virtual-tag.ts#L261)

Bookmark Entryが指定された仮想タグをすべて持つかを判定。

## Parameters

### entry

[`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)

Bookmark Entry。

### virtualTagsByBookmarkId

[`VirtualTagsByBookmarkId`](/1.2.0/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Bookmark ID別仮想タグ。

### tags

readonly `string`\[]

必須仮想タグ一覧。

## Returns

`boolean`

すべて持っていればtrue。

## Example

```ts
const result = entryMatchesVirtualTags(entry, { [entry.id]: ["finance"] }, ["finance"]);
// true
```
