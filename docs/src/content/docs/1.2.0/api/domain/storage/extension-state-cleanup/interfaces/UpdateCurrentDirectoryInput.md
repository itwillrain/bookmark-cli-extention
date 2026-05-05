---
editUrl: false
next: false
prev: false
title: UpdateCurrentDirectoryInput
slug: 1.2.0/api/domain/storage/extension-state-cleanup/interfaces/updatecurrentdirectoryinput
---

Defined in: [domain/storage/extension-state-cleanup.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/extension-state-cleanup.ts#L11)

現在ディレクトリ更新入力。

## Properties

### bookmarkTree

> `readonly` **bookmarkTree**: [`BookmarkTree`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarktree/)

Defined in: [domain/storage/extension-state-cleanup.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/extension-state-cleanup.ts#L15)

Bookmark Tree。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [domain/storage/extension-state-cleanup.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/extension-state-cleanup.ts#L17)

実行後の現在ディレクトリ。

***

### state

> `readonly` **state**: [`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [domain/storage/extension-state-cleanup.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/extension-state-cleanup.ts#L13)

現在の拡張状態。

***

### updatedAt

> `readonly` **updatedAt**: `string`

Defined in: [domain/storage/extension-state-cleanup.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/storage/extension-state-cleanup.ts#L19)

更新日時ISO文字列。
