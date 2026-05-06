---
editUrl: false
next: false
prev: false
title: listDirectory
slug: 1.2.1/api/application/bookmarks/directory-use-cases/functions/listdirectory
---

> **listDirectory**(`input`): `Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListDirectoryValue`](/1.2.1/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryvalue/)>>

Defined in: [application/bookmarks/directory-use-cases.ts:234](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/directory-use-cases.ts#L234)

現在ディレクトリまたは指定pathのentry一覧を返します。

## Parameters

### input

[`ListDirectoryInput`](/1.2.1/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryinput/)

Directory listの入力です。

## Returns

`Promise`\<[`BookmarkCommandResult`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`ListDirectoryValue`](/1.2.1/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryvalue/)>>

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
