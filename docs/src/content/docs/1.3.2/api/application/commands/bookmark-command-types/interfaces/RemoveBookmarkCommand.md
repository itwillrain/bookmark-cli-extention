---
editUrl: false
next: false
prev: false
title: RemoveBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:180](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L180)

Remove Bookmark commandです。

## Properties

### force

> `readonly` **force**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:184](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L184)

確認なしで削除するかです。

***

### kind

> `readonly` **kind**: `"rm"`

Defined in: [application/commands/bookmark-command-types.ts:188](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L188)

Command種別です。

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:192](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L192)

Folder配下も再帰的に削除するかです。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:196](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L196)

対象の直前結果番号です。
