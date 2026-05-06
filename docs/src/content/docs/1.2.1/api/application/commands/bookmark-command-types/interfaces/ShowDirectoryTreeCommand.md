---
editUrl: false
next: false
prev: false
title: ShowDirectoryTreeCommand
slug: 1.2.1/api/application/commands/bookmark-command-types/interfaces/showdirectorytreecommand
---

Defined in: [application/commands/bookmark-command-types.ts:77](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L77)

Directory tree表示commandです。

## Properties

### depth

> `readonly` **depth**: `number`

Defined in: [application/commands/bookmark-command-types.ts:81](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L81)

表示する最大depthです。

***

### directoriesOnly

> `readonly` **directoriesOnly**: `boolean`

Defined in: [application/commands/bookmark-command-types.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L85)

Directoryだけを表示するかです。

***

### kind

> `readonly` **kind**: `"tree"`

Defined in: [application/commands/bookmark-command-types.ts:89](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L89)

Command種別です。

***

### pathInput

> `readonly` **pathInput**: `string`

Defined in: [application/commands/bookmark-command-types.ts:93](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L93)

対象path入力です。
