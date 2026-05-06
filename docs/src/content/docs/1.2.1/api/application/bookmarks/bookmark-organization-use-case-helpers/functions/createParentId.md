---
editUrl: false
next: false
prev: false
title: createParentId
slug: 1.2.1/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createparentid
---

> **createParentId**(`bookmarkTree`, `folderPath`): `string` | `undefined`

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:133](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L133)

Chrome mutationへ渡すparentIdを作成。

## Parameters

### bookmarkTree

[`BookmarkTree`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

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
