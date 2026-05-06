---
editUrl: false
next: false
prev: false
title: MakeDirectoryInput
slug: 1.2.1/api/application/bookmarks/make-directory-use-case/interfaces/makedirectoryinput
---

Defined in: [application/bookmarks/make-directory-use-case.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/make-directory-use-case.ts#L17)

Folder作成use case入力。

## Extends

* [`OrganizeBookmarkBaseInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/)

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:58](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-types.ts#L58)

現在ディレクトリ。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`currentDirectory`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#currentdirectory)

***

### organizer

> `readonly` **organizer**: [`BookmarkOrganizerPort`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-types.ts#L60)

Bookmark整理port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`organizer`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#organizer)

***

### pathInput

> `readonly` **pathInput**: `string`

Defined in: [application/bookmarks/make-directory-use-case.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/make-directory-use-case.ts#L19)

作成するfolder path入力。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-types.ts#L62)

Bookmark Tree repository port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`repository`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#repository)
