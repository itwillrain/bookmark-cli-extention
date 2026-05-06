---
editUrl: false
next: false
prev: false
title: CopyBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-command-types/interfaces/copybookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:250](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L250)

Clipboard copy commandです。

## Properties

### kind

> `readonly` **kind**: `"copy"`

Defined in: [application/commands/bookmark-command-types.ts:254](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L254)

Command種別です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:258](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L258)

対象の直前結果番号です。

***

### valueKind

> `readonly` **valueKind**: [`BookmarkCliCopyValueKind`](/1.3.0/api/domain/cli/bookmark-cli-copy/type-aliases/bookmarkclicopyvaluekind/)

Defined in: [application/commands/bookmark-command-types.ts:262](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L262)

Copyする値種別です。
