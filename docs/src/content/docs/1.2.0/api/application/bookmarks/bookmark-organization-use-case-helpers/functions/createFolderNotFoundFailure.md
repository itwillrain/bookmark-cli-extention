---
editUrl: false
next: false
prev: false
title: createFolderNotFoundFailure
slug: 1.2.0/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createfoldernotfoundfailure
---

> **createFolderNotFoundFailure**(`folderPath`): [`BookmarkCommandFailure`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:72](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L72)

Folder未検出の失敗結果を作成。

## Parameters

### folderPath

`string`

見つからなかったfolder path。

## Returns

[`BookmarkCommandFailure`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Folder未検出の失敗結果。

## Example

```ts
const result = createFolderNotFoundFailure(folderPath);
```
