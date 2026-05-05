---
editUrl: false
next: false
prev: false
title: removeVirtualTagsFromBookmark
slug: 1.2.0/api/domain/tags/virtual-tag/functions/removevirtualtagsfrombookmark
---

> **removeVirtualTagsFromBookmark**(`state`, `bookmarkId`, `tagInputs`): [`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/tags/virtual-tag.ts:170](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/tags/virtual-tag.ts#L170)

Bookmarkから仮想タグを削除。

## Parameters

### state

[`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

現在の拡張状態。

### bookmarkId

`string`

対象Bookmark ID。

### tagInputs

readonly `string`\[]

削除する仮想タグ入力。

## Returns

[`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

仮想タグ削除後の拡張状態。

## Example

```ts
const result = removeVirtualTagsFromBookmark(state, "bookmark-1", ["#prod"]);
```
