---
editUrl: false
next: false
prev: false
title: ChangeDirectoryInput
slug: 1.3.0/api/application/bookmarks/directory-use-cases/interfaces/changedirectoryinput
---

Defined in: [application/bookmarks/directory-use-cases.ts:72](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L72)

Change directoryの入力です。

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/directory-use-cases.ts:76](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L76)

現在ディレクトリです。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.3.0/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [application/bookmarks/directory-use-cases.ts:80](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L80)

直前結果一覧です。

***

### pathInput

> `readonly` **pathInput**: `string`

Defined in: [application/bookmarks/directory-use-cases.ts:84](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L84)

移動先pathまたは直前結果番号です。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/directory-use-cases.ts:88](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/directory-use-cases.ts#L88)

Bookmark Tree取得portです。
