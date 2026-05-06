---
editUrl: false
next: false
prev: false
title: getFolderName
slug: 1.3.1/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/getfoldername
---

> **getFolderName**(`folderPath`): `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L153)

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
