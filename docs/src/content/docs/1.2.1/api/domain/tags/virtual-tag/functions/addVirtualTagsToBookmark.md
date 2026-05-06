---
editUrl: false
next: false
prev: false
title: addVirtualTagsToBookmark
slug: 1.2.1/api/domain/tags/virtual-tag/functions/addvirtualtagstobookmark
---

> **addVirtualTagsToBookmark**(`state`, `bookmarkId`, `tagInputs`): [`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/tags/virtual-tag.ts:136](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/tags/virtual-tag.ts#L136)

Bookmarkへ仮想タグを追加。

## Parameters

### state

[`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

現在の拡張状態。

### bookmarkId

`string`

対象Bookmark ID。

### tagInputs

readonly `string`\[]

追加する仮想タグ入力。

## Returns

[`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

仮想タグ追加後の拡張状態。

## Example

```ts
const result = addVirtualTagsToBookmark(state, "bookmark-1", ["#prod", "finance"]);
```
