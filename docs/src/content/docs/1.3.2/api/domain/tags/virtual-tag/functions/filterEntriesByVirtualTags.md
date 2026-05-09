---
editUrl: false
next: false
prev: false
title: filterEntriesByVirtualTags
slug: 1.3.2/api/domain/tags/virtual-tag/functions/filterentriesbyvirtualtags
---

> **filterEntriesByVirtualTags**(`entries`, `virtualTagsByBookmarkId`, `tags`): readonly [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Defined in: [domain/tags/virtual-tag.ts:290](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/tags/virtual-tag.ts#L290)

Bookmark Entry一覧を仮想タグ条件で絞り込み。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

Bookmark Entry一覧。

### virtualTagsByBookmarkId

[`VirtualTagsByBookmarkId`](/1.3.2/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Bookmark ID別仮想タグ。

### tags

readonly `string`\[]

必須仮想タグ一覧。

## Returns

readonly [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

絞り込み後のBookmark Entry一覧。

## Example

```ts
const result = filterEntriesByVirtualTags(entries, virtualTagsByBookmarkId, ["finance"]);
```
