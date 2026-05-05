---
editUrl: false
next: false
prev: false
title: getParentFolderPath
slug: 1.2.0/api/domain/bookmarks/current-directory/functions/getparentfolderpath
---

> **getParentFolderPath**(`folderPath`): `string`

Defined in: [domain/bookmarks/current-directory.ts:197](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/bookmarks/current-directory.ts#L197)

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
