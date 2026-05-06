---
editUrl: false
next: false
prev: false
title: ShowDirectoryTreeInput
slug: 1.3.0/api/application/bookmarks/tree-directory-use-case/interfaces/showdirectorytreeinput
---

Defined in: [application/bookmarks/tree-directory-use-case.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tree-directory-use-case.ts#L17)

Directory tree表示の入力です。

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/tree-directory-use-case.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tree-directory-use-case.ts#L21)

現在ディレクトリです。

***

### depth

> `readonly` **depth**: `number`

Defined in: [application/bookmarks/tree-directory-use-case.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tree-directory-use-case.ts#L25)

表示する最大depthです。

***

### directoriesOnly

> `readonly` **directoriesOnly**: `boolean`

Defined in: [application/bookmarks/tree-directory-use-case.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tree-directory-use-case.ts#L29)

Directoryだけを表示するかです。

***

### pathInput

> `readonly` **pathInput**: `string`

Defined in: [application/bookmarks/tree-directory-use-case.ts:33](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tree-directory-use-case.ts#L33)

表示対象path入力です。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/tree-directory-use-case.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tree-directory-use-case.ts#L37)

Bookmark Tree取得portです。
