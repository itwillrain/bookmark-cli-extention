---
editUrl: false
next: false
prev: false
title: normalizeFolderPathInput
slug: 1.2.0/api/domain/bookmarks/folder-path/functions/normalizefolderpathinput
---

> **normalizeFolderPathInput**(`input`): `string`

Defined in: [domain/bookmarks/folder-path.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/bookmarks/folder-path.ts#L38)

Folder path入力を絶対pathへ正規化します。

## Parameters

### input

`string`

ユーザー入力または内部生成されたfolder pathです。

## Returns

`string`

絶対folder pathです。

## Example

```ts
const result = normalizeFolderPathInput("Work/Admin");
// "/Work/Admin"
```
