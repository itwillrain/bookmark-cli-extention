---
editUrl: false
next: false
prev: false
title: HelpBookmarkCommand
slug: 1.3.0/api/application/commands/bookmark-command-types/interfaces/helpbookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:370](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L370)

Help表示commandです。

## Properties

### kind

> `readonly` **kind**: `"help"`

Defined in: [application/commands/bookmark-command-types.ts:374](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L374)

Command種別です。

***

### topicInput

> `readonly` **topicInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:378](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-command-types.ts#L378)

Help対象command名です。空文字の場合はtopic一覧を表示します。
