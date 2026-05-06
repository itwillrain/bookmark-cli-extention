---
editUrl: false
next: false
prev: false
title: ListDirectoryInput
slug: 1.3.0/api/application/bookmarks/directory-use-cases/interfaces/listdirectoryinput
---

Defined in: [application/bookmarks/directory-use-cases.ts:26](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L26)

Directory listの入力です。

## Properties

### all

> `readonly` **all**: `boolean`

Defined in: [application/bookmarks/directory-use-cases.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L30)

Dot始まりのentryも表示するかです。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/directory-use-cases.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L34)

現在ディレクトリです。

***

### pathInput

> `readonly` **pathInput**: `string`

Defined in: [application/bookmarks/directory-use-cases.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L38)

表示対象path入力です。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/directory-use-cases.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L42)

Bookmark Tree取得portです。
