---
editUrl: false
next: false
prev: false
title: changeDirectory
slug: 1.3.0/api/application/bookmarks/directory-use-cases/functions/changedirectory
---

> **changeDirectory**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ChangeDirectoryValue`](/1.3.0/api/application/bookmarks/directory-use-cases/interfaces/changedirectoryvalue/)>>

Defined in: [application/bookmarks/directory-use-cases.ts:279](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L279)

現在ディレクトリを移動します。

## Parameters

### input

[`ChangeDirectoryInput`](/1.3.0/api/application/bookmarks/directory-use-cases/interfaces/changedirectoryinput/)

Change directoryの入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ChangeDirectoryValue`](/1.3.0/api/application/bookmarks/directory-use-cases/interfaces/changedirectoryvalue/)>>

Change directoryの実行結果です。

## Example

```ts
const result = await changeDirectory({
  currentDirectory: "/Work",
  lastResultEntries: [],
  pathInput: "../Finance",
  repository,
});
```
