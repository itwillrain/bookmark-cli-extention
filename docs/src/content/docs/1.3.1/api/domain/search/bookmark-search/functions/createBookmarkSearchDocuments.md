---
editUrl: false
next: false
prev: false
title: createBookmarkSearchDocuments
slug: 1.3.1/api/domain/search/bookmark-search/functions/createbookmarksearchdocuments
---

> **createBookmarkSearchDocuments**(`entries`): readonly [`BookmarkSearchDocument`](/1.3.1/api/domain/search/bookmark-search/interfaces/bookmarksearchdocument/)\[]

Defined in: [domain/search/bookmark-search.ts:243](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/search/bookmark-search.ts#L243)

Bookmark Entry一覧からFuse.js検索document一覧を作ります。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

変換するBookmark Entry一覧です。

## Returns

readonly [`BookmarkSearchDocument`](/1.3.1/api/domain/search/bookmark-search/interfaces/bookmarksearchdocument/)\[]

Fuse.jsへ渡す検索document一覧です。

## Example

```ts
const result = createBookmarkSearchDocuments(bookmarkTree.entries);
```
