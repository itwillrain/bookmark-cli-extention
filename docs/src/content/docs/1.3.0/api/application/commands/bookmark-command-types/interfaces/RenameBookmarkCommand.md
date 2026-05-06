---
editUrl: false
next: false
prev: false
title: RenameBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-command-types/interfaces/renamebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:198](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L198)

Rename Bookmark commandです。

## Properties

### kind

> `readonly` **kind**: `"rename"`

Defined in: [application/commands/bookmark-command-types.ts:202](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L202)

Command種別です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:206](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L206)

対象の直前結果番号です。

***

### titleInput

> `readonly` **titleInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:210](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L210)

変更後title入力です。
