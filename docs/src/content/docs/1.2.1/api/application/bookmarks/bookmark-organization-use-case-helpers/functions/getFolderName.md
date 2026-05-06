---
editUrl: false
next: false
prev: false
title: getFolderName
slug: 1.2.1/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/getfoldername
---

> **getFolderName**(`folderPath`): `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L153)

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
