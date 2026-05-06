---
editUrl: false
next: false
prev: false
title: MarkCurrentTabInput
slug: 1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/markcurrenttabinput
---

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L42)

現在タブ保存入力。

## Properties

### allowDuplicate

> `readonly` **allowDuplicate**: `boolean`

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:44](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L44)

重複URLの保存を許可するか。

***

### creator

> `readonly` **creator**: [`BookmarkCreatorPort`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L46)

Bookmark作成port。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:48](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L48)

現在ディレクトリ。

***

### launchContext?

> `readonly` `optional` **launchContext?**: [`LaunchContext`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/)

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:50](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L50)

CLI起動元タブcontext。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:52](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L52)

Bookmark Tree repository port。

***

### targetFolderPathInput

> `readonly` **targetFolderPathInput**: `string`

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:54](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L54)

保存先folder path入力。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/bookmarks/mark-bookmark-use-case.ts:56](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/bookmarks/mark-bookmark-use-case.ts#L56)

Bookmark title入力。
