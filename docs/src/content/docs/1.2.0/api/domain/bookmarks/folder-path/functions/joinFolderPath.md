---
editUrl: false
next: false
prev: false
title: joinFolderPath
slug: 1.2.0/api/domain/bookmarks/folder-path/functions/joinfolderpath
---

> **joinFolderPath**(`parentFolderPath`, `folderTitle`): `string`

Defined in: [domain/bookmarks/folder-path.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/bookmarks/folder-path.ts#L61)

親folder pathへfolder titleを追加します。

## Parameters

### parentFolderPath

`string`

親folder pathです。

### folderTitle

`string`

追加するfolder titleです。

## Returns

`string`

追加後のfolder pathです。

## Example

```ts
const result = joinFolderPath("/Work", "Admin");
// "/Work/Admin"
```
