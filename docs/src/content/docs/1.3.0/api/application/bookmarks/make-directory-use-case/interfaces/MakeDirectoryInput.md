---
editUrl: false
next: false
prev: false
title: MakeDirectoryInput
slug: 1.3.0/api/application/bookmarks/make-directory-use-case/interfaces/makedirectoryinput
---

Defined in: [application/bookmarks/make-directory-use-case.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/make-directory-use-case.ts#L17)

Folder作成use case入力。

## Extends

* [`OrganizeBookmarkBaseInput`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/)

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:58](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-types.ts#L58)

現在ディレクトリ。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`currentDirectory`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#currentdirectory)

***

### organizer

> `readonly` **organizer**: [`BookmarkOrganizerPort`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-types.ts#L60)

Bookmark整理port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`organizer`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#organizer)

***

### pathInput

> `readonly` **pathInput**: `string`

Defined in: [application/bookmarks/make-directory-use-case.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/make-directory-use-case.ts#L19)

作成するfolder path入力。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-types.ts#L62)

Bookmark Tree repository port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`repository`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#repository)
