---
editUrl: false
next: false
prev: false
title: MarkBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/markbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:100](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L100)

Mark commandです。

## Properties

### allowDuplicate

> `readonly` **allowDuplicate**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:104](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L104)

重複URLの保存を許可するかです。

***

### kind

> `readonly` **kind**: `"mark"`

Defined in: [application/commands/bookmark-command-types.ts:108](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L108)

Command種別です。

***

### targetFolderPathInput

> `readonly` **targetFolderPathInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:112](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L112)

保存先folder path入力です。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:116](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L116)

Bookmark title入力です。

***

### titleSpecified

> `readonly` **titleSpecified**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:120](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L120)

Bookmark titleが明示されたかです。
