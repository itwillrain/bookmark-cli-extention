---
editUrl: false
next: false
prev: false
title: HelpBookmarkCommand
slug: 1.2.0/api/application/commands/bookmark-command-types/interfaces/helpbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:286](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L286)

Help表示commandです。

## Properties

### kind

> `readonly` **kind**: `"help"`

Defined in: [application/commands/bookmark-command-types.ts:290](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L290)

Command種別です。

***

### topicInput

> `readonly` **topicInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:294](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-command-types.ts#L294)

Help対象command名です。空文字の場合はtopic一覧を表示します。
