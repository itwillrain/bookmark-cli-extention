---
editUrl: false
next: false
prev: false
title: MarkBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-command-types/interfaces/markbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:100](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L100)

Mark commandです。

## Properties

### allowDuplicate

> `readonly` **allowDuplicate**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:104](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L104)

重複URLの保存を許可するかです。

***

### kind

> `readonly` **kind**: `"mark"`

Defined in: [application/commands/bookmark-command-types.ts:108](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L108)

Command種別です。

***

### targetFolderPathInput

> `readonly` **targetFolderPathInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:112](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L112)

保存先folder path入力です。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:116](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L116)

Bookmark title入力です。
