---
editUrl: false
next: false
prev: false
title: RenameBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:202](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L202)

Rename Bookmark commandです。

## Properties

### kind

> `readonly` **kind**: `"rename"`

Defined in: [application/commands/bookmark-command-types.ts:206](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L206)

Command種別です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:210](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L210)

対象の直前結果番号です。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:214](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L214)

変更後title入力です。
