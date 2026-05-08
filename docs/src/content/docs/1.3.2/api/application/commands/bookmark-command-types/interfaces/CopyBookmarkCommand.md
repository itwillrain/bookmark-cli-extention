---
editUrl: false
next: false
prev: false
title: CopyBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/copybookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:254](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L254)

Clipboard copy commandです。

## Properties

### kind

> `readonly` **kind**: `"copy"`

Defined in: [application/commands/bookmark-command-types.ts:258](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L258)

Command種別です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:262](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L262)

対象の直前結果番号です。

***

### valueKind

> `readonly` **valueKind**: [`BookmarkCliCopyValueKind`](/1.3.2/api/domain/cli/bookmark-cli-copy/type-aliases/bookmarkclicopyvaluekind/)

Defined in: [application/commands/bookmark-command-types.ts:266](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L266)

Copyする値種別です。
