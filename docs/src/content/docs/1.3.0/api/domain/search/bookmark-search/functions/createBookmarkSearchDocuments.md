---
editUrl: false
next: false
prev: false
title: createBookmarkSearchDocuments
slug: 1.3.0/api/domain/search/bookmark-search/functions/createbookmarksearchdocuments
---

> **createBookmarkSearchDocuments**(`entries`): readonly [`BookmarkSearchDocument`](/1.3.0/api/domain/search/bookmark-search/interfaces/bookmarksearchdocument/)\[]

Defined in: [domain/search/bookmark-search.ts:243](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/search/bookmark-search.ts#L243)

Bookmark Entry一覧からFuse.js検索document一覧を作ります。

## Parameters

### entries

readonly [`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

変換するBookmark Entry一覧です。

## Returns

readonly [`BookmarkSearchDocument`](/1.3.0/api/domain/search/bookmark-search/interfaces/bookmarksearchdocument/)\[]

Fuse.jsへ渡す検索document一覧です。

## Example

```ts
const result = createBookmarkSearchDocuments(bookmarkTree.entries);
```
