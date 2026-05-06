---
editUrl: false
next: false
prev: false
title: listDirectory
slug: 1.3.0/api/application/bookmarks/directory-use-cases/functions/listdirectory
---

> **listDirectory**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListDirectoryValue`](/1.3.0/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryvalue/)>>

Defined in: [application/bookmarks/directory-use-cases.ts:234](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L234)

現在ディレクトリまたは指定pathのentry一覧を返します。

## Parameters

### input

[`ListDirectoryInput`](/1.3.0/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryinput/)

Directory listの入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListDirectoryValue`](/1.3.0/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryvalue/)>>

Directory listの実行結果です。

## Example

```ts
const result = await listDirectory({
  all: false,
  currentDirectory: "/Work",
  pathInput: "./Admin",
  repository,
});
```
