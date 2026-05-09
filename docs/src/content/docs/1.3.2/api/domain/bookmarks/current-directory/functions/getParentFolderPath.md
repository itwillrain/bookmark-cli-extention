---
editUrl: false
next: false
prev: false
title: getParentFolderPath
slug: 1.3.2/api/domain/bookmarks/current-directory/functions/getparentfolderpath
---

> **getParentFolderPath**(`folderPath`): `string`

Defined in: [domain/bookmarks/current-directory.ts:197](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/current-directory.ts#L197)

Folder pathの親pathを取得します。

## Parameters

### folderPath

`string`

親pathを取得するfolder pathです。

## Returns

`string`

親folder pathです。

## Example

```ts
const result = getParentFolderPath("/Work/Admin");
// "/Work"
```
