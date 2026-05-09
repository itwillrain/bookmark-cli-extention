---
editUrl: false
next: false
prev: false
title: createPersistedCurrentDirectory
slug: 1.3.2/api/domain/storage/extension-state/functions/createpersistedcurrentdirectory
---

> **createPersistedCurrentDirectory**(`bookmarkId`, `folderPath`, `updatedAt`): [`PersistedCurrentDirectory`](/1.3.2/api/domain/storage/extension-state/interfaces/persistedcurrentdirectory/)

Defined in: [domain/storage/extension-state.ts:102](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/storage/extension-state.ts#L102)

保存済み現在ディレクトリを作成。

## Parameters

### bookmarkId

`string`

Chrome Bookmark Manager上のfolder ID。

### folderPath

`string`

folder path。

### updatedAt

`string`

更新日時ISO文字列。

## Returns

[`PersistedCurrentDirectory`](/1.3.2/api/domain/storage/extension-state/interfaces/persistedcurrentdirectory/)

保存済み現在ディレクトリ。

## Example

```ts
const result = createPersistedCurrentDirectory(bookmarkId, folderPath, updatedAt);
```
