---
editUrl: false
next: false
prev: false
title: OrganizeBookmarkBaseInput
slug: 1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput
---

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:56](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L56)

Bookmark整理共通入力。

## Extended by

* [`MakeDirectoryInput`](/1.2.0/api/application/bookmarks/make-directory-use-case/interfaces/makedirectoryinput/)
* [`MoveBookmarkInput`](/1.2.0/api/application/bookmarks/move-bookmark-use-case/interfaces/movebookmarkinput/)
* [`RemoveBookmarkInput`](/1.2.0/api/application/bookmarks/remove-bookmark-use-case/interfaces/removebookmarkinput/)
* [`RenameBookmarkInput`](/1.2.0/api/application/bookmarks/rename-bookmark-use-case/interfaces/renamebookmarkinput/)

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:58](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L58)

現在ディレクトリ。

***

### organizer

> `readonly` **organizer**: [`BookmarkOrganizerPort`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L60)

Bookmark整理port。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-types.ts#L62)

Bookmark Tree repository port。
