---
editUrl: false
next: false
prev: false
title: MoveBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/movebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:162](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L162)

Move Bookmark commandです。

## Properties

### kind

> `readonly` **kind**: `"mv"`

Defined in: [application/commands/bookmark-command-types.ts:166](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L166)

Command種別です。

***

### targetFolderPathInput

> `readonly` **targetFolderPathInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:170](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L170)

移動先folder path入力です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:174](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L174)

対象の直前結果番号です。
