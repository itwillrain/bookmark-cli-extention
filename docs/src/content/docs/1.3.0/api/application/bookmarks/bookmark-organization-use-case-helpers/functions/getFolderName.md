---
editUrl: false
next: false
prev: false
title: getFolderName
slug: 1.3.0/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/getfoldername
---

> **getFolderName**(`folderPath`): `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L153)

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
