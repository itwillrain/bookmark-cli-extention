---
editUrl: false
next: false
prev: false
title: RemoveBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-command-types/interfaces/removebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:176](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L176)

Remove Bookmark commandです。

## Properties

### force

> `readonly` **force**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:180](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L180)

確認なしで削除するかです。

***

### kind

> `readonly` **kind**: `"rm"`

Defined in: [application/commands/bookmark-command-types.ts:184](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L184)

Command種別です。

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:188](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L188)

Folder配下も再帰的に削除するかです。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:192](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L192)

対象の直前結果番号です。
