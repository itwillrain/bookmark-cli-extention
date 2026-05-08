---
editUrl: false
next: false
prev: false
title: createFolderNotFoundFailure
slug: 1.3.2/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createfoldernotfoundfailure
---

> **createFolderNotFoundFailure**(`folderPath`): [`BookmarkCommandFailure`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:72](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L72)

Folder未検出の失敗結果を作成。

## Parameters

### folderPath

`string`

見つからなかったfolder path。

## Returns

[`BookmarkCommandFailure`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Folder未検出の失敗結果。

## Example

```ts
const result = createFolderNotFoundFailure(folderPath);
```
