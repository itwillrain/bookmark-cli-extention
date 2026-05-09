---
editUrl: false
next: false
prev: false
title: normalizeFolderPathInput
slug: 1.3.2/api/domain/bookmarks/folder-path/functions/normalizefolderpathinput
---

> **normalizeFolderPathInput**(`input`): `string`

Defined in: [domain/bookmarks/folder-path.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/bookmarks/folder-path.ts#L38)

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
