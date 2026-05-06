---
editUrl: false
next: false
prev: false
title: HelpBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-command-types/interfaces/helpbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:290](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L290)

Help表示commandです。

## Properties

### kind

> `readonly` **kind**: `"help"`

Defined in: [application/commands/bookmark-command-types.ts:294](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L294)

Command種別です。

***

### topicInput

> `readonly` **topicInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:298](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L298)

Help対象command名です。空文字の場合はtopic一覧を表示します。
