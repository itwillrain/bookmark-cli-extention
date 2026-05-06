---
editUrl: false
next: false
prev: false
title: RenameBookmarkInput
slug: 1.3.1/api/application/bookmarks/rename-bookmark-use-case/interfaces/renamebookmarkinput
---

Defined in: [application/bookmarks/rename-bookmark-use-case.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/rename-bookmark-use-case.ts#L15)

Bookmark名称変更use case入力。

## Extends

* [`OrganizeBookmarkBaseInput`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/)

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:58](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/bookmark-organization-use-case-types.ts#L58)

現在ディレクトリ。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`currentDirectory`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#currentdirectory)

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.3.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [application/bookmarks/rename-bookmark-use-case.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/rename-bookmark-use-case.ts#L19)

直前結果一覧。

***

### organizer

> `readonly` **organizer**: [`BookmarkOrganizerPort`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/bookmark-organization-use-case-types.ts#L60)

Bookmark整理port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`organizer`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#organizer)

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/bookmark-organization-use-case-types.ts#L62)

Bookmark Tree repository port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`repository`](/1.3.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#repository)

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/bookmarks/rename-bookmark-use-case.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/rename-bookmark-use-case.ts#L17)

対象の直前結果番号入力。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/bookmarks/rename-bookmark-use-case.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/rename-bookmark-use-case.ts#L21)

変更後title入力。
