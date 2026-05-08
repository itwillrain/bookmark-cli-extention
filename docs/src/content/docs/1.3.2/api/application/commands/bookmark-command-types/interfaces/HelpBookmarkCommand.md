---
editUrl: false
next: false
prev: false
title: HelpBookmarkCommand
slug: 1.3.2/api/application/commands/bookmark-command-types/interfaces/helpbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:374](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L374)

Help表示commandです。

## Properties

### kind

> `readonly` **kind**: `"help"`

Defined in: [application/commands/bookmark-command-types.ts:378](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L378)

Command種別です。

***

### topicInput

> `readonly` **topicInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:382](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-command-types.ts#L382)

Help対象command名です。空文字の場合はtopic一覧を表示します。
