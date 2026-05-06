---
editUrl: false
next: false
prev: false
title: markCurrentTab
slug: 1.3.0/api/application/bookmarks/mark-bookmark-use-case/functions/markcurrenttab
---

> **markCurrentTab**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`MarkCurrentTabValue`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/markcurrenttabvalue/)>>

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:239](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/mark-bookmark-use-case.ts#L239)

CLI起動元タブをBookmarkへ保存。

## Parameters

### input

[`MarkCurrentTabInput`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/markcurrenttabinput/)

現在タブ保存入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`MarkCurrentTabValue`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/markcurrenttabvalue/)>>

現在タブ保存結果。

## Example

```ts
const result = await markCurrentTab({
  allowDuplicate: false,
  creator,
  currentDirectory: "/Work",
  folderPathInput: "./Admin",
  launchContext,
  repository,
  titleInput: "",
});
```
