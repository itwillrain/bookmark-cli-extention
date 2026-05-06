---
editUrl: false
next: false
prev: false
title: RecordingOrganizer
slug: 1.2.1/api/application/bookmarks/organize-bookmark-use-case-test-helper/interfaces/recordingorganizer
---

Defined in: [application/bookmarks/organize-bookmark-use-case-test-helper.ts:12](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/organize-bookmark-use-case-test-helper.ts#L12)

書き込み記録fixture。

## Properties

### createdFolders

> `readonly` **createdFolders**: readonly [`CreateFolderInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/createfolderinput/)\[]

Defined in: [application/bookmarks/organize-bookmark-use-case-test-helper.ts:14](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/organize-bookmark-use-case-test-helper.ts#L14)

作成要求一覧。

***

### movedEntries

> `readonly` **movedEntries**: readonly [`MoveEntryInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/moveentryinput/)\[]

Defined in: [application/bookmarks/organize-bookmark-use-case-test-helper.ts:16](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/organize-bookmark-use-case-test-helper.ts#L16)

移動要求一覧。

***

### organizer

> `readonly` **organizer**: [`BookmarkOrganizerPort`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [application/bookmarks/organize-bookmark-use-case-test-helper.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/organize-bookmark-use-case-test-helper.ts#L24)

Bookmark整理port。

***

### removedEntries

> `readonly` **removedEntries**: readonly [`RemoveEntryInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/removeentryinput/)\[]

Defined in: [application/bookmarks/organize-bookmark-use-case-test-helper.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/organize-bookmark-use-case-test-helper.ts#L18)

削除要求一覧。

***

### removedFolderTrees

> `readonly` **removedFolderTrees**: readonly [`RemoveFolderTreeInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/removefoldertreeinput/)\[]

Defined in: [application/bookmarks/organize-bookmark-use-case-test-helper.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/organize-bookmark-use-case-test-helper.ts#L20)

Folder subtree削除要求一覧。

***

### renamedEntries

> `readonly` **renamedEntries**: readonly [`RenameEntryInput`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/renameentryinput/)\[]

Defined in: [application/bookmarks/organize-bookmark-use-case-test-helper.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/organize-bookmark-use-case-test-helper.ts#L22)

名称変更要求一覧。
