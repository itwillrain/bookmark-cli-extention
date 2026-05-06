---
editUrl: false
next: false
prev: false
title: ListDirectoryInput
slug: 1.2.1/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryinput
---

Defined in: [application/bookmarks/directory-use-cases.ts:26](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/directory-use-cases.ts#L26)

Directory listの入力です。

## Properties

### all

> `readonly` **all**: `boolean`

Defined in: [application/bookmarks/directory-use-cases.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/directory-use-cases.ts#L30)

Dot始まりのentryも表示するかです。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/directory-use-cases.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/directory-use-cases.ts#L34)

現在ディレクトリです。

***

### pathInput

> `readonly` **pathInput**: `string`

Defined in: [application/bookmarks/directory-use-cases.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/directory-use-cases.ts#L38)

表示対象path入力です。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/directory-use-cases.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/directory-use-cases.ts#L42)

Bookmark Tree取得portです。
