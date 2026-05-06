---
editUrl: false
next: false
prev: false
title: AbbrBookmarkCommand
slug: 1.3.1/api/application/commands/bookmark-command-types/interfaces/abbrbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:334](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L334)

Command abbreviation設定commandです。

## Properties

### abbreviationName

> `readonly` **abbreviationName**: `string`

Defined in: [application/commands/bookmark-command-types.ts:338](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L338)

Abbreviation名です。

***

### commandInput

> `readonly` **commandInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:342](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L342)

展開後command入力です。

***

### kind

> `readonly` **kind**: `"abbr"`

Defined in: [application/commands/bookmark-command-types.ts:346](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L346)

Command種別です。

***

### operation

> `readonly` **operation**: [`AbbrBookmarkCommandOperation`](/1.3.1/api/application/commands/bookmark-command-types/type-aliases/abbrbookmarkcommandoperation/)

Defined in: [application/commands/bookmark-command-types.ts:350](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/application/commands/bookmark-command-types.ts#L350)

Abbreviation操作種別です。
