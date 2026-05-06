---
editUrl: false
next: false
prev: false
title: BrowserHistoryCommand
slug: 1.2.1/api/application/commands/bookmark-usage-command-types/interfaces/browserhistorycommand
---

Defined in: [application/commands/bookmark-usage-command-types.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-usage-command-types.ts#L18)

Chrome閲覧履歴一覧command。

## Properties

### kind

> `readonly` **kind**: `"history"`

Defined in: [application/commands/bookmark-usage-command-types.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-usage-command-types.ts#L20)

Command種別。

***

### limit?

> `readonly` `optional` **limit?**: `number`

Defined in: [application/commands/bookmark-usage-command-types.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-usage-command-types.ts#L22)

表示件数。

***

### query

> `readonly` **query**: `string`

Defined in: [application/commands/bookmark-usage-command-types.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-usage-command-types.ts#L24)

Chrome履歴検索query。
