---
editUrl: false
next: false
prev: false
title: TagBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:126](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L126)

Virtual tag commandです。

## Properties

### kind

> `readonly` **kind**: `"tag"`

Defined in: [application/commands/bookmark-command-types.ts:130](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L130)

Command種別です。

***

### remove

> `readonly` **remove**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:134](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L134)

削除操作ならtrueです。

***

### tagInputs

> `readonly` **tagInputs**: readonly `string`\[]

Defined in: [application/commands/bookmark-command-types.ts:138](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L138)

仮想タグ入力一覧です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:142](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L142)

対象の直前結果番号です。
