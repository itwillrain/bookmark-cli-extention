---
editUrl: false
next: false
prev: false
title: resolveFolderPath
slug: 1.2.0/api/domain/bookmarks/current-directory/functions/resolvefolderpath
---

> **resolveFolderPath**(`currentDirectory`, `pathInput`): `string`

Defined in: [domain/bookmarks/current-directory.ts:175](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/bookmarks/current-directory.ts#L175)

現在ディレクトリから入力pathを絶対folder pathへ解決します。

## Parameters

### currentDirectory

`string`

現在ディレクトリです。

### pathInput

`string`

入力pathです。

## Returns

`string`

解決済みfolder pathです。

## Example

```ts
const result = resolveFolderPath("/Work", "../Finance");
// "/Finance"
```
