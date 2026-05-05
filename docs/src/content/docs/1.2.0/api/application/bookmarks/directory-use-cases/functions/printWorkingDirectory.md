---
editUrl: false
next: false
prev: false
title: printWorkingDirectory
slug: 1.2.0/api/application/bookmarks/directory-use-cases/functions/printworkingdirectory
---

> **printWorkingDirectory**(`input`): [`BookmarkCommandResult`](/1.2.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`PrintWorkingDirectoryValue`](/1.2.0/api/application/bookmarks/directory-use-cases/interfaces/printworkingdirectoryvalue/)>

Defined in: [application/bookmarks/directory-use-cases.ts:260](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/directory-use-cases.ts#L260)

現在ディレクトリを返します。

## Parameters

### input

[`PrintWorkingDirectoryInput`](/1.2.0/api/application/bookmarks/directory-use-cases/interfaces/printworkingdirectoryinput/)

Pwdの入力です。

## Returns

[`BookmarkCommandResult`](/1.2.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommandresult/)\<[`PrintWorkingDirectoryValue`](/1.2.0/api/application/bookmarks/directory-use-cases/interfaces/printworkingdirectoryvalue/)>

Pwdの実行結果です。

## Example

```ts
const result = printWorkingDirectory({ currentDirectory: "/Work/Admin" });
// { ok: true, value: { currentDirectory: "/Work/Admin" } }
```
