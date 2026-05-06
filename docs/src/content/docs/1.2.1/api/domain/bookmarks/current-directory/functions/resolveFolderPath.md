---
editUrl: false
next: false
prev: false
title: resolveFolderPath
slug: 1.2.1/api/domain/bookmarks/current-directory/functions/resolvefolderpath
---

> **resolveFolderPath**(`currentDirectory`, `pathInput`): `string`

Defined in: [domain/bookmarks/current-directory.ts:175](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/current-directory.ts#L175)

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
