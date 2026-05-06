---
editUrl: false
next: false
prev: false
title: ExtensionState
slug: 1.2.1/api/domain/storage/extension-state/interfaces/extensionstate
---

Defined in: [domain/storage/extension-state.ts:74](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state.ts#L74)

拡張機能がchrome.storage.localへ保存する状態。

## Properties

### commandHistory

> `readonly` **commandHistory**: readonly [`CommandHistoryEntry`](/1.2.1/api/domain/storage/extension-state/interfaces/commandhistoryentry/)\[]

Defined in: [domain/storage/extension-state.ts:80](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state.ts#L80)

入力履歴。

***

### currentDirectory

> `readonly` **currentDirectory**: [`PersistedCurrentDirectory`](/1.2.1/api/domain/storage/extension-state/interfaces/persistedcurrentdirectory/)

Defined in: [domain/storage/extension-state.ts:78](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state.ts#L78)

保存済み現在ディレクトリ。

***

### schemaVersion

> `readonly` **schemaVersion**: `2`

Defined in: [domain/storage/extension-state.ts:76](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state.ts#L76)

保存データschema version。

***

### settings

> `readonly` **settings**: [`ExtensionSettings`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionsettings/)

Defined in: [domain/storage/extension-state.ts:86](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state.ts#L86)

拡張機能設定。

***

### usageByBookmarkId

> `readonly` **usageByBookmarkId**: [`UsageByBookmarkId`](/1.2.1/api/domain/storage/extension-state/type-aliases/usagebybookmarkid/)

Defined in: [domain/storage/extension-state.ts:84](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state.ts#L84)

Bookmark IDごとの利用統計。

***

### virtualTagsByBookmarkId

> `readonly` **virtualTagsByBookmarkId**: [`VirtualTagsByBookmarkId`](/1.2.1/api/domain/storage/extension-state/type-aliases/virtualtagsbybookmarkid/)

Defined in: [domain/storage/extension-state.ts:82](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/storage/extension-state.ts#L82)

Bookmark IDごとの仮想タグ一覧。
