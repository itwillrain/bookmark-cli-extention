---
editUrl: false
next: false
prev: false
title: markCurrentTab
slug: 1.3.1/api/application/bookmarks/mark-bookmark-use-case/functions/markcurrenttab
---

> **markCurrentTab**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`MarkCurrentTabValue`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/markcurrenttabvalue/)>>

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:239](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L239)

CLI起動元タブをBookmarkへ保存。

## Parameters

### input

[`MarkCurrentTabInput`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/markcurrenttabinput/)

現在タブ保存入力。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`MarkCurrentTabValue`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/markcurrenttabvalue/)>>

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
