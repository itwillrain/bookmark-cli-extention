---
editUrl: false
next: false
prev: false
title: joinFolderPath
slug: 1.3.1/api/domain/bookmarks/folder-path/functions/joinfolderpath
---

> **joinFolderPath**(`parentFolderPath`, `folderTitle`): `string`

Defined in: [domain/bookmarks/folder-path.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/bookmarks/folder-path.ts#L61)

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
