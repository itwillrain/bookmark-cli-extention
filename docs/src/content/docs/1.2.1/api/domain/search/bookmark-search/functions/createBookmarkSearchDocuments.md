---
editUrl: false
next: false
prev: false
title: createBookmarkSearchDocuments
slug: 1.2.1/api/domain/search/bookmark-search/functions/createbookmarksearchdocuments
---

> **createBookmarkSearchDocuments**(`entries`): readonly [`BookmarkSearchDocument`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchdocument/)\[]

Defined in: [domain/search/bookmark-search.ts:243](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/search/bookmark-search.ts#L243)

Bookmark Entry一覧からFuse.js検索document一覧を作ります。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

変換するBookmark Entry一覧です。

## Returns

readonly [`BookmarkSearchDocument`](/1.2.1/api/domain/search/bookmark-search/interfaces/bookmarksearchdocument/)\[]

Fuse.jsへ渡す検索document一覧です。

## Example

```ts
const result = createBookmarkSearchDocuments(bookmarkTree.entries);
```
