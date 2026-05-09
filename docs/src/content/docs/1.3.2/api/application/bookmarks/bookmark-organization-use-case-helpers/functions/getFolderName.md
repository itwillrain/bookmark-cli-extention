---
editUrl: false
next: false
prev: false
title: getFolderName
slug: 1.3.2/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/getfoldername
---

> **getFolderName**(`folderPath`): `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L153)

Folder pathから最後のsegmentを取得。

## Parameters

### folderPath

`string`

folder path。

## Returns

`string`

最後のpath segment。

## Example

```ts
const result = getFolderName(folderPath);
```
