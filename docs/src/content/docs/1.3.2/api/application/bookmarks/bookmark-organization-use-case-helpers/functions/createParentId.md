---
editUrl: false
next: false
prev: false
title: createParentId
slug: 1.3.2/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createparentid
---

> **createParentId**(`bookmarkTree`, `folderPath`): `string` | `undefined`

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:133](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L133)

Chrome mutationへ渡すparentIdを作成。

## Parameters

### bookmarkTree

[`BookmarkTree`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

Bookmark Tree。

### folderPath

`string`

folder path。

## Returns

`string` | `undefined`

parent ID。CLI rootではroot保存用container IDを返す。

## Example

```ts
const result = createParentId(bookmarkTree, folderPath);
```
