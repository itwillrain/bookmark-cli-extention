---
editUrl: false
next: false
prev: false
title: joinFolderPath
slug: 1.3.2/api/domain/bookmarks/folder-path/functions/joinfolderpath
---

> **joinFolderPath**(`parentFolderPath`, `folderTitle`): `string`

Defined in: [domain/bookmarks/folder-path.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/folder-path.ts#L61)

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
