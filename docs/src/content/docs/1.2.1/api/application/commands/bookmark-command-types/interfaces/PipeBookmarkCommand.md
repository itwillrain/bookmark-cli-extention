---
editUrl: false
next: false
prev: false
title: PipeBookmarkCommand
slug: 1.2.1/api/application/commands/bookmark-command-types/interfaces/pipebookmarkcommand
---

Defined in: [application/commands/bookmark-command-types.ts:334](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L334)

Pipe commandです。

## Properties

### kind

> `readonly` **kind**: `"pipe"`

Defined in: [application/commands/bookmark-command-types.ts:338](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L338)

Command種別です。

***

### source

> `readonly` **source**: [`PipeSourceBookmarkCommand`](/1.2.1/api/application/commands/bookmark-command-types/type-aliases/pipesourcebookmarkcommand/)

Defined in: [application/commands/bookmark-command-types.ts:342](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L342)

Pipe元の読み取りcommandです。

***

### stages

> `readonly` **stages**: readonly [`GrepPipeStageCommand`](/1.2.1/api/application/commands/bookmark-command-types/interfaces/greppipestagecommand/)\[]

Defined in: [application/commands/bookmark-command-types.ts:346](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-command-types.ts#L346)

Pipe stage一覧です。
