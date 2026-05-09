---
editUrl: false
next: false
prev: false
title: PersistedCurrentDirectory
slug: 1.3.2/api/domain/storage/extension-state/interfaces/persistedcurrentdirectory
---

Defined in: [domain/storage/extension-state.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/storage/extension-state.ts#L29)

拡張機能の保存済み現在ディレクトリ。

## Properties

### bookmarkId

> `readonly` **bookmarkId**: `string`

Defined in: [domain/storage/extension-state.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/storage/extension-state.ts#L31)

Chrome Bookmark Manager上のfolder ID。

***

### folderPath

> `readonly` **folderPath**: `string`

Defined in: [domain/storage/extension-state.ts:33](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/storage/extension-state.ts#L33)

表示とfallbackに使うfolder path。

***

### updatedAt

> `readonly` **updatedAt**: `string`

Defined in: [domain/storage/extension-state.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/storage/extension-state.ts#L35)

更新日時ISO文字列。
