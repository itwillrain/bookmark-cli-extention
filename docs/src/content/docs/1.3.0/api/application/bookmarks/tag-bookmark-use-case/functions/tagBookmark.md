---
editUrl: false
next: false
prev: false
title: tagBookmark
slug: 1.3.0/api/application/bookmarks/tag-bookmark-use-case/functions/tagbookmark
---

> **tagBookmark**(`input`): [`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`TagBookmarkValue`](/1.3.0/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkvalue/)>

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:140](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tag-bookmark-use-case.ts#L140)

Bookmarkへ仮想タグを追加または削除。

## Parameters

### input

[`TagBookmarkInput`](/1.3.0/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkinput/)

仮想タグ更新入力。

## Returns

[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`TagBookmarkValue`](/1.3.0/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkvalue/)>

仮想タグ更新結果。

## Example

```ts
const result = tagBookmark({
  extensionState,
  lastResultEntries,
  remove: false,
  tagInputs: ["#prod", "finance"],
  targetInput: "2",
});
```
