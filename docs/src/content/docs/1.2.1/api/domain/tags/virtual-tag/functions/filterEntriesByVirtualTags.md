---
editUrl: false
next: false
prev: false
title: filterEntriesByVirtualTags
slug: 1.2.1/api/domain/tags/virtual-tag/functions/filterentriesbyvirtualtags
---

> **filterEntriesByVirtualTags**(`entries`, `virtualTagsByBookmarkId`, `tags`): readonly [`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/tags/virtual-tag.ts:290](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/tags/virtual-tag.ts#L290)

Bookmark Entry一覧を仮想タグ条件で絞り込み。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Bookmark Entry一覧。

### virtualTagsByBookmarkId

[`VirtualTagsByBookmarkId`](/1.2.1/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Bookmark ID別仮想タグ。

### tags

readonly `string`\[]

必須仮想タグ一覧。

## Returns

readonly [`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

絞り込み後のBookmark Entry一覧。

## Example

```ts
const result = filterEntriesByVirtualTags(entries, virtualTagsByBookmarkId, ["finance"]);
```
