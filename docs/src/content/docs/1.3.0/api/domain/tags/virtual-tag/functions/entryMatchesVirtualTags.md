---
editUrl: false
next: false
prev: false
title: entryMatchesVirtualTags
slug: 1.3.0/api/domain/tags/virtual-tag/functions/entrymatchesvirtualtags
---

> **entryMatchesVirtualTags**(`entry`, `virtualTagsByBookmarkId`, `tags`): `boolean`

Defined in: [domain/tags/virtual-tag.ts:261](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/tags/virtual-tag.ts#L261)

Bookmark Entryが指定された仮想タグをすべて持つかを判定。

## Parameters

### entry

[`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)

Bookmark Entry。

### virtualTagsByBookmarkId

[`VirtualTagsByBookmarkId`](/1.3.0/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

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
