---
editUrl: false
next: false
prev: false
title: createPersistedCurrentDirectory
slug: 1.3.0/api/domain/storage/extension-state/functions/createpersistedcurrentdirectory
---

> **createPersistedCurrentDirectory**(`bookmarkId`, `folderPath`, `updatedAt`): [`PersistedCurrentDirectory`](/1.3.0/api/domain/storage/extension-state/interfaces/persistedcurrentdirectory/)

Defined in: [domain/storage/extension-state.ts:102](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/storage/extension-state.ts#L102)

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

[`PersistedCurrentDirectory`](/1.3.0/api/domain/storage/extension-state/interfaces/persistedcurrentdirectory/)

保存済み現在ディレクトリ。

## Example

```ts
const result = createPersistedCurrentDirectory(bookmarkId, folderPath, updatedAt);
```
