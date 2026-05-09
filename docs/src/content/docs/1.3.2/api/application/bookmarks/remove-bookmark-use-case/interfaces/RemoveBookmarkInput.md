---
editUrl: false
next: false
prev: false
title: RemoveBookmarkInput
slug: 1.3.2/api/application/bookmarks/remove-bookmark-use-case/interfaces/removebookmarkinput
---

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:237](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/remove-bookmark-use-case.ts#L237)

Bookmark削除use case入力。

## Extends

* [`OrganizeBookmarkBaseInput`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/)

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:58](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-organization-use-case-types.ts#L58)

現在ディレクトリ。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`currentDirectory`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#currentdirectory)

***

### force

> `readonly` **force**: `boolean`

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:239](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/remove-bookmark-use-case.ts#L239)

確認なしで削除するか。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.3.2/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:245](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/remove-bookmark-use-case.ts#L245)

直前結果一覧。

***

### organizer

> `readonly` **organizer**: [`BookmarkOrganizerPort`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-organization-use-case-types.ts#L60)

Bookmark整理port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`organizer`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#organizer)

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:241](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/remove-bookmark-use-case.ts#L241)

Folder subtreeを再帰削除するか。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/bookmark-organization-use-case-types.ts:62](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-organization-use-case-types.ts#L62)

Bookmark Tree repository port。

#### Inherited from

[`OrganizeBookmarkBaseInput`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/).[`repository`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkbaseinput/#repository)

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/bookmarks/remove-bookmark-use-case.ts:243](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/remove-bookmark-use-case.ts#L243)

対象の直前結果番号またはpath入力。
