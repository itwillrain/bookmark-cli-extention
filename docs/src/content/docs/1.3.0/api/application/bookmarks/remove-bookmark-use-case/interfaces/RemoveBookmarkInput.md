---
editUrl: false
next: false
prev: false
title: RemoveBookmarkInput
slug: 1.3.0/api/application/bookmarks/remove-bookmark-use-case/interfaces/removebookmarkinput
---

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:197](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/remove-bookmark-use-case.ts#L197)

Bookmark削除use case入力。

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

### force

> `readonly` **force**: `boolean`

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:199](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/remove-bookmark-use-case.ts#L199)

確認なしで削除するか。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.3.0/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:205](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/remove-bookmark-use-case.ts#L205)

直前結果一覧。

***

### organizer

> `readonly` **organizer**: [`BookmarkOrganizerPort`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-types.ts#L60)

Bookmark整理port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`organizer`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#organizer)

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:201](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/remove-bookmark-use-case.ts#L201)

Folder subtreeを再帰削除するか。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-types.ts#L62)

Bookmark Tree repository port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`repository`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#repository)

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:203](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/remove-bookmark-use-case.ts#L203)

対象の直前結果番号またはpath入力。
