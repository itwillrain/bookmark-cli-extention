---
editUrl: false
next: false
prev: false
title: sanitizeExtensionStateForBookmarkTree
slug: 1.2.0/api/domain/storage/extension-state-cleanup/functions/sanitizeextensionstateforbookmarktree
---

> **sanitizeExtensionStateForBookmarkTree**(`input`): [`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state-cleanup.ts:161](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/extension-state-cleanup.ts#L161)

Bookmark Treeと照合して拡張状態を掃除。

## Parameters

### input

[`SanitizeExtensionStateInput`](/1.2.0/api/domain/storage/extension-state-cleanup/interfaces/sanitizeextensionstateinput/)

拡張状態掃除入力。

## Returns

[`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

掃除後の拡張状態。

## Example

```ts
const result = sanitizeExtensionStateForBookmarkTree({
  bookmarkTree,
  state,
  updatedAt: "2026-05-05T00:00:00.000Z",
});
```
