---
editUrl: false
next: false
prev: false
title: SanitizeExtensionStateInput
slug: 1.3.0/api/domain/storage/extension-state-cleanup/interfaces/sanitizeextensionstateinput
---

Defined in: [domain/storage/extension-state-cleanup.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/extension-state-cleanup.ts#L23)

拡張状態掃除入力。

## Properties

### bookmarkTree

> `readonly` **bookmarkTree**: [`BookmarkTree`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

Defined in: [domain/storage/extension-state-cleanup.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/extension-state-cleanup.ts#L27)

Bookmark Tree。

***

### state

> `readonly` **state**: [`ExtensionState`](/1.3.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state-cleanup.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/extension-state-cleanup.ts#L25)

現在の拡張状態。

***

### updatedAt

> `readonly` **updatedAt**: `string`

Defined in: [domain/storage/extension-state-cleanup.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/extension-state-cleanup.ts#L29)

掃除時の更新日時ISO文字列。
