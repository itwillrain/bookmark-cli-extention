---
editUrl: false
next: false
prev: false
title: removeVirtualTagsFromBookmark
slug: 1.3.2/api/domain/tags/virtual-tag/functions/removevirtualtagsfrombookmark
---

> **removeVirtualTagsFromBookmark**(`state`, `bookmarkId`, `tagInputs`): [`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/tags/virtual-tag.ts:170](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/tags/virtual-tag.ts#L170)

Bookmarkから仮想タグを削除。

## Parameters

### state

[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

現在の拡張状態。

### bookmarkId

`string`

対象Bookmark ID。

### tagInputs

readonly `string`\[]

削除する仮想タグ入力。

## Returns

[`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

仮想タグ削除後の拡張状態。

## Example

```ts
const result = removeVirtualTagsFromBookmark(state, "bookmark-1", ["#prod"]);
```
