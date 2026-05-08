---
editUrl: false
next: false
prev: false
title: tagBookmark
slug: 1.3.2/api/application/bookmarks/tag-bookmark-use-case/functions/tagbookmark
---

> **tagBookmark**(`input`): [`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`TagBookmarkValue`](/1.3.2/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkvalue/)>

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:140](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/tag-bookmark-use-case.ts#L140)

Bookmarkへ仮想タグを追加または削除。

## Parameters

### input

[`TagBookmarkInput`](/1.3.2/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkinput/)

仮想タグ更新入力。

## Returns

[`BookmarkCommandResult`](/1.3.2/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`TagBookmarkValue`](/1.3.2/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkvalue/)>

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
