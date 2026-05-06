---
editUrl: false
next: false
prev: false
title: tagBookmark
slug: 1.2.1/api/application/bookmarks/tag-bookmark-use-case/functions/tagbookmark
---

> **tagBookmark**(`input`): [`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`TagBookmarkValue`](/1.2.1/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkvalue/)>

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:140](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/tag-bookmark-use-case.ts#L140)

Bookmarkへ仮想タグを追加または削除。

## Parameters

### input

[`TagBookmarkInput`](/1.2.1/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkinput/)

仮想タグ更新入力。

## Returns

[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`TagBookmarkValue`](/1.2.1/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkvalue/)>

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
