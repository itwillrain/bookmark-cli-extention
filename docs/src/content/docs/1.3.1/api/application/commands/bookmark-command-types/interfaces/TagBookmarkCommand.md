---
editUrl: false
next: false
prev: false
title: TagBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-command-types/interfaces/tagbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:122](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L122)

Virtual tag commandです。

## Properties

### kind

> `readonly` **kind**: `"tag"`

Defined in: [application/commands/bookmark-command-types.ts:126](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L126)

Command種別です。

***

### remove

> `readonly` **remove**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:130](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L130)

削除操作ならtrueです。

***

### tagInputs

> `readonly` **tagInputs**: readonly `string`\[]

Defined in: [application/commands/bookmark-command-types.ts:134](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L134)

仮想タグ入力一覧です。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:138](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L138)

対象の直前結果番号です。
